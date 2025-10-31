# bun-opengl32

Zero-overhead OpenGL 1.1 + WGL bindings for [Bun](https://bun.sh) on Windows.

## Overview

`bun-opengl32` exposes the OpenGL 1.1 and WGL entry points exported by `opengl32.dll` using [Bun](https://bun.sh)'s FFI. It provides a single class, `OpenGL32`, which lazily binds native symbols once via `Init()` and then calls directly into the DLL.

The bindings are strongly typed for a smooth DX in TypeScript. Symbol definitions were generated with AI assistance and reviewed for correctness against Win32/OpenGL 1.1 signatures.

## Features

- [Bun](https://bun.sh)-first ergonomics on Windows 10/11
- Direct FFI to `opengl32.dll` (OpenGL 1.1 + WGL)
- Lazy, one-time initialization (`OpenGL32.Init()`)
- No wrapper overhead; calls map 1:1 to native APIs
- Strongly-typed enums and aliases (see `types/OpenGL.ts`)

## Requirements

- A current OpenGL context for most `gl*` calls (via WGL or your windowing library)
- [Bun](https://bun.sh) runtime
- Windows 10 or later

## Installation

```sh
bun add bun-opengl32
```

## Quick Start

```ts
import OpenGL32, { GLenum } from 'bun-opengl32';

// Bind all symbols from opengl32.dll once
OpenGL32.Init();

// Use any OpenGL 1.1 entry point
OpenGL32.glMatrixMode(GLenum.Modelview);

// If you already have a current context, you can query strings:
// const vendorPtr = OpenGL32.glGetString(GLenum.Vendor);
// Convert the returned C string pointer to a JS string with your FFI helper.
```

For a tiny usage example, see `example/openGL32.ts`.

## API Highlights

- `Init()` - Loads and binds all `gl*` and `wgl*` symbols.
- `gl*` - Full OpenGL 1.1 surface (exact names and signatures).
- `wgl*` - Core WGL entry points for context and pixel format management.
- `Symbols` - The internal FFI map used by `dlopen`; useful for introspection.
- In-source docs - Every `gl*`/`wgl*` method includes a Microsoft Docs link above its declaration in `structs/OpenGL32.ts`.

Tip: Use `glGetError()` to check failures after critical calls:

```ts
// After a sequence of gl* calls
const err = OpenGL32.glGetError();
if (err !== GLenum.NoError) {
  // Handle error; see GLenum.InvalidEnum/InvalidValue/etc.
}
```

The code and type definitions are the source of truth; all methods mirror their native signatures.

## Example: Creating a Context (WGL)

This package focuses on symbol access. You still need to obtain an `HDC` from your windowing layer (Win32, SDL, GLFW) before creating a context. Once you have an `HDC`:

```ts
// Acquire HDC from your window code
const hdc /* : HDC */ = /* ... */ null as any;

OpenGL32.Init();

// Create and make a context current
const hglrc = OpenGL32.wglCreateContext(hdc);
OpenGL32.wglMakeCurrent(hdc, hglrc);

// Now gl* calls that require a current context are valid
// OpenGL32.glClearColor(0.1, 0.1, 0.1, 1.0);
// OpenGL32.glClear(GLenum.ColorBufferBit);
```

For modern functionality, use `wglGetProcAddress` to fetch extension entry points.

## Notes

- Always call `OpenGL32.Init()` before any `gl*`/`wgl*` call.
- Extensions and newer functionality must be loaded via `wglGetProcAddress`.
- Most `gl*` entry points require a current context; without one they may no-op or fail.
- The surface targets the OpenGL 1.1 API exported by `opengl32.dll`.
- Windows only. [Bun](https://bun.sh) runtime required.

## TODO

- Struct layouts for Windows interop: `PIXELFORMATDESCRIPTOR`, `LAYERPLANEDESCRIPTOR`, `GLYPHMETRICSFLOAT`, `WGLSWAP` (typed buffers + helpers).
- Typed wrappers for common WGL extensions (create context attributes, pixel format selection, swap control) are scaffolded via `structs/Extensions.ts`.

---

For a minimal demo, see `example/openGL32.ts`.
