/**
 * N-Pendulum Example
 *
 * A generalized pendulum simulation with a configurable number of segments.
 * Watch the chaos increase exponentially with each added pendulum!
 *
 * Run with: bun run example/nPendulum.ts
 */

import { dlopen, FFIType, ptr, JSCallback, type Pointer } from 'bun:ffi';
import OpenGL32, { GLenum } from '../index';

// =============================================================================
// CONFIGURATION - Change this to set the number of pendulums!
// =============================================================================
const NUM_PENDULUMS = 2; // Try 2, 3, 4, 5, 6, 7... more = more chaos!

// Window dimensions
const HEIGHT = 850,
  WIDTH = 1100;

// Pendulum physics
const GRAVITY = 400;
const SEGMENT_LENGTH = Math.min(100, 400 / NUM_PENDULUMS); // Shorter segments for more pendulums
const SEGMENT_MASS = 10;

// State arrays
const angles: number[] = [];
const angularVels: number[] = [];
const lengths: number[] = [];
const masses: number[] = [];

// Initialize pendulum segments
for (let i = 0; i < NUM_PENDULUMS; i++) {
  // Start nearly straight up with tiny random offsets
  angles.push(Math.PI + (Math.random() - 0.5) * 0.02);
  angularVels.push(0);
  lengths.push(SEGMENT_LENGTH);
  masses.push(SEGMENT_MASS);
}

// Pivot point
const PIVOT_X = WIDTH / 2;
const PIVOT_Y = 100;

// Trail settings
const MAX_TRAIL_LENGTH = 500;
const trail: { x: number; y: number }[] = [];

// Colors - generate rainbow colors for each bob
const BOB_COLORS: { r: number; g: number; b: number }[] = [];
for (let i = 0; i < NUM_PENDULUMS; i++) {
  const hue = (i / NUM_PENDULUMS) * 360;
  const { r, g, b } = hslToRgb(hue, 0.8, 0.6);
  BOB_COLORS.push({ r, g, b });
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return { r: r + m, g: g + m, b: b + m };
}

// -----------------------------------------------------------------------------
// Minimal Win32 API bindings
// -----------------------------------------------------------------------------

const user32 = dlopen('user32.dll', {
  AdjustWindowRectEx: { args: [FFIType.ptr, FFIType.u32, FFIType.i32, FFIType.u32], returns: FFIType.i32 },
  CreateWindowExW: { args: [FFIType.u32, FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr], returns: FFIType.ptr }, // prettier-ignore
  DefWindowProcW: { args: [FFIType.ptr, FFIType.u32, FFIType.u64, FFIType.i64], returns: FFIType.i64 },
  DispatchMessageW: { args: [FFIType.ptr], returns: FFIType.i64 },
  GetDC: { args: [FFIType.ptr], returns: FFIType.ptr },
  GetSystemMetrics: { args: [FFIType.i32], returns: FFIType.i32 },
  PeekMessageW: { args: [FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.u32], returns: FFIType.i32 },
  PostQuitMessage: { args: [FFIType.i32], returns: FFIType.void },
  ReleaseDC: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.i32 },
  SetWindowLongPtrW: { args: [FFIType.ptr, FFIType.i32, FFIType.ptr], returns: FFIType.ptr },
  ShowWindow: { args: [FFIType.ptr, FFIType.i32], returns: FFIType.i32 },
  TranslateMessage: { args: [FFIType.ptr], returns: FFIType.i32 },
  UpdateWindow: { args: [FFIType.ptr], returns: FFIType.i32 },
});

const gdi32 = dlopen('gdi32.dll', {
  ChoosePixelFormat: { args: [FFIType.u64, FFIType.ptr], returns: FFIType.i32 },
  SetPixelFormat: { args: [FFIType.u64, FFIType.i32, FFIType.ptr], returns: FFIType.i32 },
  SwapBuffers: { args: [FFIType.u64], returns: FFIType.i32 },
});

