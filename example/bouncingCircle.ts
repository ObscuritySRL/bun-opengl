/**
 * Bouncing Circle Example
 *
 * Demonstrates basic OpenGL rendering with bun-opengl32.
 * Creates a 640x480 window and draws a circle that bounces side to side.
 *
 * Run with: bun run example/bouncingCircle.ts
 */

import { dlopen, FFIType, ptr, JSCallback, type Pointer } from 'bun:ffi';
import OpenGL32, { GLenum } from '../index';

// Window dimensions
const HEIGHT = 480,
  WIDTH = 640;

// Circle properties
const CIRCLE_RADIUS = 40,
  CIRCLE_SEGMENTS = 32,
  CIRCLE_SPEED = 200;

let circleDirection = 1, // 1 = right, -1 = left
  circleX = WIDTH / 2;

// -----------------------------------------------------------------------------
// Minimal Win32 API bindings (User32 + GDI32)
// -----------------------------------------------------------------------------

const user32 = dlopen('user32.dll', {
  AdjustWindowRectEx: { args: [FFIType.ptr, FFIType.u32, FFIType.i32, FFIType.u32], returns: FFIType.i32 },
  CreateWindowExW: { args: [FFIType.u32, FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr], returns: FFIType.ptr }, // prettier-ignore
  DefWindowProcW: { args: [FFIType.ptr, FFIType.u32, FFIType.u64, FFIType.i64], returns: FFIType.i64 },
  DispatchMessageW: { args: [FFIType.ptr], returns: FFIType.i64 },
  GetDC: { args: [FFIType.ptr], returns: FFIType.ptr },
  LoadCursorW: { args: [FFIType.ptr, FFIType.u64], returns: FFIType.ptr },
  PeekMessageW: { args: [FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.u32], returns: FFIType.i32 },
  PostQuitMessage: { args: [FFIType.i32], returns: FFIType.void },
  RegisterClassExW: { args: [FFIType.ptr], returns: FFIType.u16 },
  ReleaseDC: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.i32 },
  ShowWindow: { args: [FFIType.ptr, FFIType.i32], returns: FFIType.i32 },
  TranslateMessage: { args: [FFIType.ptr], returns: FFIType.i32 },
  UpdateWindow: { args: [FFIType.ptr], returns: FFIType.i32 },
});

const gdi32 = dlopen('gdi32.dll', {
  ChoosePixelFormat: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.i32 },
  SetPixelFormat: { args: [FFIType.ptr, FFIType.i32, FFIType.ptr], returns: FFIType.i32 },
  SwapBuffers: { args: [FFIType.ptr], returns: FFIType.i32 },
});

const kernel32 = dlopen('kernel32.dll', {
  GetLastError: { args: [], returns: FFIType.u32 },
  GetModuleHandleW: { args: [FFIType.ptr], returns: FFIType.ptr },
});

// Win32 enums
const enum ClassStyle {
  CS_HREDRAW = 0x0002,
  CS_OWNDC = 0x0020,
  CS_VREDRAW = 0x0001,
}

const enum IDC {
  IDC_ARROW = 32512,
}

const enum PFD {
  PFD_DOUBLEBUFFER = 0x00000001,
  PFD_DRAW_TO_WINDOW = 0x00000004,
  PFD_MAIN_PLANE = 0,
  PFD_SUPPORT_OPENGL = 0x00000020,
  PFD_TYPE_RGBA = 0,
}

const enum PM {
  PM_REMOVE = 0x0001,
}

const enum SW {
  SW_SHOW = 5,
}

const enum WindowMessage {
  WM_CLOSE = 0x0010,
  WM_DESTROY = 0x0002,
  WM_QUIT = 0x0012,
}

const enum WindowStyle {
  WS_OVERLAPPEDWINDOW = 0x00cf0000,
  WS_VISIBLE = 0x10000000,
}

const CW_USEDEFAULT = 0x80000000;

// Null pointer constant for cleanup
const NULL_PTR = 0 as unknown as Pointer;

// -----------------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------------

