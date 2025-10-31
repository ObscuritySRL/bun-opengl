import { type FFIFunction, FFIType, dlopen } from 'bun:ffi';

import type {
  GLbitfield,
  GLboolean,
  GLboolean_,
  GLbyte,
  GLbyte_,
  GLclampd,
  GLclampf,
  GLclampf_,
  GLdouble,
  GLdouble_,
  GLenum,
  GLfloat,
  GLfloat_,
  GLint,
  GLint_,
  GLshort,
  GLshort_,
  GLsizei,
  GLubyte,
  GLubyte_,
  GLuint,
  GLuint_,
  GLushort,
  GLushort_,
  GLvoid_,

  // Windows/WGL aliases
  BOOL,
  INT,
  UINT,
  DWORD,
  HDC,
  HGLRC,
  PROC,
  LPCSTR,
  LPPIXELFORMATDESCRIPTOR,
  LPLAYERPLANEDESCRIPTOR,
  LPGLYPHMETRICSFLOAT,
  LPWGLSWAP,
} from '../types/OpenGL32';

class OpenGL32 {
  public static Init(): typeof OpenGL32 {
    const { symbols } = dlopen('opengl32.dll', OpenGL32.Symbols);

    return Object.defineProperties(OpenGL32, {
      ...Object.fromEntries(Object.entries(symbols).map(([name, symbol]) => [name, { configurable: false, value: symbol, writable: false }])),
      Init: { configurable: false, value: () => OpenGL32, writable: false },
    });
  }