const kernel32 = dlopen('kernel32.dll', {
  GetLastError: { args: [], returns: FFIType.u32 },
  GetModuleHandleW: { args: [FFIType.ptr], returns: FFIType.ptr },
});

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

let wndProcCallback: JSCallback | null = null;
let shouldClose = false;

const createWndProc = (): Pointer => {
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
  if (!cb.ptr) throw new Error('Failed to create window procedure callback');
  return cb.ptr;
};

const PIXEL_FORMAT_DESCRIPTOR = Buffer.from([
  0x28, 0x00, 0x01, 0x00, 0x25, 0x00, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00,
]);

// -----------------------------------------------------------------------------
// Window and OpenGL setup
// -----------------------------------------------------------------------------

function createWindow(): { hwnd: Pointer; hdc: Pointer; hdcU64: bigint } {
  const hInstance = kernel32.symbols.GetModuleHandleW(null);
  const screenWidth = user32.symbols.GetSystemMetrics(0x00);
  const screenHeight = user32.symbols.GetSystemMetrics(0x01);
  const x = ((screenWidth - WIDTH) / 2) | 0;
  const y = ((screenHeight - HEIGHT) / 2) | 0;

  const rect = new ArrayBuffer(16);
  const rectView = new DataView(rect);
  rectView.setInt32(0, 0, true);
  rectView.setInt32(4, 0, true);
  rectView.setInt32(8, WIDTH, true);
  rectView.setInt32(12, HEIGHT, true);
  user32.symbols.AdjustWindowRectEx(ptr(new Uint8Array(rect)), WindowStyle.WS_OVERLAPPEDWINDOW, 0, 0);
  const adjustedWidth = rectView.getInt32(8, true) - rectView.getInt32(0, true);
  const adjustedHeight = rectView.getInt32(12, true) - rectView.getInt32(4, true);

  const hwnd = user32.symbols.CreateWindowExW(
    0,
    Buffer.from('STATIC\0', 'utf16le'),
    Buffer.from(`${NUM_PENDULUMS}-Pendulum - bun-opengl32\0`, 'utf16le'),
    WindowStyle.WS_OVERLAPPEDWINDOW | WindowStyle.WS_VISIBLE,
    x,
    y,
    adjustedWidth,
    adjustedHeight,
    null,
    null,
    hInstance,
    null
  );
  if (!hwnd) throw new Error(`CreateWindowExW failed: ${kernel32.symbols.GetLastError()}`);

  const wndProcPtr = createWndProc();
  if (!user32.symbols.SetWindowLongPtrW(hwnd, -4, wndProcPtr)) {
    throw new Error(`SetWindowLongPtrW failed: ${kernel32.symbols.GetLastError()}`);
  }

  const hdc = user32.symbols.GetDC(hwnd);
  if (!hdc) throw new Error(`GetDC failed: ${kernel32.symbols.GetLastError()}`);

  const hdcU64 = BigInt(Number(hdc));
  const pixelFormat = gdi32.symbols.ChoosePixelFormat(hdcU64, PIXEL_FORMAT_DESCRIPTOR);
  if (pixelFormat === 0) throw new Error(`ChoosePixelFormat failed: ${kernel32.symbols.GetLastError()}`);
  if (!gdi32.symbols.SetPixelFormat(hdcU64, pixelFormat, PIXEL_FORMAT_DESCRIPTOR)) {
    throw new Error(`SetPixelFormat failed: ${kernel32.symbols.GetLastError()}`);
  }

  user32.symbols.ShowWindow(hwnd, SW.SW_SHOW);
  user32.symbols.UpdateWindow(hwnd);

  return { hwnd, hdc, hdcU64 };
}

function createGLContext(hdc: Pointer): Pointer {
  const hglrc = OpenGL32.wglCreateContext(hdc);
  if (!hglrc) throw new Error(`wglCreateContext failed: ${kernel32.symbols.GetLastError()}`);
  if (!OpenGL32.wglMakeCurrent(hdc, hglrc)) {
    throw new Error(`wglMakeCurrent failed: ${kernel32.symbols.GetLastError()}`);
  }
  return hglrc;
}