/** Convert a pointer to BigInt for use in struct fields */
function ptrToBigInt(p: Pointer | null): bigint {
  if (p === null) return 0n;
  return BigInt(Number(p));
}

function encodeWideString(str: string): Uint8Array {
  const buffer = new Uint8Array((str.length + 1) * 2);
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    buffer[i * 2] = code & 0xff;
    buffer[i * 2 + 1] = (code >> 8) & 0xff;
  }
  return buffer;
}

// Store the window procedure callback to prevent GC
let wndProcCallback: JSCallback | null = null;
let shouldClose = false;

function createWndProc(): Pointer {
  const cb = new JSCallback(
    (hwnd: Pointer, msg: number, wParam: number | bigint, lParam: number | bigint): bigint => {
      if (msg === WindowMessage.WM_CLOSE || msg === WindowMessage.WM_DESTROY) {
        shouldClose = true;
        user32.symbols.PostQuitMessage(0);
        return 0n;
      }
      return BigInt(user32.symbols.DefWindowProcW(hwnd, msg, wParam, lParam));
    },
    { args: [FFIType.ptr, FFIType.u32, FFIType.u64, FFIType.i64], returns: FFIType.i64 }
  );
  wndProcCallback = cb;
  if (!cb.ptr) {
    throw new Error('Failed to create window procedure callback');
  }
  return cb.ptr;
}

// -----------------------------------------------------------------------------
// Window and OpenGL context creation
// -----------------------------------------------------------------------------

function createWindow(): { hwnd: Pointer; hdc: Pointer } {
  const hInstance = kernel32.symbols.GetModuleHandleW(null);
  const className = encodeWideString('OpenGLWindowClass');
  const windowTitle = encodeWideString('Bouncing Circle - bun-opengl32');

  // Create window procedure
  const wndProcPtr = createWndProc();

  // WNDCLASSEXW structure (80 bytes on x64)
  const wndClass = new ArrayBuffer(80);
  const wndClassView = new DataView(wndClass);

  const hCursor = user32.symbols.LoadCursorW(null, IDC.IDC_ARROW);

  wndClassView.setUint32(0, 80, true); // cbSize
  wndClassView.setUint32(4, ClassStyle.CS_HREDRAW | ClassStyle.CS_VREDRAW | ClassStyle.CS_OWNDC, true); // style
  wndClassView.setBigUint64(8, ptrToBigInt(wndProcPtr), true); // lpfnWndProc
  wndClassView.setInt32(16, 0, true); // cbClsExtra
  wndClassView.setInt32(20, 0, true); // cbWndExtra
  wndClassView.setBigUint64(24, ptrToBigInt(hInstance), true); // hInstance
  wndClassView.setBigUint64(32, 0n, true); // hIcon
  wndClassView.setBigUint64(40, ptrToBigInt(hCursor), true); // hCursor
  wndClassView.setBigUint64(48, 0n, true); // hbrBackground
  wndClassView.setBigUint64(56, 0n, true); // lpszMenuName
  wndClassView.setBigUint64(64, ptrToBigInt(ptr(className)), true); // lpszClassName
  wndClassView.setBigUint64(72, 0n, true); // hIconSm

  const atom = user32.symbols.RegisterClassExW(ptr(new Uint8Array(wndClass)));
  if (atom === 0) {
    throw new Error(`RegisterClassExW failed: ${kernel32.symbols.GetLastError()}`);
  }

  // Calculate window size to get desired client area
  const rect = new ArrayBuffer(16);
  const rectView = new DataView(rect);
  rectView.setInt32(0, 0, true); // left
  rectView.setInt32(4, 0, true); // top
  rectView.setInt32(8, WIDTH, true); // right
  rectView.setInt32(12, HEIGHT, true); // bottom

  user32.symbols.AdjustWindowRectEx(ptr(new Uint8Array(rect)), WindowStyle.WS_OVERLAPPEDWINDOW, 0, 0);

  const adjustedWidth = rectView.getInt32(8, true) - rectView.getInt32(0, true);
  const adjustedHeight = rectView.getInt32(12, true) - rectView.getInt32(4, true);

  // Create window
  const hwnd = user32.symbols.CreateWindowExW(0, ptr(className), ptr(windowTitle), WindowStyle.WS_OVERLAPPEDWINDOW | WindowStyle.WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT, adjustedWidth, adjustedHeight, null, null, hInstance, null);

  if (!hwnd) {
    throw new Error(`CreateWindowExW failed: ${kernel32.symbols.GetLastError()}`);
  }

  user32.symbols.ShowWindow(hwnd, SW.SW_SHOW);
  user32.symbols.UpdateWindow(hwnd);

  const hdc = user32.symbols.GetDC(hwnd);
  if (!hdc) {
    throw new Error('GetDC failed');
  }

  return { hwnd, hdc };
}