  private static readonly Symbols = {
    glAccum: { args: [FFIType.u32, FFIType.f32], returns: FFIType.void },
    glAlphaFunc: { args: [FFIType.u32, FFIType.f32], returns: FFIType.void },
    glAreTexturesResident: { args: [FFIType.i32, FFIType.ptr, FFIType.ptr], returns: FFIType.u8 },
    glArrayElement: { args: [FFIType.i32], returns: FFIType.void },
    glBegin: { args: [FFIType.u32], returns: FFIType.void },
    glBindTexture: { args: [FFIType.u32, FFIType.u32], returns: FFIType.void },
    glBitmap: { args: [FFIType.i32, FFIType.i32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.ptr], returns: FFIType.void },
    glBlendFunc: { args: [FFIType.u32, FFIType.u32], returns: FFIType.void },
    glCallList: { args: [FFIType.u32], returns: FFIType.void },
    glCallLists: { args: [FFIType.i32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glClear: { args: [FFIType.u32], returns: FFIType.void },
    glClearAccum: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glClearColor: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glClearDepth: { args: [FFIType.f64], returns: FFIType.void },
    glClearIndex: { args: [FFIType.f32], returns: FFIType.void },
    glClearStencil: { args: [FFIType.i32], returns: FFIType.void },
    glClipPlane: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glColor3b: { args: [FFIType.i8, FFIType.i8, FFIType.i8], returns: FFIType.void },
    glColor3bv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor3d: { args: [FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glColor3dv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor3f: { args: [FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glColor3fv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor3i: { args: [FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glColor3iv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor3s: { args: [FFIType.i16, FFIType.i16, FFIType.i16], returns: FFIType.void },
    glColor3sv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor3ub: { args: [FFIType.u8, FFIType.u8, FFIType.u8], returns: FFIType.void },
    glColor3ubv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor3ui: { args: [FFIType.u32, FFIType.u32, FFIType.u32], returns: FFIType.void },
    glColor3uiv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor3us: { args: [FFIType.u16, FFIType.u16, FFIType.u16], returns: FFIType.void },
    glColor3usv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor4b: { args: [FFIType.i8, FFIType.i8, FFIType.i8, FFIType.i8], returns: FFIType.void },
    glColor4bv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor4d: { args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glColor4dv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor4f: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glColor4fv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor4i: { args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glColor4iv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor4s: { args: [FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16], returns: FFIType.void },
    glColor4sv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor4ub: { args: [FFIType.u8, FFIType.u8, FFIType.u8, FFIType.u8], returns: FFIType.void },
    glColor4ubv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor4ui: { args: [FFIType.u32, FFIType.u32, FFIType.u32, FFIType.u32], returns: FFIType.void },
    glColor4uiv: { args: [FFIType.ptr], returns: FFIType.void },
    glColor4us: { args: [FFIType.u16, FFIType.u16, FFIType.u16, FFIType.u16], returns: FFIType.void },
    glColor4usv: { args: [FFIType.ptr], returns: FFIType.void },
    glColorMask: { args: [FFIType.u8, FFIType.u8, FFIType.u8, FFIType.u8], returns: FFIType.void },
    glColorMaterial: { args: [FFIType.u32, FFIType.u32], returns: FFIType.void },
    glColorPointer: { args: [FFIType.i32, FFIType.u32, FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glCopyPixels: { args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.u32], returns: FFIType.void },
    glCopyTexImage1D: { args: [FFIType.u32, FFIType.i32, FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glCopyTexImage2D: { args: [FFIType.u32, FFIType.i32, FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glCopyTexSubImage1D: { args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glCopyTexSubImage2D: { args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glCullFace: { args: [FFIType.u32], returns: FFIType.void },
    glDeleteLists: { args: [FFIType.u32, FFIType.i32], returns: FFIType.void },
    glDeleteTextures: { args: [FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glDepthFunc: { args: [FFIType.u32], returns: FFIType.void },
    glDepthMask: { args: [FFIType.u8], returns: FFIType.void },
    glDepthRange: { args: [FFIType.f64, FFIType.f64], returns: FFIType.void },
    glDisable: { args: [FFIType.u32], returns: FFIType.void },
    glDisableClientState: { args: [FFIType.u32], returns: FFIType.void },
    glDrawArrays: { args: [FFIType.u32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glDrawBuffer: { args: [FFIType.u32], returns: FFIType.void },
    glDrawElements: { args: [FFIType.u32, FFIType.i32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glDrawPixels: { args: [FFIType.i32, FFIType.i32, FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glEdgeFlag: { args: [FFIType.u8], returns: FFIType.void },
    glEdgeFlagPointer: { args: [FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glEdgeFlagv: { args: [FFIType.ptr], returns: FFIType.void },
    glEnable: { args: [FFIType.u32], returns: FFIType.void },
    glEnableClientState: { args: [FFIType.u32], returns: FFIType.void },
    glEnd: { args: [], returns: FFIType.void },
    glEndList: { args: [], returns: FFIType.void },
    glEvalCoord1d: { args: [FFIType.f64], returns: FFIType.void },
    glEvalCoord1dv: { args: [FFIType.ptr], returns: FFIType.void },
    glEvalCoord1f: { args: [FFIType.f32], returns: FFIType.void },
    glEvalCoord1fv: { args: [FFIType.ptr], returns: FFIType.void },
    glEvalCoord2d: { args: [FFIType.f64, FFIType.f64], returns: FFIType.void },
    glEvalCoord2dv: { args: [FFIType.ptr], returns: FFIType.void },
    glEvalCoord2f: { args: [FFIType.f32, FFIType.f32], returns: FFIType.void },
    glEvalCoord2fv: { args: [FFIType.ptr], returns: FFIType.void },
    glEvalMesh1: { args: [FFIType.u32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glEvalMesh2: { args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glEvalPoint1: { args: [FFIType.i32], returns: FFIType.void },
    glEvalPoint2: { args: [FFIType.i32, FFIType.i32], returns: FFIType.void },
    glFeedbackBuffer: { args: [FFIType.i32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glFinish: { args: [], returns: FFIType.void },
    glFlush: { args: [], returns: FFIType.void },
    glFogf: { args: [FFIType.u32, FFIType.f32], returns: FFIType.void },
    glFogfv: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glFogi: { args: [FFIType.u32, FFIType.i32], returns: FFIType.void },
    glFogiv: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glFrontFace: { args: [FFIType.u32], returns: FFIType.void },
    glFrustum: { args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glGenLists: { args: [FFIType.i32], returns: FFIType.u32 },
    glGenTextures: { args: [FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glGetBooleanv: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetClipPlane: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetDoublev: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetError: { args: [], returns: FFIType.u32 },
    glGetFloatv: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetIntegerv: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetLightfv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetLightiv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetMapdv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetMapfv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetMapiv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetMaterialfv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetMaterialiv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetPixelMapfv: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetPixelMapuiv: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetPixelMapusv: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetPointerv: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetPolygonStipple: { args: [FFIType.ptr], returns: FFIType.void },
    glGetString: { args: [FFIType.u32], returns: FFIType.ptr },
    glGetTexEnvfv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetTexEnviv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetTexGendv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetTexGenfv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetTexGeniv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetTexImage: { args: [FFIType.u32, FFIType.i32, FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetTexLevelParameterfv: { args: [FFIType.u32, FFIType.i32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetTexLevelParameteriv: { args: [FFIType.u32, FFIType.i32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetTexParameterfv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glGetTexParameteriv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glHint: { args: [FFIType.u32, FFIType.u32], returns: FFIType.void },
    glIndexd: { args: [FFIType.f64], returns: FFIType.void },
    glIndexdv: { args: [FFIType.ptr], returns: FFIType.void },
    glIndexf: { args: [FFIType.f32], returns: FFIType.void },
    glIndexfv: { args: [FFIType.ptr], returns: FFIType.void },
    glIndexi: { args: [FFIType.i32], returns: FFIType.void },
    glIndexiv: { args: [FFIType.ptr], returns: FFIType.void },
    glIndexMask: { args: [FFIType.u32], returns: FFIType.void },
    glIndexPointer: { args: [FFIType.u32, FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glIndexs: { args: [FFIType.i16], returns: FFIType.void },
    glIndexsv: { args: [FFIType.ptr], returns: FFIType.void },
    glIndexub: { args: [FFIType.u8], returns: FFIType.void },
    glIndexubv: { args: [FFIType.ptr], returns: FFIType.void },
    glInitNames: { args: [], returns: FFIType.void },
    glInterleavedArrays: { args: [FFIType.u32, FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glIsEnabled: { args: [FFIType.u32], returns: FFIType.u8 },
    glIsList: { args: [FFIType.u32], returns: FFIType.u8 },
    glIsTexture: { args: [FFIType.u32], returns: FFIType.u8 },
    glLightf: { args: [FFIType.u32, FFIType.u32, FFIType.f32], returns: FFIType.void },
    glLightfv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glLighti: { args: [FFIType.u32, FFIType.u32, FFIType.i32], returns: FFIType.void },
    glLightiv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glLightModelf: { args: [FFIType.u32, FFIType.f32], returns: FFIType.void },
    glLightModelfv: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glLightModeli: { args: [FFIType.u32, FFIType.i32], returns: FFIType.void },
    glLightModeliv: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glLineStipple: { args: [FFIType.i32, FFIType.u16], returns: FFIType.void },
    glLineWidth: { args: [FFIType.f32], returns: FFIType.void },
    glListBase: { args: [FFIType.u32], returns: FFIType.void },
    glLoadIdentity: { args: [], returns: FFIType.void },
    glLoadMatrixd: { args: [FFIType.ptr], returns: FFIType.void },
    glLoadMatrixf: { args: [FFIType.ptr], returns: FFIType.void },
    glLoadName: { args: [FFIType.u32], returns: FFIType.void },
    glLogicOp: { args: [FFIType.u32], returns: FFIType.void },
    glMap1d: { args: [FFIType.u32, FFIType.f64, FFIType.f64, FFIType.i32, FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glMap1f: { args: [FFIType.u32, FFIType.f32, FFIType.f32, FFIType.i32, FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glMap2d: { args: [FFIType.u32, FFIType.f64, FFIType.f64, FFIType.i32, FFIType.i32, FFIType.f64, FFIType.f64, FFIType.i32, FFIType.i32, FFIType.ptr], returns: FFIType.void }, // prettier-ignore
    glMap2f: { args: [FFIType.u32, FFIType.f32, FFIType.f32, FFIType.i32, FFIType.i32, FFIType.f32, FFIType.f32, FFIType.i32, FFIType.i32, FFIType.ptr], returns: FFIType.void }, // prettier-ignore
    glMapGrid1d: { args: [FFIType.i32, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glMapGrid1f: { args: [FFIType.i32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glMapGrid2d: { args: [FFIType.i32, FFIType.f64, FFIType.f64, FFIType.i32, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glMapGrid2f: { args: [FFIType.i32, FFIType.f32, FFIType.f32, FFIType.i32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glMaterialf: { args: [FFIType.u32, FFIType.u32, FFIType.f32], returns: FFIType.void },
    glMaterialfv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glMateriali: { args: [FFIType.u32, FFIType.u32, FFIType.i32], returns: FFIType.void },
    glMaterialiv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glMatrixMode: { args: [FFIType.u32], returns: FFIType.void },
    glMultMatrixd: { args: [FFIType.ptr], returns: FFIType.void },
    glMultMatrixf: { args: [FFIType.ptr], returns: FFIType.void },
    glNewList: { args: [FFIType.u32, FFIType.u32], returns: FFIType.void },
    glNormal3b: { args: [FFIType.i8, FFIType.i8, FFIType.i8], returns: FFIType.void },
    glNormal3bv: { args: [FFIType.ptr], returns: FFIType.void },
    glNormal3d: { args: [FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glNormal3dv: { args: [FFIType.ptr], returns: FFIType.void },
    glNormal3f: { args: [FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glNormal3fv: { args: [FFIType.ptr], returns: FFIType.void },
    glNormal3i: { args: [FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glNormal3iv: { args: [FFIType.ptr], returns: FFIType.void },
    glNormal3s: { args: [FFIType.i16, FFIType.i16, FFIType.i16], returns: FFIType.void },
    glNormal3sv: { args: [FFIType.ptr], returns: FFIType.void },
    glNormalPointer: { args: [FFIType.u32, FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glOrtho: { args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glPassThrough: { args: [FFIType.f32], returns: FFIType.void },
    glPixelMapfv: { args: [FFIType.u32, FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glPixelMapuiv: { args: [FFIType.u32, FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glPixelMapusv: { args: [FFIType.u32, FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glPixelStoref: { args: [FFIType.u32, FFIType.f32], returns: FFIType.void },
    glPixelStorei: { args: [FFIType.u32, FFIType.i32], returns: FFIType.void },
    glPixelTransferf: { args: [FFIType.u32, FFIType.f32], returns: FFIType.void },
    glPixelTransferi: { args: [FFIType.u32, FFIType.i32], returns: FFIType.void },
    glPixelZoom: { args: [FFIType.f32, FFIType.f32], returns: FFIType.void },
    glPointSize: { args: [FFIType.f32], returns: FFIType.void },
    glPolygonMode: { args: [FFIType.u32, FFIType.u32], returns: FFIType.void },
    glPolygonOffset: { args: [FFIType.f32, FFIType.f32], returns: FFIType.void },
    glPolygonStipple: { args: [FFIType.ptr], returns: FFIType.void },
    glPopAttrib: { args: [], returns: FFIType.void },
    glPopClientAttrib: { args: [], returns: FFIType.void },
    glPopMatrix: { args: [], returns: FFIType.void },
    glPopName: { args: [], returns: FFIType.void },
    glPrioritizeTextures: { args: [FFIType.i32, FFIType.ptr, FFIType.ptr], returns: FFIType.void },
    glPushAttrib: { args: [FFIType.u32], returns: FFIType.void },
    glPushClientAttrib: { args: [FFIType.u32], returns: FFIType.void },
    glPushMatrix: { args: [], returns: FFIType.void },
    glPushName: { args: [FFIType.u32], returns: FFIType.void },
    glRasterPos2d: { args: [FFIType.f64, FFIType.f64], returns: FFIType.void },
    glRasterPos2dv: { args: [FFIType.ptr], returns: FFIType.void },
    glRasterPos2f: { args: [FFIType.f32, FFIType.f32], returns: FFIType.void },
    glRasterPos2fv: { args: [FFIType.ptr], returns: FFIType.void },
    glRasterPos2i: { args: [FFIType.i32, FFIType.i32], returns: FFIType.void },
    glRasterPos2iv: { args: [FFIType.ptr], returns: FFIType.void },
    glRasterPos2s: { args: [FFIType.i16, FFIType.i16], returns: FFIType.void },
    glRasterPos2sv: { args: [FFIType.ptr], returns: FFIType.void },
    glRasterPos3d: { args: [FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glRasterPos3dv: { args: [FFIType.ptr], returns: FFIType.void },
    glRasterPos3f: { args: [FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glRasterPos3fv: { args: [FFIType.ptr], returns: FFIType.void },
    glRasterPos3i: { args: [FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glRasterPos3iv: { args: [FFIType.ptr], returns: FFIType.void },
    glRasterPos3s: { args: [FFIType.i16, FFIType.i16, FFIType.i16], returns: FFIType.void },
    glRasterPos3sv: { args: [FFIType.ptr], returns: FFIType.void },
    glRasterPos4d: { args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glRasterPos4dv: { args: [FFIType.ptr], returns: FFIType.void },
    glRasterPos4f: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glRasterPos4fv: { args: [FFIType.ptr], returns: FFIType.void },
    glRasterPos4i: { args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glRasterPos4iv: { args: [FFIType.ptr], returns: FFIType.void },
    glRasterPos4s: { args: [FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16], returns: FFIType.void },
    glRasterPos4sv: { args: [FFIType.ptr], returns: FFIType.void },
    glReadBuffer: { args: [FFIType.u32], returns: FFIType.void },
    glReadPixels: { args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glRectd: { args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glRectdv: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.void },
    glRectf: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glRectfv: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.void },
    glRecti: { args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glRectiv: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.void },
    glRects: { args: [FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16], returns: FFIType.void },
    glRectsv: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.void },
    glRenderMode: { args: [FFIType.u32], returns: FFIType.i32 },
    glRotated: { args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glRotatef: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glScaled: { args: [FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glScalef: { args: [FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glScissor: { args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glSelectBuffer: { args: [FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glShadeModel: { args: [FFIType.u32], returns: FFIType.void },
    glStencilFunc: { args: [FFIType.u32, FFIType.i32, FFIType.u32], returns: FFIType.void },
    glStencilMask: { args: [FFIType.u32], returns: FFIType.void },
    glStencilOp: { args: [FFIType.u32, FFIType.u32, FFIType.u32], returns: FFIType.void },
    glTexCoord1d: { args: [FFIType.f64], returns: FFIType.void },
    glTexCoord1dv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord1f: { args: [FFIType.f32], returns: FFIType.void },
    glTexCoord1fv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord1i: { args: [FFIType.i32], returns: FFIType.void },
    glTexCoord1iv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord1s: { args: [FFIType.i16], returns: FFIType.void },
    glTexCoord1sv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord2d: { args: [FFIType.f64, FFIType.f64], returns: FFIType.void },
    glTexCoord2dv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord2f: { args: [FFIType.f32, FFIType.f32], returns: FFIType.void },
    glTexCoord2fv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord2i: { args: [FFIType.i32, FFIType.i32], returns: FFIType.void },
    glTexCoord2iv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord2s: { args: [FFIType.i16, FFIType.i16], returns: FFIType.void },
    glTexCoord2sv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord3d: { args: [FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glTexCoord3dv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord3f: { args: [FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glTexCoord3fv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord3i: { args: [FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glTexCoord3iv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord3s: { args: [FFIType.i16, FFIType.i16, FFIType.i16], returns: FFIType.void },
    glTexCoord3sv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord4d: { args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glTexCoord4dv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord4f: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glTexCoord4fv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord4i: { args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glTexCoord4iv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoord4s: { args: [FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16], returns: FFIType.void },
    glTexCoord4sv: { args: [FFIType.ptr], returns: FFIType.void },
    glTexCoordPointer: { args: [FFIType.i32, FFIType.u32, FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glTexEnvf: { args: [FFIType.u32, FFIType.u32, FFIType.f32], returns: FFIType.void },
    glTexEnvfv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glTexEnvi: { args: [FFIType.u32, FFIType.u32, FFIType.i32], returns: FFIType.void },
    glTexEnviv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glTexGend: { args: [FFIType.u32, FFIType.u32, FFIType.f64], returns: FFIType.void },
    glTexGendv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glTexGenf: { args: [FFIType.u32, FFIType.u32, FFIType.f32], returns: FFIType.void },
    glTexGenfv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glTexGeni: { args: [FFIType.u32, FFIType.u32, FFIType.i32], returns: FFIType.void },
    glTexGeniv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glTexImage1D: { args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glTexImage2D: { args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void }, // prettier-ignore
    glTexParameterf: { args: [FFIType.u32, FFIType.u32, FFIType.f32], returns: FFIType.void },
    glTexParameterfv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glTexParameteri: { args: [FFIType.u32, FFIType.u32, FFIType.i32], returns: FFIType.void },
    glTexParameteriv: { args: [FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glTexSubImage1D: { args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void },
    glTexSubImage2D: { args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.u32, FFIType.u32, FFIType.ptr], returns: FFIType.void }, // prettier-ignore
    glTranslated: { args: [FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glTranslatef: { args: [FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glVertex2d: { args: [FFIType.f64, FFIType.f64], returns: FFIType.void },
    glVertex2dv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertex2f: { args: [FFIType.f32, FFIType.f32], returns: FFIType.void },
    glVertex2fv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertex2i: { args: [FFIType.i32, FFIType.i32], returns: FFIType.void },
    glVertex2iv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertex2s: { args: [FFIType.i16, FFIType.i16], returns: FFIType.void },
    glVertex2sv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertex3d: { args: [FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glVertex3dv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertex3f: { args: [FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glVertex3fv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertex3i: { args: [FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glVertex3iv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertex3s: { args: [FFIType.i16, FFIType.i16, FFIType.i16], returns: FFIType.void },
    glVertex3sv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertex4d: { args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64], returns: FFIType.void },
    glVertex4dv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertex4f: { args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32], returns: FFIType.void },
    glVertex4fv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertex4i: { args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    glVertex4iv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertex4s: { args: [FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16], returns: FFIType.void },
    glVertex4sv: { args: [FFIType.ptr], returns: FFIType.void },
    glVertexPointer: { args: [FFIType.i32, FFIType.u32, FFIType.i32, FFIType.ptr], returns: FFIType.void },
    glViewport: { args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.void },
    wglChoosePixelFormat: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.i32 },
    wglCopyContext: { args: [FFIType.ptr, FFIType.ptr, FFIType.u32], returns: FFIType.i32 },
    wglCreateContext: { args: [FFIType.ptr], returns: FFIType.ptr },
    wglCreateLayerContext: { args: [FFIType.ptr, FFIType.i32], returns: FFIType.ptr },
    wglDeleteContext: { args: [FFIType.ptr], returns: FFIType.i32 },
    wglDescribeLayerPlane: { args: [FFIType.ptr, FFIType.i32, FFIType.i32, FFIType.u32, FFIType.ptr], returns: FFIType.i32 },
    wglDescribePixelFormat: { args: [FFIType.ptr, FFIType.i32, FFIType.u32, FFIType.ptr], returns: FFIType.i32 },
    wglGetCurrentContext: { args: [], returns: FFIType.ptr },
    wglGetCurrentDC: { args: [], returns: FFIType.ptr },
    wglGetDefaultProcAddress: { args: [FFIType.ptr], returns: FFIType.ptr },
    wglGetLayerPaletteEntries: { args: [FFIType.ptr, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.ptr], returns: FFIType.i32 },
    wglGetProcAddress: { args: [FFIType.ptr], returns: FFIType.ptr },
    wglMakeCurrent: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.i32 },
    wglRealizeLayerPalette: { args: [FFIType.ptr, FFIType.i32, FFIType.i32], returns: FFIType.i32 },
    wglSetLayerPaletteEntries: { args: [FFIType.ptr, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.ptr], returns: FFIType.i32 },
    wglSetPixelFormat: { args: [FFIType.ptr, FFIType.i32, FFIType.ptr], returns: FFIType.i32 },
    wglShareLists: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.i32 },
    wglSwapBuffers: { args: [FFIType.ptr], returns: FFIType.i32 },
    wglSwapLayerBuffers: { args: [FFIType.ptr, FFIType.u32], returns: FFIType.i32 },
    wglSwapMultipleBuffers: { args: [FFIType.u32, FFIType.ptr], returns: FFIType.u32 },
    wglUseFontBitmapsA: { args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.u32], returns: FFIType.i32 },
    wglUseFontBitmapsW: { args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.u32], returns: FFIType.i32 },
    wglUseFontOutlinesA: { args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.u32, FFIType.f32, FFIType.f32, FFIType.i32, FFIType.ptr], returns: FFIType.i32 },
    wglUseFontOutlinesW: { args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.u32, FFIType.f32, FFIType.f32, FFIType.i32, FFIType.ptr], returns: FFIType.i32 },
  } as const satisfies Record<string, FFIFunction>;

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glaccum
  public static glAccum(op: GLenum, value: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glalphafunc
  public static glAlphaFunc(func: GLenum, ref: GLclampf): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glaretexturesresident
  public static glAreTexturesResident(n: GLsizei, textures: GLuint_, residences: GLboolean_): GLboolean {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glarrayelement
  public static glArrayElement(i: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glbegin
  public static glBegin(mode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glbindtexture
  public static glBindTexture(target: GLenum, texture: GLuint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glbitmap
  public static glBitmap(width: GLsizei, height: GLsizei, xorig: GLfloat, yorig: GLfloat, xmove: GLfloat, ymove: GLfloat, bitmap: GLubyte_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glblendfunc
  public static glBlendFunc(sfactor: GLenum, dfactor: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcalllist
  public static glCallList(list: GLuint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcalllists
  public static glCallLists(n: GLsizei, type: GLenum, lists: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glclear
  public static glClear(mask: GLbitfield): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glclearaccum
  public static glClearAccum(red: GLfloat, green: GLfloat, blue: GLfloat, alpha: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glclearcolor
  public static glClearColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcleardepth
  public static glClearDepth(depth: GLclampd): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glclearindex
  public static glClearIndex(c: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glclearstencil
  public static glClearStencil(s: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glclipplane
  public static glClipPlane(plane: GLenum, equation: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3b
  public static glColor3b(red: GLbyte, green: GLbyte, blue: GLbyte): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3bv
  public static glColor3bv(v: GLbyte_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3d
  public static glColor3d(red: GLdouble, green: GLdouble, blue: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3dv
  public static glColor3dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3f
  public static glColor3f(red: GLfloat, green: GLfloat, blue: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3fv
  public static glColor3fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3i
  public static glColor3i(red: GLint, green: GLint, blue: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3iv
  public static glColor3iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3s
  public static glColor3s(red: GLshort, green: GLshort, blue: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3sv
  public static glColor3sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3ub
  public static glColor3ub(red: GLubyte, green: GLubyte, blue: GLubyte): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3ubv
  public static glColor3ubv(v: GLubyte_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3ui
  public static glColor3ui(red: GLuint, green: GLuint, blue: GLuint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3uiv
  public static glColor3uiv(v: GLuint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3us
  public static glColor3us(red: GLushort, green: GLushort, blue: GLushort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor3usv
  public static glColor3usv(v: GLushort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4b
  public static glColor4b(red: GLbyte, green: GLbyte, blue: GLbyte, alpha: GLbyte): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4bv
  public static glColor4bv(v: GLbyte_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4d
  public static glColor4d(red: GLdouble, green: GLdouble, blue: GLdouble, alpha: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4dv
  public static glColor4dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4f
  public static glColor4f(red: GLfloat, green: GLfloat, blue: GLfloat, alpha: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4fv
  public static glColor4fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4i
  public static glColor4i(red: GLint, green: GLint, blue: GLint, alpha: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4iv
  public static glColor4iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4s
  public static glColor4s(red: GLshort, green: GLshort, blue: GLshort, alpha: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4sv
  public static glColor4sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4ub
  public static glColor4ub(red: GLubyte, green: GLubyte, blue: GLubyte, alpha: GLubyte): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4ubv
  public static glColor4ubv(v: GLubyte_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4ui
  public static glColor4ui(red: GLuint, green: GLuint, blue: GLuint, alpha: GLuint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4uiv
  public static glColor4uiv(v: GLuint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4us
  public static glColor4us(red: GLushort, green: GLushort, blue: GLushort, alpha: GLushort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolor4usv
  public static glColor4usv(v: GLushort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolormask
  public static glColorMask(red: GLboolean, green: GLboolean, blue: GLboolean, alpha: GLboolean): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolormaterial
  public static glColorMaterial(face: GLenum, mode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcolorpointer
  public static glColorPointer(size: GLint, type: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcopypixels
  public static glCopyPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, type: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcopyteximage1d
  public static glCopyTexImage1D(target: GLenum, level: GLint, internalformat: GLenum, x: GLint, y: GLint, width: GLsizei, border: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcopyteximage2d
  public static glCopyTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, x: GLint, y: GLint, width: GLsizei, height: GLsizei, border: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcopytexsubimage1d
  public static glCopyTexSubImage1D(target: GLenum, level: GLint, xoffset: GLint, x: GLint, y: GLint, width: GLsizei): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcopytexsubimage2d
  public static glCopyTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glcullface
  public static glCullFace(mode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gldeletelists
  public static glDeleteLists(list: GLuint, range: GLsizei): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gldeletetextures
  public static glDeleteTextures(n: GLsizei, textures: GLuint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gldepthfunc
  public static glDepthFunc(func: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gldepthmask
  public static glDepthMask(flag: GLboolean): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gldepthrange
  public static glDepthRange(zNear: GLclampd, zFar: GLclampd): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gldisable
  public static glDisable(cap: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gldisableclientstate
  public static glDisableClientState(array: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gldrawarrays
  public static glDrawArrays(mode: GLenum, first: GLint, count: GLsizei): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gldrawbuffer
  public static glDrawBuffer(mode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gldrawelements
  public static glDrawElements(mode: GLenum, count: GLsizei, type: GLenum, indices: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gldrawpixels
  public static glDrawPixels(width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gledgeflag
  public static glEdgeFlag(flag: GLboolean): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gledgeflagpointer
  public static glEdgeFlagPointer(stride: GLsizei, pointer: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gledgeflagv
  public static glEdgeFlagv(flag: GLboolean_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glenable
  public static glEnable(cap: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glenableclientstate
  public static glEnableClientState(array: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glend
  public static glEnd(): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glendlist
  public static glEndList(): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalcoord1d
  public static glEvalCoord1d(u: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalcoord1dv
  public static glEvalCoord1dv(u: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalcoord1f
  public static glEvalCoord1f(u: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalcoord1fv
  public static glEvalCoord1fv(u: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalcoord2d
  public static glEvalCoord2d(u: GLdouble, v: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalcoord2dv
  public static glEvalCoord2dv(u: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalcoord2f
  public static glEvalCoord2f(u: GLfloat, v: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalcoord2fv
  public static glEvalCoord2fv(u: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalmesh1
  public static glEvalMesh1(mode: GLenum, i1: GLint, i2: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalmesh2
  public static glEvalMesh2(mode: GLenum, i1: GLint, i2: GLint, j1: GLint, j2: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalpoint1
  public static glEvalPoint1(i: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glevalpoint2
  public static glEvalPoint2(i: GLint, j: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glfeedbackbuffer
  public static glFeedbackBuffer(size: GLsizei, type: GLenum, buffer: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glfinish
  public static glFinish(): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glflush
  public static glFlush(): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glfogf
  public static glFogf(pname: GLenum, param: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glfogfv
  public static glFogfv(pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glfogi
  public static glFogi(pname: GLenum, param: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glfogiv
  public static glFogiv(pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glfrontface
  public static glFrontFace(mode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glfrustum
  public static glFrustum(left: GLdouble, right: GLdouble, bottom: GLdouble, top: GLdouble, zNear: GLdouble, zFar: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgenlists
  public static glGenLists(range: GLsizei): GLuint {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgentextures
  public static glGenTextures(n: GLsizei, textures: GLuint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetbooleanv
  public static glGetBooleanv(pname: GLenum, params: GLboolean_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetclipplane
  public static glGetClipPlane(plane: GLenum, equation: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetdoublev
  public static glGetDoublev(pname: GLenum, params: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgeterror
  public static glGetError(): GLenum {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetfloatv
  public static glGetFloatv(pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetintegerv
  public static glGetIntegerv(pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetlightfv
  public static glGetLightfv(light: GLenum, pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetlightiv
  public static glGetLightiv(light: GLenum, pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetmapdv
  public static glGetMapdv(target: GLenum, query: GLenum, v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetmapfv
  public static glGetMapfv(target: GLenum, query: GLenum, v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetmapiv
  public static glGetMapiv(target: GLenum, query: GLenum, v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetmaterialfv
  public static glGetMaterialfv(face: GLenum, pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetmaterialiv
  public static glGetMaterialiv(face: GLenum, pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetpixelmapfv
  public static glGetPixelMapfv(map: GLenum, values: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetpixelmapuiv
  public static glGetPixelMapuiv(map: GLenum, values: GLuint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetpixelmapusv
  public static glGetPixelMapusv(map: GLenum, values: GLushort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetpointerv
  public static glGetPointerv(pname: GLenum, params: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetpolygonstipple
  public static glGetPolygonStipple(mask: GLubyte_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetstring
  public static glGetString(name: GLenum): GLubyte_ {
    throw new Error('OpenGL32 has not been initialized…');
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgettexenvfv
  public static glGetTexEnvfv(target: GLenum, pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgettexenviv
  public static glGetTexEnviv(target: GLenum, pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgettexgendv
  public static glGetTexGendv(coord: GLenum, pname: GLenum, params: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgettexgenfv
  public static glGetTexGenfv(coord: GLenum, pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgettexgeniv
  public static glGetTexGeniv(coord: GLenum, pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgetteximage
  public static glGetTexImage(target: GLenum, level: GLint, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgettexlevelparameterfv
  public static glGetTexLevelParameterfv(target: GLenum, level: GLint, pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgettexlevelparameteriv
  public static glGetTexLevelParameteriv(target: GLenum, level: GLint, pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgettexparameterfv
  public static glGetTexParameterfv(target: GLenum, pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glgettexparameteriv
  public static glGetTexParameteriv(target: GLenum, pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glhint
  public static glHint(target: GLenum, mode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexmask
  public static glIndexMask(mask: GLuint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexpointer
  public static glIndexPointer(type: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexd
  public static glIndexd(c: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexdv
  public static glIndexdv(c: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexf
  public static glIndexf(c: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexfv
  public static glIndexfv(c: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexi
  public static glIndexi(c: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexiv
  public static glIndexiv(c: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexs
  public static glIndexs(c: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexsv
  public static glIndexsv(c: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexub
  public static glIndexub(c: GLubyte): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glindexubv
  public static glIndexubv(c: GLubyte_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glinitnames
  public static glInitNames(): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glinterleavedarrays
  public static glInterleavedArrays(format: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glisenabled
  public static glIsEnabled(cap: GLenum): GLboolean {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glislist
  public static glIsList(list: GLuint): GLboolean {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glistexture
  public static glIsTexture(texture: GLuint): GLboolean {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllightmodelf
  public static glLightModelf(pname: GLenum, param: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllightmodelfv
  public static glLightModelfv(pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllightmodeli
  public static glLightModeli(pname: GLenum, param: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllightmodeliv
  public static glLightModeliv(pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllightf
  public static glLightf(light: GLenum, pname: GLenum, param: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllightfv
  public static glLightfv(light: GLenum, pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllighti
  public static glLighti(light: GLenum, pname: GLenum, param: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllightiv
  public static glLightiv(light: GLenum, pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllinestipple
  public static glLineStipple(factor: GLint, pattern: GLushort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllinewidth
  public static glLineWidth(width: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllistbase
  public static glListBase(base: GLuint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glloadidentity
  public static glLoadIdentity(): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glloadmatrixd
  public static glLoadMatrixd(m: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glloadmatrixf
  public static glLoadMatrixf(m: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glloadname
  public static glLoadName(name: GLuint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gllogicop
  public static glLogicOp(opcode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmap1d
  public static glMap1d(target: GLenum, u1: GLdouble, u2: GLdouble, stride: GLint, order: GLint, points: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmap1f
  public static glMap1f(target: GLenum, u1: GLfloat, u2: GLfloat, stride: GLint, order: GLint, points: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // prettier-ignore
  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmap2d
  public static glMap2d(target: GLenum, u1: GLdouble, u2: GLdouble, ustride: GLint, uorder: GLint, v1: GLdouble, v2: GLdouble, vstride: GLint, vorder: GLint, points: GLdouble_): void { 
    throw new Error('OpenGL32 has not been initialized…');
  }

  // prettier-ignore
  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmap2f
  public static glMap2f(target: GLenum, u1: GLfloat, u2: GLfloat, ustride: GLint, uorder: GLint, v1: GLfloat, v2: GLfloat, vstride: GLint, vorder: GLint, points: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmapgrid1d
  public static glMapGrid1d(un: GLint, u1: GLdouble, u2: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmapgrid1f
  public static glMapGrid1f(un: GLint, u1: GLfloat, u2: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmapgrid2d
  public static glMapGrid2d(un: GLint, u1: GLdouble, u2: GLdouble, vn: GLint, v1: GLdouble, v2: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmapgrid2f
  public static glMapGrid2f(un: GLint, u1: GLfloat, u2: GLfloat, vn: GLint, v1: GLfloat, v2: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmaterialf
  public static glMaterialf(face: GLenum, pname: GLenum, param: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmaterialfv
  public static glMaterialfv(face: GLenum, pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmateriali
  public static glMateriali(face: GLenum, pname: GLenum, param: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmaterialiv
  public static glMaterialiv(face: GLenum, pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmatrixmode
  public static glMatrixMode(mode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmultmatrixd
  public static glMultMatrixd(m: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glmultmatrixf
  public static glMultMatrixf(m: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnewlist
  public static glNewList(list: GLuint, mode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnormal3b
  public static glNormal3b(nx: GLbyte, ny: GLbyte, nz: GLbyte): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnormal3bv
  public static glNormal3bv(v: GLbyte_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnormal3d
  public static glNormal3d(nx: GLdouble, ny: GLdouble, nz: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnormal3dv
  public static glNormal3dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnormal3f
  public static glNormal3f(nx: GLfloat, ny: GLfloat, nz: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnormal3fv
  public static glNormal3fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnormal3i
  public static glNormal3i(nx: GLint, ny: GLint, nz: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnormal3iv
  public static glNormal3iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnormal3s
  public static glNormal3s(nx: GLshort, ny: GLshort, nz: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnormal3sv
  public static glNormal3sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glnormalpointer
  public static glNormalPointer(type: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glortho
  public static glOrtho(left: GLdouble, right: GLdouble, bottom: GLdouble, top: GLdouble, zNear: GLdouble, zFar: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpassthrough
  public static glPassThrough(token: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpixelmapfv
  public static glPixelMapfv(map: GLenum, mapsize: GLsizei, values: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpixelmapuiv
  public static glPixelMapuiv(map: GLenum, mapsize: GLsizei, values: GLuint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpixelmapusv
  public static glPixelMapusv(map: GLenum, mapsize: GLsizei, values: GLushort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpixelstoref
  public static glPixelStoref(pname: GLenum, param: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpixelstorei
  public static glPixelStorei(pname: GLenum, param: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpixeltransferf
  public static glPixelTransferf(pname: GLenum, param: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpixeltransferi
  public static glPixelTransferi(pname: GLenum, param: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpixelzoom
  public static glPixelZoom(xfactor: GLfloat, yfactor: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpointsize
  public static glPointSize(size: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpolygonmode
  public static glPolygonMode(face: GLenum, mode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpolygonoffset
  public static glPolygonOffset(factor: GLfloat, units: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpolygonstipple
  public static glPolygonStipple(mask: GLubyte_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpopattrib
  public static glPopAttrib(): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpopclientattrib
  public static glPopClientAttrib(): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpopmatrix
  public static glPopMatrix(): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpopname
  public static glPopName(): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glprioritizetextures
  public static glPrioritizeTextures(n: GLsizei, textures: GLuint_, priorities: GLclampf_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpushattrib
  public static glPushAttrib(mask: GLbitfield): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpushclientattrib
  public static glPushClientAttrib(mask: GLbitfield): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpushmatrix
  public static glPushMatrix(): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glpushname
  public static glPushName(name: GLuint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos2d
  public static glRasterPos2d(x: GLdouble, y: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos2dv
  public static glRasterPos2dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos2f
  public static glRasterPos2f(x: GLfloat, y: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos2fv
  public static glRasterPos2fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos2i
  public static glRasterPos2i(x: GLint, y: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos2iv
  public static glRasterPos2iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos2s
  public static glRasterPos2s(x: GLshort, y: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos2sv
  public static glRasterPos2sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos3d
  public static glRasterPos3d(x: GLdouble, y: GLdouble, z: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos3dv
  public static glRasterPos3dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos3f
  public static glRasterPos3f(x: GLfloat, y: GLfloat, z: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos3fv
  public static glRasterPos3fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos3i
  public static glRasterPos3i(x: GLint, y: GLint, z: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos3iv
  public static glRasterPos3iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos3s
  public static glRasterPos3s(x: GLshort, y: GLshort, z: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos3sv
  public static glRasterPos3sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos4d
  public static glRasterPos4d(x: GLdouble, y: GLdouble, z: GLdouble, w: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos4dv
  public static glRasterPos4dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos4f
  public static glRasterPos4f(x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos4fv
  public static glRasterPos4fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos4i
  public static glRasterPos4i(x: GLint, y: GLint, z: GLint, w: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos4iv
  public static glRasterPos4iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos4s
  public static glRasterPos4s(x: GLshort, y: GLshort, z: GLshort, w: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrasterpos4sv
  public static glRasterPos4sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glreadbuffer
  public static glReadBuffer(mode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glreadpixels
  public static glReadPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrectd
  public static glRectd(x1: GLdouble, y1: GLdouble, x2: GLdouble, y2: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrectdv
  public static glRectdv(v1: GLdouble_, v2: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrectf
  public static glRectf(x1: GLfloat, y1: GLfloat, x2: GLfloat, y2: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrectfv
  public static glRectfv(v1: GLfloat_, v2: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrecti
  public static glRecti(x1: GLint, y1: GLint, x2: GLint, y2: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrectiv
  public static glRectiv(v1: GLint_, v2: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrects
  public static glRects(x1: GLshort, y1: GLshort, x2: GLshort, y2: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrectsv
  public static glRectsv(v1: GLshort_, v2: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrendermode
  public static glRenderMode(mode: GLenum): GLint {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrotated
  public static glRotated(angle: GLdouble, x: GLdouble, y: GLdouble, z: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glrotatef
  public static glRotatef(angle: GLfloat, x: GLfloat, y: GLfloat, z: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glscaled
  public static glScaled(x: GLdouble, y: GLdouble, z: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glscalef
  public static glScalef(x: GLfloat, y: GLfloat, z: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glscissor
  public static glScissor(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glselectbuffer
  public static glSelectBuffer(size: GLsizei, buffer: GLuint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glshademodel
  public static glShadeModel(mode: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glstencilfunc
  public static glStencilFunc(func: GLenum, ref: GLint, mask: GLuint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glstencilmask
  public static glStencilMask(mask: GLuint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glstencilop
  public static glStencilOp(fail: GLenum, zfail: GLenum, zpass: GLenum): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord1d
  public static glTexCoord1d(s: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord1dv
  public static glTexCoord1dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord1f
  public static glTexCoord1f(s: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord1fv
  public static glTexCoord1fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord1i
  public static glTexCoord1i(s: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord1iv
  public static glTexCoord1iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord1s
  public static glTexCoord1s(s: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord1sv
  public static glTexCoord1sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord2d
  public static glTexCoord2d(s: GLdouble, t: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord2dv
  public static glTexCoord2dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord2f
  public static glTexCoord2f(s: GLfloat, t: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord2fv
  public static glTexCoord2fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord2i
  public static glTexCoord2i(s: GLint, t: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord2iv
  public static glTexCoord2iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord2s
  public static glTexCoord2s(s: GLshort, t: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord2sv
  public static glTexCoord2sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord3d
  public static glTexCoord3d(s: GLdouble, t: GLdouble, r: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord3dv
  public static glTexCoord3dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord3f
  public static glTexCoord3f(s: GLfloat, t: GLfloat, r: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord3fv
  public static glTexCoord3fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord3i
  public static glTexCoord3i(s: GLint, t: GLint, r: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord3iv
  public static glTexCoord3iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord3s
  public static glTexCoord3s(s: GLshort, t: GLshort, r: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord3sv
  public static glTexCoord3sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord4d
  public static glTexCoord4d(s: GLdouble, t: GLdouble, r: GLdouble, q: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord4dv
  public static glTexCoord4dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord4f
  public static glTexCoord4f(s: GLfloat, t: GLfloat, r: GLfloat, q: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord4fv
  public static glTexCoord4fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord4i
  public static glTexCoord4i(s: GLint, t: GLint, r: GLint, q: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord4iv
  public static glTexCoord4iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord4s
  public static glTexCoord4s(s: GLshort, t: GLshort, r: GLshort, q: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoord4sv
  public static glTexCoord4sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexcoordpointer
  public static glTexCoordPointer(size: GLint, type: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexenvf
  public static glTexEnvf(target: GLenum, pname: GLenum, param: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexenvfv
  public static glTexEnvfv(target: GLenum, pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexenvi
  public static glTexEnvi(target: GLenum, pname: GLenum, param: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexenviv
  public static glTexEnviv(target: GLenum, pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexgend
  public static glTexGend(coord: GLenum, pname: GLenum, param: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexgendv
  public static glTexGendv(coord: GLenum, pname: GLenum, params: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexgenf
  public static glTexGenf(coord: GLenum, pname: GLenum, param: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexgenfv
  public static glTexGenfv(coord: GLenum, pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexgeni
  public static glTexGeni(coord: GLenum, pname: GLenum, param: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexgeniv
  public static glTexGeniv(coord: GLenum, pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // prettier-ignore
  // https://learn.microsoft.com/en-us/windows/win32/opengl/glteximage1d
  public static glTexImage1D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // prettier-ignore
  // https://learn.microsoft.com/en-us/windows/win32/opengl/glteximage2d
  public static glTexImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexparameterf
  public static glTexParameterf(target: GLenum, pname: GLenum, param: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexparameterfv
  public static glTexParameterfv(target: GLenum, pname: GLenum, params: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexparameteri
  public static glTexParameteri(target: GLenum, pname: GLenum, param: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexparameteriv
  public static glTexParameteriv(target: GLenum, pname: GLenum, params: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexsubimage1d
  public static glTexSubImage1D(target: GLenum, level: GLint, xoffset: GLint, width: GLsizei, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // prettier-ignore
  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltexsubimage2d
  public static glTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltranslated
  public static glTranslated(x: GLdouble, y: GLdouble, z: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/gltranslatef
  public static glTranslatef(x: GLfloat, y: GLfloat, z: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex2d
  public static glVertex2d(x: GLdouble, y: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex2dv
  public static glVertex2dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex2f
  public static glVertex2f(x: GLfloat, y: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex2fv
  public static glVertex2fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex2i
  public static glVertex2i(x: GLint, y: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex2iv
  public static glVertex2iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex2s
  public static glVertex2s(x: GLshort, y: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex2sv
  public static glVertex2sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex3d
  public static glVertex3d(x: GLdouble, y: GLdouble, z: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex3dv
  public static glVertex3dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex3f
  public static glVertex3f(x: GLfloat, y: GLfloat, z: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex3fv
  public static glVertex3fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex3i
  public static glVertex3i(x: GLint, y: GLint, z: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex3iv
  public static glVertex3iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex3s
  public static glVertex3s(x: GLshort, y: GLshort, z: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex3sv
  public static glVertex3sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex4d
  public static glVertex4d(x: GLdouble, y: GLdouble, z: GLdouble, w: GLdouble): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex4dv
  public static glVertex4dv(v: GLdouble_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex4f
  public static glVertex4f(x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex4fv
  public static glVertex4fv(v: GLfloat_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex4i
  public static glVertex4i(x: GLint, y: GLint, z: GLint, w: GLint): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex4iv
  public static glVertex4iv(v: GLint_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex4s
  public static glVertex4s(x: GLshort, y: GLshort, z: GLshort, w: GLshort): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertex4sv
  public static glVertex4sv(v: GLshort_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glvertexpointer
  public static glVertexPointer(size: GLint, type: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/opengl/glviewport
  public static glViewport(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglchoosepixelformat
  public static wglChoosePixelFormat(hdc: HDC, ppfd: LPPIXELFORMATDESCRIPTOR): INT {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglcopycontext
  public static wglCopyContext(hglrcSrc: HGLRC, hglrcDst: HGLRC, mask: UINT): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglcreatecontext
  public static wglCreateContext(hdc: HDC): HGLRC {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglcreatelayercontext
  public static wglCreateLayerContext(hdc: HDC, iLayerPlane: INT): HGLRC {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wgldeletecontext
  public static wglDeleteContext(hglrc: HGLRC): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wgldescribelayerplane
  public static wglDescribeLayerPlane(hdc: HDC, iPixelFormat: INT, iLayerPlane: INT, nBytes: UINT, plpd: LPLAYERPLANEDESCRIPTOR): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wgldescribepixelformat
  public static wglDescribePixelFormat(hdc: HDC, iPixelFormat: INT, nBytes: UINT, ppfd: LPPIXELFORMATDESCRIPTOR): INT {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglgetcurrentcontext
  public static wglGetCurrentContext(): HGLRC {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglgetcurrentdc
  public static wglGetCurrentDC(): HDC {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglgetlayerpaletteentries
  public static wglGetLayerPaletteEntries(hdc: HDC, iLayerPlane: INT, iStart: INT, cEntries: INT, pcr: GLvoid_): INT {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglgetprocaddress
  public static wglGetProcAddress(lpszProc: LPCSTR): PROC {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglmakecurrent
  public static wglMakeCurrent(hdc: HDC, hglrc: HGLRC): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglrealizelayerpalette
  public static wglRealizeLayerPalette(hdc: HDC, iLayerPlane: INT, bRealize: BOOL): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglsetlayerpaletteentries
  public static wglSetLayerPaletteEntries(hdc: HDC, iLayerPlane: INT, iStart: INT, cEntries: INT, pcr: GLvoid_): INT {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglsetpixelformat
  public static wglSetPixelFormat(hdc: HDC, iPixelFormat: INT, ppfd: LPPIXELFORMATDESCRIPTOR): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglsharelists
  public static wglShareLists(hglrc1: HGLRC, hglrc2: HGLRC): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglswapbuffers
  public static wglSwapBuffers(hdc: HDC): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglswaplayerbuffers
  public static wglSwapLayerBuffers(hdc: HDC, fuPlanes: UINT): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglusefontbitmapsa
  public static wglUseFontBitmapsA(hdc: HDC, first: DWORD, count: DWORD, listBase: DWORD): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglusefontbitmapsw
  public static wglUseFontBitmapsW(hdc: HDC, first: DWORD, count: DWORD, listBase: DWORD): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // prettier-ignore
  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglusefontoutlinesa
  public static wglUseFontOutlinesA(hdc: HDC, first: DWORD, count: DWORD, listBase: DWORD, deviation: GLfloat, extrusion: GLfloat, format: INT, lpgmf: LPGLYPHMETRICSFLOAT): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // prettier-ignore
  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglusefontoutlinesw
  public static wglUseFontOutlinesW(hdc: HDC, first: DWORD, count: DWORD, listBase: DWORD, deviation: GLfloat, extrusion: GLfloat, format: INT, lpgmf: LPGLYPHMETRICSFLOAT): BOOL {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglgetdefaultprocaddress
  public static wglGetDefaultProcAddress(lpszProc: LPCSTR): PROC {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-wglswapmultiplebuffers
  public static wglSwapMultipleBuffers(n: UINT, lpBuffers: LPWGLSWAP): DWORD {
    throw new Error('OpenGL32 has not been initialized…');
  }

  // Prepare for extension implementation…

  public wglChoosePixelFormatARB(): any {
    throw new Error('OpenGL32 extensions have not been initialized…');
  }

  public wglCreateContextAttribsARB(): any {
    throw new Error('OpenGL32 extensions have not been initialized…');
  }

  public wglGetExtensionsStringARB(): any {
    throw new Error('OpenGL32 extensions have not been initialized…');
  }

  public wglGetExtensionsStringEXT(): any {
    throw new Error('OpenGL32 extensions have not been initialized…');
  }

  public wglGetSwapIntervalEXT(): any {
    throw new Error('OpenGL32 extensions have not been initialized…');
  }

  public wglSwapIntervalEXT(): any {
    throw new Error('OpenGL32 extensions have not been initialized…');
  }
}

export default OpenGL32;