function initGL(): void {
  OpenGL32.glMatrixMode(GLenum.GL_PROJECTION);
  OpenGL32.glLoadIdentity();
  OpenGL32.glOrtho(0, WIDTH, HEIGHT, 0, -1, 1);
  OpenGL32.glMatrixMode(GLenum.GL_MODELVIEW);
  OpenGL32.glLoadIdentity();
  OpenGL32.glClearColor(0.02, 0.02, 0.05, 1.0);
  OpenGL32.glEnable(GLenum.GL_BLEND);
  OpenGL32.glBlendFunc(GLenum.GL_SRC_ALPHA, GLenum.GL_ONE_MINUS_SRC_ALPHA);
  OpenGL32.glEnable(GLenum.GL_LINE_SMOOTH);
  OpenGL32.glLineWidth(2.0);
}

// -----------------------------------------------------------------------------
// N-Pendulum Physics using Lagrangian Mechanics
// Solves the general NxN mass matrix system for rigid pendulums
// -----------------------------------------------------------------------------

function updatePendulum(dt: number): void {
  const n = NUM_PENDULUMS;
  const g = GRAVITY;

  // More substeps for more pendulums (stability)
  const steps = Math.max(10, n * 5);
  const h = dt / steps;

  for (let step = 0; step < steps; step++) {
    // Build mass matrix M and force vector F
    // M * alpha = F, where alpha is angular accelerations
    const M: number[][] = [];
    const F: number[] = [];

    for (let i = 0; i < n; i++) {
      M[i] = [];
      for (let j = 0; j < n; j++) {
        M[i][j] = 0;
      }
      F[i] = 0;
    }

    // Calculate mass matrix elements and forces
    for (let i = 0; i < n; i++) {
      // Mass below and including pendulum i
      let massBelow = 0;
      for (let k = i; k < n; k++) {
        massBelow += masses[k]!;
      }

      for (let j = 0; j < n; j++) {
        // Mass below max(i,j)
        let massBelowMax = 0;
        for (let k = Math.max(i, j); k < n; k++) {
          massBelowMax += masses[k]!;
        }

        // M[i][j] = sum of m_k * l_i * l_j * cos(theta_i - theta_j) for k >= max(i,j)
        M[i]![j] = massBelowMax * lengths[i]! * lengths[j]! * Math.cos(angles[i]! - angles[j]!);
      }

      // Gravity torque
      F[i] = -massBelow * g * lengths[i]! * Math.sin(angles[i]!);

      // Coriolis/centrifugal terms from other pendulums
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          let massBelowMax = 0;
          for (let k = Math.max(i, j); k < n; k++) {
            massBelowMax += masses[k]!;
          }
          F[i]! -= massBelowMax * lengths[i]! * lengths[j]! * angularVels[j]! * angularVels[j]! * Math.sin(angles[i]! - angles[j]!);
        }
      }
    }

    // Solve M * alpha = F using Gaussian elimination with partial pivoting
    const alpha = solveLinearSystem(M, F);

    // Semi-implicit Euler integration
    for (let i = 0; i < n; i++) {
      angularVels[i] = angularVels[i]! + alpha[i]! * h;
      angles[i] = angles[i]! + angularVels[i]! * h;
    }
  }

  // Calculate last bob position for trail
  let x = PIVOT_X;
  let y = PIVOT_Y;
  for (let i = 0; i < n; i++) {
    x += lengths[i]! * Math.sin(angles[i]!);
    y += lengths[i]! * Math.cos(angles[i]!);
  }

  trail.push({ x, y });
  if (trail.length > MAX_TRAIL_LENGTH) {
    trail.shift();
  }
}