function setupPixelFormat(hdc: Pointer): void {
  // PIXELFORMATDESCRIPTOR structure (40 bytes)
  const pfdBuffer = new Uint8Array(40);
  const pfdView = new DataView(pfdBuffer.buffer);

  pfdView.setUint16(0, 40, true); // nSize
  pfdView.setUint16(2, 1, true); // nVersion
  pfdView.setUint32(4, PFD.PFD_DRAW_TO_WINDOW | PFD.PFD_SUPPORT_OPENGL | PFD.PFD_DOUBLEBUFFER, true); // dwFlags
  pfdView.setUint8(8, PFD.PFD_TYPE_RGBA); // iPixelType
  pfdView.setUint8(9, 32); // cColorBits
  pfdView.setUint8(10, 0); // cRedBits
  pfdView.setUint8(11, 0); // cRedShift
  pfdView.setUint8(12, 0); // cGreenBits
  pfdView.setUint8(13, 0); // cGreenShift
  pfdView.setUint8(14, 0); // cBlueBits
  pfdView.setUint8(15, 0); // cBlueShift
  pfdView.setUint8(16, 0); // cAlphaBits
  pfdView.setUint8(17, 0); // cAlphaShift
  pfdView.setUint8(18, 0); // cAccumBits
  pfdView.setUint8(19, 0); // cAccumRedBits
  pfdView.setUint8(20, 0); // cAccumGreenBits
  pfdView.setUint8(21, 0); // cAccumBlueBits
  pfdView.setUint8(22, 0); // cAccumAlphaBits
  pfdView.setUint8(23, 24); // cDepthBits
  pfdView.setUint8(24, 8); // cStencilBits
  pfdView.setUint8(25, 0); // cAuxBuffers
  pfdView.setUint8(26, PFD.PFD_MAIN_PLANE); // iLayerType
  pfdView.setUint8(27, 0); // bReserved
  pfdView.setUint32(28, 0, true); // dwLayerMask
  pfdView.setUint32(32, 0, true); // dwVisibleMask
  pfdView.setUint32(36, 0, true); // dwDamageMask

  const pfdPtr = ptr(pfdBuffer);
  const pixelFormat = gdi32.symbols.ChoosePixelFormat(hdc, pfdPtr);
  if (pixelFormat === 0) {
    throw new Error(`ChoosePixelFormat failed: ${kernel32.symbols.GetLastError()}`);
  }

  if (!gdi32.symbols.SetPixelFormat(hdc, pixelFormat, pfdPtr)) {
    throw new Error(`SetPixelFormat failed: ${kernel32.symbols.GetLastError()}`);
  }
}

function createGLContext(hdc: Pointer): Pointer {
  const hglrc = OpenGL32.wglCreateContext(hdc);
  if (!hglrc) {
    throw new Error(`wglCreateContext failed: ${kernel32.symbols.GetLastError()}`);
  }

  if (!OpenGL32.wglMakeCurrent(hdc, hglrc)) {
    throw new Error(`wglMakeCurrent failed: ${kernel32.symbols.GetLastError()}`);
  }

  return hglrc;
}

// -----------------------------------------------------------------------------
// OpenGL rendering
// -----------------------------------------------------------------------------