function solveLinearSystem(A: number[][], b: number[]): number[] {
  const n = A.length;

  // Create augmented matrix
  const aug: number[][] = [];
  for (let i = 0; i < n; i++) {
    aug[i] = [...A[i]!, b[i]!];
  }

  // Gaussian elimination with partial pivoting
  for (let col = 0; col < n; col++) {
    // Find pivot
    let maxRow = col;
    let maxVal = Math.abs(aug[col]![col]!);
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(aug[row]![col]!) > maxVal) {
        maxVal = Math.abs(aug[row]![col]!);
        maxRow = row;
      }
    }

    // Swap rows
    if (maxRow !== col) {
      [aug[col], aug[maxRow]] = [aug[maxRow]!, aug[col]!];
    }

    // Check for singular matrix
    if (Math.abs(aug[col]![col]!) < 1e-12) {
      continue;
    }

    // Eliminate column
    for (let row = col + 1; row < n; row++) {
      const factor = aug[row]![col]! / aug[col]![col]!;
      for (let j = col; j <= n; j++) {
        aug[row]![j] = aug[row]![j]! - factor * aug[col]![j]!;
      }
    }
  }

  // Back substitution
  const x: number[] = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(aug[i]![i]!) < 1e-12) {
      x[i] = 0;
      continue;
    }
    x[i] = aug[i]![n]!;
    for (let j = i + 1; j < n; j++) {
      x[i] = x[i]! - aug[i]![j]! * x[j]!;
    }
    x[i] = x[i]! / aug[i]![i]!;
  }

  return x;
}

// -----------------------------------------------------------------------------
// Rendering
// -----------------------------------------------------------------------------

function drawCircle(cx: number, cy: number, radius: number, r: number, g: number, b: number): void {
  const segments = 20;

  // Glow effect
  OpenGL32.glBegin(GLenum.GL_TRIANGLE_FAN);
  OpenGL32.glColor4f(r, g, b, 0.3);
  OpenGL32.glVertex2f(cx, cy);
  OpenGL32.glColor4f(r, g, b, 0.0);
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    OpenGL32.glVertex2f(cx + Math.cos(angle) * radius * 1.8, cy + Math.sin(angle) * radius * 1.8);
  }
  OpenGL32.glEnd();

  // Main circle
  OpenGL32.glBegin(GLenum.GL_TRIANGLE_FAN);
  OpenGL32.glColor4f(1.0, 1.0, 1.0, 1.0);
  OpenGL32.glVertex2f(cx - radius * 0.25, cy - radius * 0.25);
  OpenGL32.glColor4f(r, g, b, 1.0);
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    OpenGL32.glVertex2f(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
  }
  OpenGL32.glEnd();
}

function drawTrail(): void {
  if (trail.length < 2) return;

  OpenGL32.glBegin(GLenum.GL_LINE_STRIP);
  for (let i = 0; i < trail.length; i++) {
    const t = i / trail.length;
    const alpha = t * 0.9;
    // Rainbow trail
    const hue = (t * 360 + Date.now() * 0.05) % 360;
    const { r, g, b } = hslToRgb(hue, 0.8, 0.5);
    OpenGL32.glColor4f(r, g, b, alpha);
    OpenGL32.glVertex2f(trail[i]!.x, trail[i]!.y);
  }
  OpenGL32.glEnd();
}

function drawPivot(): void {
  const segments = 12;
  OpenGL32.glBegin(GLenum.GL_TRIANGLE_FAN);
  OpenGL32.glColor4f(0.5, 0.5, 0.5, 1.0);
  OpenGL32.glVertex2f(PIVOT_X, PIVOT_Y);
  OpenGL32.glColor4f(0.3, 0.3, 0.3, 1.0);
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    OpenGL32.glVertex2f(PIVOT_X + Math.cos(angle) * 8, PIVOT_Y + Math.sin(angle) * 8);
  }
  OpenGL32.glEnd();
}

function render(): void {
  OpenGL32.glClear(GLenum.GL_COLOR_BUFFER_BIT);
  OpenGL32.glLoadIdentity();

  // Calculate all bob positions
  const positions: { x: number; y: number }[] = [{ x: PIVOT_X, y: PIVOT_Y }];
  let x = PIVOT_X;
  let y = PIVOT_Y;
  for (let i = 0; i < NUM_PENDULUMS; i++) {
    x += lengths[i]! * Math.sin(angles[i]!);
    y += lengths[i]! * Math.cos(angles[i]!);
    positions.push({ x, y });
  }

  // Draw trail first
  drawTrail();

  // Draw arms
  OpenGL32.glLineWidth(2.5);
  OpenGL32.glBegin(GLenum.GL_LINE_STRIP);
  OpenGL32.glColor4f(0.6, 0.6, 0.7, 1.0);
  for (const pos of positions) {
    OpenGL32.glVertex2f(pos.x, pos.y);
  }
  OpenGL32.glEnd();
  OpenGL32.glLineWidth(2.0);

  // Draw pivot
  drawPivot();

  // Draw bobs
  const bobRadius = Math.max(6, 14 - NUM_PENDULUMS);
  for (let i = 0; i < NUM_PENDULUMS; i++) {
    const color = BOB_COLORS[i]!;
    drawCircle(positions[i + 1]!.x, positions[i + 1]!.y, bobRadius, color.r, color.g, color.b);
  }

  OpenGL32.glFlush();
}

// -----------------------------------------------------------------------------
// Main loop
// -----------------------------------------------------------------------------

function processMessages(): boolean {
  const msg = new ArrayBuffer(48);
  const msgPtr = ptr(new Uint8Array(msg));

  while (user32.symbols.PeekMessageW(msgPtr, null, 0, 0, PM.PM_REMOVE)) {
    const msgView = new DataView(msg);
    const message = msgView.getUint32(8, true);
    if (message === WindowMessage.WM_QUIT) return false;
    user32.symbols.TranslateMessage(msgPtr);
    user32.symbols.DispatchMessageW(msgPtr);
  }

  return !shouldClose;
}

function main(): void {
  console.log('Creating window...');
  const { hwnd, hdc, hdcU64 } = createWindow();

  console.log('Creating OpenGL context...');
  const hglrc = createGLContext(hdc);

  OpenGL32.PreloadExtensions(['wglSwapIntervalEXT']);
  OpenGL32.wglSwapIntervalEXT(0); // VSync off

  console.log('Initializing...');
  initGL();

  console.log(`Starting ${NUM_PENDULUMS}-pendulum simulation...`);
  console.log('  Watch the chaos unfold!');
  console.log(`  ${NUM_PENDULUMS} segments = ${Math.pow(2, NUM_PENDULUMS - 1)}x more chaotic than single pendulum`);
  console.log('  Press Ctrl+C or close the window to exit.\n');

  let lastTime = Bun.nanoseconds();
  let frameCount = 0;
  let fpsTime = 0;
  let accumulator = 0;
  const FIXED_DT = 1 / 120;

  while (processMessages()) {
    const currentTime = Bun.nanoseconds();
    const deltaTime = Math.min((currentTime - lastTime) / 1_000_000_000, 0.1);
    lastTime = currentTime;

    frameCount++;
    fpsTime += deltaTime;
    if (fpsTime >= 1.0) {
      process.stdout.write(`\rFPS: ${frameCount} | Trail: ${trail.length} | Segments: ${NUM_PENDULUMS}    `);
      frameCount = 0;
      fpsTime = 0;
    }

    accumulator += deltaTime;
    while (accumulator >= FIXED_DT) {
      updatePendulum(FIXED_DT);
      accumulator -= FIXED_DT;
    }

    render();
    gdi32.symbols.SwapBuffers(hdcU64);
  }

  console.log();

  // Cleanup
  console.log('Cleaning up...');
  // @ts-expect-error null is valid for releasing context
  OpenGL32.wglMakeCurrent(null, null);
  OpenGL32.wglDeleteContext(hglrc);
  user32.symbols.ReleaseDC(hwnd, hdc);

  if (wndProcCallback) {
    wndProcCallback.close();
  }

  console.log('Done!');
}

main();