function initGL(): void {
  // Set up orthographic projection for 2D rendering
  OpenGL32.glMatrixMode(GLenum.GL_PROJECTION);
  OpenGL32.glLoadIdentity();
  OpenGL32.glOrtho(0, WIDTH, HEIGHT, 0, -1, 1);

  OpenGL32.glMatrixMode(GLenum.GL_MODELVIEW);
  OpenGL32.glLoadIdentity();

  // Set clear color to dark blue
  OpenGL32.glClearColor(0.1, 0.1, 0.2, 1.0);

  // Enable smooth shading
  OpenGL32.glShadeModel(GLenum.GL_SMOOTH);
}

function drawCircle(cx: number, cy: number, radius: number): void {
  OpenGL32.glBegin(GLenum.GL_TRIANGLE_FAN);

  // Center vertex (white)
  OpenGL32.glColor3f(1.0, 1.0, 1.0);
  OpenGL32.glVertex2f(cx, cy);

  // Outer vertices (gradient to orange)
  for (let i = 0; i <= CIRCLE_SEGMENTS; i++) {
    const angle = (i / CIRCLE_SEGMENTS) * Math.PI * 2;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;

    // Color gradient based on angle
    const r = 1.0;
    const g = 0.5 + Math.sin(angle) * 0.3;
    const b = 0.2;
    OpenGL32.glColor3f(r, g, b);
    OpenGL32.glVertex2f(x, y);
  }

  OpenGL32.glEnd();
}

function render(): void {
  OpenGL32.glClear(GLenum.GL_COLOR_BUFFER_BIT);

  OpenGL32.glLoadIdentity();

  // Draw the bouncing circle
  drawCircle(circleX, HEIGHT / 2, CIRCLE_RADIUS);

  OpenGL32.glFlush();
}

function update(deltaTime: number): void {
  // Move circle based on time (deltaTime is in seconds)
  circleX += circleDirection * CIRCLE_SPEED * deltaTime;

  // Bounce off walls
  if (circleX + CIRCLE_RADIUS >= WIDTH) {
    circleX = WIDTH - CIRCLE_RADIUS;
    circleDirection = -1;
  } else if (circleX - CIRCLE_RADIUS <= 0) {
    circleX = CIRCLE_RADIUS;
    circleDirection = 1;
  }
}

// -----------------------------------------------------------------------------
// Main loop
// -----------------------------------------------------------------------------

function processMessages(): boolean {
  const msg = new ArrayBuffer(48); // MSG structure
  const msgPtr = ptr(new Uint8Array(msg));

  while (user32.symbols.PeekMessageW(msgPtr, null, 0, 0, PM.PM_REMOVE)) {
    const msgView = new DataView(msg);
    const message = msgView.getUint32(8, true);

    if (message === WindowMessage.WM_QUIT) {
      return false;
    }

    user32.symbols.TranslateMessage(msgPtr);
    user32.symbols.DispatchMessageW(msgPtr);
  }

  return !shouldClose;
}

function main(): void {
  console.log('Creating window...');
  const { hwnd, hdc } = createWindow();

  console.log('Setting up pixel format...');
  setupPixelFormat(hdc);

  console.log('Creating OpenGL context...');
  const hglrc = createGLContext(hdc);

  console.log('Initializing OpenGL...');
  initGL();

  console.log('Starting render loop...');
  console.log('Press Ctrl+C or close the window to exit.\n');

  // Main loop
  let lastTime = performance.now();
  let frameCount = 0;
  let fpsTime = 0;

  while (processMessages()) {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    // FPS counter
    frameCount++;
    fpsTime += deltaTime;
    if (fpsTime >= 1.0) {
      process.stdout.write(`\rFPS: ${frameCount}  `);
      frameCount = 0;
      fpsTime = 0;
    }

    update(deltaTime);
    render();
    gdi32.symbols.SwapBuffers(hdc);
  }

  console.log(); // Newline after FPS output

  // Cleanup
  console.log('Cleaning up...');
  OpenGL32.wglMakeCurrent(NULL_PTR, NULL_PTR);
  OpenGL32.wglDeleteContext(hglrc);
  user32.symbols.ReleaseDC(hwnd, hdc);

  if (wndProcCallback) {
    wndProcCallback.close();
  }

  console.log('Done!');
}

main();
