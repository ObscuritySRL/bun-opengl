// TODO: Fix the typing issue for OpenGL32.glGetString()…

import { type FFIFunction, FFIType, dlopen } from 'bun:ffi';

import type { GLbitfield, GLboolean, GLboolean_, GLclampd, GLclampf, GLclampf_, GLdouble, GLdouble_, GLenum, GLfloat, GLfloat_, GLint, GLint_, GLshort_, GLsizei, GLubyte_, GLuint, GLuint_, GLushort_, GLvoid_ } from '../types/OpenGL';

const { f32, f64, i16, i32, ptr, u16, u32, u8, void: voidType } = FFIType;

function load<FunctionDescriptor extends FFIFunction, FunctionName extends string>(functionName: FunctionName, functionDescriptor: FunctionDescriptor) {
  return dlopen<Record<FunctionName, FunctionDescriptor>>('opengl32.dll', { [functionName]: functionDescriptor } as Record<FunctionName, FunctionDescriptor>).symbols[functionName];
}

class OpenGL32 {
  public glAccum(op: GLenum, value: GLfloat): void {
    return (this._glAccum ??= load('glAccum', { args: [u32, f32], returns: voidType }))(op, value);
  }

  public glAlphaFunc(func: GLenum, ref: GLclampf): void {
    return (this._glAlphaFunc ??= load('glAlphaFunc', { args: [u32, f32], returns: voidType }))(func, ref);
  }

  public glAreTexturesResident(n: GLsizei, textures: GLuint_, residences: GLboolean_): GLboolean {
    return (this._glAreTexturesResident ??= load('glAreTexturesResident', { args: [i32, ptr, ptr], returns: u8 }))(n, textures, residences);
  }

  public glArrayElement(index: GLint): void {
    return (this._glArrayElement ??= load('glArrayElement', { args: [i32], returns: voidType }))(index);
  }

  public glBegin(mode: GLenum): void {
    return (this._glBegin ??= load('glBegin', { args: [u32], returns: voidType }))(mode);
  }

  public glBindTexture(target: GLenum, texture: GLuint): void {
    return (this._glBindTexture ??= load('glBindTexture', { args: [u32, u32], returns: voidType }))(target, texture);
  }

  public glBitmap(width: GLsizei, height: GLsizei, xorig: GLfloat, yorig: GLfloat, xmove: GLfloat, ymove: GLfloat, bitmap: GLubyte_): void {
    return (this._glBitmap ??= load('glBitmap', { args: [i32, i32, f32, f32, f32, f32, ptr], returns: voidType }))(width, height, xorig, yorig, xmove, ymove, bitmap);
  }

  public glBlendFunc(sfactor: GLenum, dfactor: GLenum): void {
    return (this._glBlendFunc ??= load('glBlendFunc', { args: [u32, u32], returns: voidType }))(sfactor, dfactor);
  }

  public glCallList(list: GLuint): void {
    return (this._glCallList ??= load('glCallList', { args: [u32], returns: voidType }))(list);
  }

  public glCallLists(n: GLsizei, type: GLenum, lists: GLvoid_): void {
    return (this._glCallLists ??= load('glCallLists', { args: [i32, u32, ptr], returns: voidType }))(n, type, lists);
  }

  public glClear(mask: GLbitfield): void {
    return (this._glClear ??= load('glClear', { args: [u32], returns: voidType }))(mask);
  }

  public glClearAccum(red: GLfloat, green: GLfloat, blue: GLfloat, alpha: GLfloat): void {
    return (this._glClearAccum ??= load('glClearAccum', { args: [f32, f32, f32, f32], returns: voidType }))(red, green, blue, alpha);
  }

  public glClearColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void {
    return (this._glClearColor ??= load('glClearColor', { args: [f32, f32, f32, f32], returns: voidType }))(red, green, blue, alpha);
  }

  public glClearDepth(depth: GLclampd): void {
    return (this._glClearDepth ??= load('glClearDepth', { args: [f64], returns: voidType }))(depth);
  }

  public glClearIndex(c: GLfloat): void {
    return (this._glClearIndex ??= load('glClearIndex', { args: [f32], returns: voidType }))(c);
  }

  public glClearStencil(s: GLint): void {
    return (this._glClearStencil ??= load('glClearStencil', { args: [i32], returns: voidType }))(s);
  }

  public glClipPlane(plane: GLenum, equation: GLdouble_): void {
    return (this._glClipPlane ??= load('glClipPlane', { args: [u32, ptr], returns: voidType }))(plane, equation);
  }

  public glColorMask(red: GLboolean, green: GLboolean, blue: GLboolean, alpha: GLboolean): void {
    return (this._glColorMask ??= load('glColorMask', { args: [u8, u8, u8, u8], returns: voidType }))(red, green, blue, alpha);
  }

  public glColorMaterial(face: GLenum, mode: GLenum): void {
    return (this._glColorMaterial ??= load('glColorMaterial', { args: [u32, u32], returns: voidType }))(face, mode);
  }

  public glColorPointer(size: GLint, type: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    return (this._glColorPointer ??= load('glColorPointer', { args: [i32, u32, i32, ptr], returns: voidType }))(size, type, stride, pointer);
  }

  public glCopyPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, type: GLenum): void {
    return (this._glCopyPixels ??= load('glCopyPixels', { args: [i32, i32, i32, i32, u32], returns: voidType }))(x, y, width, height, type);
  }

  public glCopyTexImage1D(target: GLenum, level: GLint, internalformat: GLenum, x: GLint, y: GLint, width: GLsizei, border: GLint): void {
    return (this._glCopyTexImage1D ??= load('glCopyTexImage1D', { args: [u32, i32, u32, i32, i32, i32, i32], returns: voidType }))(target, level, internalformat, x, y, width, border);
  }

  public glCopyTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, x: GLint, y: GLint, width: GLsizei, height: GLsizei, border: GLint): void {
    return (this._glCopyTexImage2D ??= load('glCopyTexImage2D', { args: [u32, i32, u32, i32, i32, i32, i32, i32], returns: voidType }))(target, level, internalformat, x, y, width, height, border);
  }

  public glCopyTexSubImage1D(target: GLenum, level: GLint, xoffset: GLint, x: GLint, y: GLint, width: GLsizei): void {
    return (this._glCopyTexSubImage1D ??= load('glCopyTexSubImage1D', { args: [u32, i32, i32, i32, i32, i32], returns: voidType }))(target, level, xoffset, x, y, width);
  }

  public glCopyTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
    return (this._glCopyTexSubImage2D ??= load('glCopyTexSubImage2D', { args: [u32, i32, i32, i32, i32, i32, i32, i32], returns: voidType }))(target, level, xoffset, yoffset, x, y, width, height);
  }

  public glCullFace(mode: GLenum): void {
    return (this._glCullFace ??= load('glCullFace', { args: [u32], returns: voidType }))(mode);
  }

  public glDeleteLists(list: GLuint, range: GLsizei): void {
    return (this._glDeleteLists ??= load('glDeleteLists', { args: [u32, i32], returns: voidType }))(list, range);
  }

  public glDeleteTextures(n: GLsizei, textures: GLuint_): void {
    return (this._glDeleteTextures ??= load('glDeleteTextures', { args: [i32, ptr], returns: voidType }))(n, textures);
  }

  public glDepthFunc(func: GLenum): void {
    return (this._glDepthFunc ??= load('glDepthFunc', { args: [u32], returns: voidType }))(func);
  }

  public glDepthMask(flag: GLboolean): void {
    return (this._glDepthMask ??= load('glDepthMask', { args: [u8], returns: voidType }))(flag);
  }

  public glDepthRange(zNear: GLclampd, zFar: GLclampd): void {
    return (this._glDepthRange ??= load('glDepthRange', { args: [f64, f64], returns: voidType }))(zNear, zFar);
  }

  public glDisable(cap: GLenum): void {
    return (this._glDisable ??= load('glDisable', { args: [u32], returns: voidType }))(cap);
  }

  public glDisableClientState(array: GLenum): void {
    return (this._glDisableClientState ??= load('glDisableClientState', { args: [u32], returns: voidType }))(array);
  }

  public glDrawArrays(mode: GLenum, first: GLint, count: GLsizei): void {
    return (this._glDrawArrays ??= load('glDrawArrays', { args: [u32, i32, i32], returns: voidType }))(mode, first, count);
  }

  public glDrawBuffer(mode: GLenum): void {
    return (this._glDrawBuffer ??= load('glDrawBuffer', { args: [u32], returns: voidType }))(mode);
  }

  public glDrawElements(mode: GLenum, count: GLsizei, type: GLenum, indices: GLvoid_): void {
    return (this._glDrawElements ??= load('glDrawElements', { args: [u32, i32, u32, ptr], returns: voidType }))(mode, count, type, indices);
  }

  public glDrawPixels(width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    return (this._glDrawPixels ??= load('glDrawPixels', { args: [i32, i32, u32, u32, ptr], returns: voidType }))(width, height, format, type, pixels);
  }

  public glEdgeFlag(flag: GLboolean): void {
    return (this._glEdgeFlag ??= load('glEdgeFlag', { args: [u8], returns: voidType }))(flag);
  }

  public glEdgeFlagPointer(stride: GLsizei, pointer: GLvoid_): void {
    return (this._glEdgeFlagPointer ??= load('glEdgeFlagPointer', { args: [i32, ptr], returns: voidType }))(stride, pointer);
  }

  public glEdgeFlagv(flag: GLboolean_): void {
    return (this._glEdgeFlagv ??= load('glEdgeFlagv', { args: [ptr], returns: voidType }))(flag);
  }

  public glEnable(cap: GLenum): void {
    return (this._glEnable ??= load('glEnable', { args: [u32], returns: voidType }))(cap);
  }

  public glEnableClientState(array: GLenum): void {
    return (this._glEnableClientState ??= load('glEnableClientState', { args: [u32], returns: voidType }))(array);
  }

  public glEnd(): void {
    return (this._glEnd ??= load('glEnd', { args: [], returns: voidType }))();
  }

  public glEndList(): void {
    return (this._glEndList ??= load('glEndList', { args: [], returns: voidType }))();
  }

  public glFeedbackBuffer(size: GLsizei, type: GLenum, buffer: GLfloat_): void {
    return (this._glFeedbackBuffer ??= load('glFeedbackBuffer', { args: [i32, u32, ptr], returns: voidType }))(size, type, buffer);
  }

  public glFinish(): void {
    return (this._glFinish ??= load('glFinish', { args: [], returns: voidType }))();
  }

  public glFlush(): void {
    return (this._glFlush ??= load('glFlush', { args: [], returns: voidType }))();
  }

  public glFogf(pname: GLenum, param: GLfloat): void {
    return (this._glFogf ??= load('glFogf', { args: [u32, f32], returns: voidType }))(pname, param);
  }

  public glFogfv(pname: GLenum, params: GLfloat_): void {
    return (this._glFogfv ??= load('glFogfv', { args: [u32, ptr], returns: voidType }))(pname, params);
  }

  public glFogi(pname: GLenum, param: GLint): void {
    return (this._glFogi ??= load('glFogi', { args: [u32, i32], returns: voidType }))(pname, param);
  }

  public glFogiv(pname: GLenum, params: GLint_): void {
    return (this._glFogiv ??= load('glFogiv', { args: [u32, ptr], returns: voidType }))(pname, params);
  }

  public glFrontFace(mode: GLenum): void {
    return (this._glFrontFace ??= load('glFrontFace', { args: [u32], returns: voidType }))(mode);
  }

  public glFrustum(left: GLdouble, right: GLdouble, bottom: GLdouble, top: GLdouble, zNear: GLdouble, zFar: GLdouble): void {
    return (this._glFrustum ??= load('glFrustum', { args: [f64, f64, f64, f64, f64, f64], returns: voidType }))(left, right, bottom, top, zNear, zFar);
  }

  public glGenLists(range: GLsizei): GLuint {
    return (this._glGenLists ??= load('glGenLists', { args: [i32], returns: u32 }))(range);
  }

  public glGenTextures(n: GLsizei, textures: GLuint_): void {
    return (this._glGenTextures ??= load('glGenTextures', { args: [i32, ptr], returns: voidType }))(n, textures);
  }

  public glGetBooleanv(pname: GLenum, params: GLboolean_): void {
    return (this._glGetBooleanv ??= load('glGetBooleanv', { args: [u32, ptr], returns: voidType }))(pname, params);
  }

  public glGetClipPlane(plane: GLenum, equation: GLdouble_): void {
    return (this._glGetClipPlane ??= load('glGetClipPlane', { args: [u32, ptr], returns: voidType }))(plane, equation);
  }

  public glGetDoublev(pname: GLenum, params: GLdouble_): void {
    return (this._glGetDoublev ??= load('glGetDoublev', { args: [u32, ptr], returns: voidType }))(pname, params);
  }

  public glGetError(): GLenum {
    return (this._glGetError ??= load('glGetError', { args: [], returns: u32 }))();
  }

  public glGetFloatv(pname: GLenum, params: GLfloat_): void {
    return (this._glGetFloatv ??= load('glGetFloatv', { args: [u32, ptr], returns: voidType }))(pname, params);
  }

  public glGetIntegerv(pname: GLenum, params: GLint_): void {
    return (this._glGetIntegerv ??= load('glGetIntegerv', { args: [u32, ptr], returns: voidType }))(pname, params);
  }

  public glGetLightfv(light: GLenum, pname: GLenum, params: GLfloat_): void {
    return (this._glGetLightfv ??= load('glGetLightfv', { args: [u32, u32, ptr], returns: voidType }))(light, pname, params);
  }

  public glGetLightiv(light: GLenum, pname: GLenum, params: GLint_): void {
    return (this._glGetLightiv ??= load('glGetLightiv', { args: [u32, u32, ptr], returns: voidType }))(light, pname, params);
  }

  public glGetMapdv(target: GLenum, query: GLenum, v: GLdouble_): void {
    return (this._glGetMapdv ??= load('glGetMapdv', { args: [u32, u32, ptr], returns: voidType }))(target, query, v);
  }

  public glGetMapfv(target: GLenum, query: GLenum, v: GLfloat_): void {
    return (this._glGetMapfv ??= load('glGetMapfv', { args: [u32, u32, ptr], returns: voidType }))(target, query, v);
  }

  public glGetMapiv(target: GLenum, query: GLenum, v: GLint_): void {
    return (this._glGetMapiv ??= load('glGetMapiv', { args: [u32, u32, ptr], returns: voidType }))(target, query, v);
  }

  public glGetMaterialfv(face: GLenum, pname: GLenum, params: GLfloat_): void {
    return (this._glGetMaterialfv ??= load('glGetMaterialfv', { args: [u32, u32, ptr], returns: voidType }))(face, pname, params);
  }

  public glGetMaterialiv(face: GLenum, pname: GLenum, params: GLint_): void {
    return (this._glGetMaterialiv ??= load('glGetMaterialiv', { args: [u32, u32, ptr], returns: voidType }))(face, pname, params);
  }

  public glGetPixelMapfv(map: GLenum, values: GLfloat_): void {
    return (this._glGetPixelMapfv ??= load('glGetPixelMapfv', { args: [u32, ptr], returns: voidType }))(map, values);
  }

  public glGetPixelMapuiv(map: GLenum, values: GLuint_): void {
    return (this._glGetPixelMapuiv ??= load('glGetPixelMapuiv', { args: [u32, ptr], returns: voidType }))(map, values);
  }

  public glGetPixelMapusv(map: GLenum, values: GLushort_): void {
    return (this._glGetPixelMapusv ??= load('glGetPixelMapusv', { args: [u32, ptr], returns: voidType }))(map, values);
  }

  public glGetPointerv(pname: GLenum, params: GLvoid_): void {
    return (this._glGetPointerv ??= load('glGetPointerv', { args: [u32, ptr], returns: voidType }))(pname, params);
  }

  public glGetPolygonStipple(mask: GLubyte_): void {
    return (this._glGetPolygonStipple ??= load('glGetPolygonStipple', { args: [ptr], returns: voidType }))(mask);
  }

  public glGetString(name: GLenum): GLubyte_ {
    // @ts-ignore
    return (this._glGetString ??= load('glGetString', { args: [u32], returns: ptr }))(name);
  }

  public glGetTexEnvfv(target: GLenum, pname: GLenum, params: GLfloat_): void {
    return (this._glGetTexEnvfv ??= load('glGetTexEnvfv', { args: [u32, u32, ptr], returns: voidType }))(target, pname, params);
  }

  public glGetTexEnviv(target: GLenum, pname: GLenum, params: GLint_): void {
    return (this._glGetTexEnviv ??= load('glGetTexEnviv', { args: [u32, u32, ptr], returns: voidType }))(target, pname, params);
  }

  public glGetTexGendv(coord: GLenum, pname: GLenum, params: GLdouble_): void {
    return (this._glGetTexGendv ??= load('glGetTexGendv', { args: [u32, u32, ptr], returns: voidType }))(coord, pname, params);
  }

  public glGetTexGenfv(coord: GLenum, pname: GLenum, params: GLfloat_): void {
    return (this._glGetTexGenfv ??= load('glGetTexGenfv', { args: [u32, u32, ptr], returns: voidType }))(coord, pname, params);
  }

  public glGetTexGeniv(coord: GLenum, pname: GLenum, params: GLint_): void {
    return (this._glGetTexGeniv ??= load('glGetTexGeniv', { args: [u32, u32, ptr], returns: voidType }))(coord, pname, params);
  }

  public glGetTexImage(target: GLenum, level: GLint, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    return (this._glGetTexImage ??= load('glGetTexImage', { args: [u32, i32, u32, u32, ptr], returns: voidType }))(target, level, format, type, pixels);
  }

  public glGetTexLevelParameterfv(target: GLenum, level: GLint, pname: GLenum, params: GLfloat_): void {
    return (this._glGetTexLevelParameterfv ??= load('glGetTexLevelParameterfv', { args: [u32, i32, u32, ptr], returns: voidType }))(target, level, pname, params);
  }

  public glGetTexLevelParameteriv(target: GLenum, level: GLint, pname: GLenum, params: GLint_): void {
    return (this._glGetTexLevelParameteriv ??= load('glGetTexLevelParameteriv', { args: [u32, i32, u32, ptr], returns: voidType }))(target, level, pname, params);
  }

  public glGetTexParameterfv(target: GLenum, pname: GLenum, params: GLfloat_): void {
    return (this._glGetTexParameterfv ??= load('glGetTexParameterfv', { args: [u32, u32, ptr], returns: voidType }))(target, pname, params);
  }

  public glGetTexParameteriv(target: GLenum, pname: GLenum, params: GLint_): void {
    return (this._glGetTexParameteriv ??= load('glGetTexParameteriv', { args: [u32, u32, ptr], returns: voidType }))(target, pname, params);
  }

  public glHint(target: GLenum, mode: GLenum): void {
    return (this._glHint ??= load('glHint', { args: [u32, u32], returns: voidType }))(target, mode);
  }

  public glIndexMask(mask: GLuint): void {
    return (this._glIndexMask ??= load('glIndexMask', { args: [u32], returns: voidType }))(mask);
  }

  public glIndexPointer(type: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    return (this._glIndexPointer ??= load('glIndexPointer', { args: [u32, i32, ptr], returns: voidType }))(type, stride, pointer);
  }

  public glIndexd(c: GLdouble): void {
    return (this._glIndexd ??= load('glIndexd', { args: [f64], returns: voidType }))(c);
  }

  public glIndexf(c: GLfloat): void {
    return (this._glIndexf ??= load('glIndexf', { args: [f32], returns: voidType }))(c);
  }

  public glIndexi(c: GLint): void {
    return (this._glIndexi ??= load('glIndexi', { args: [i32], returns: voidType }))(c);
  }

  public glIndexs(c: number): void {
    return (this._glIndexs ??= load('glIndexs', { args: [i16], returns: voidType }))(c);
  }

  public glInitNames(): void {
    return (this._glInitNames ??= load('glInitNames', { args: [], returns: voidType }))();
  }

  public glInterleavedArrays(format: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    return (this._glInterleavedArrays ??= load('glInterleavedArrays', { args: [u32, i32, ptr], returns: voidType }))(format, stride, pointer);
  }

  public glIsEnabled(cap: GLenum): GLboolean {
    return (this._glIsEnabled ??= load('glIsEnabled', { args: [u32], returns: u8 }))(cap);
  }

  public glIsList(list: GLuint): GLboolean {
    return (this._glIsList ??= load('glIsList', { args: [u32], returns: u8 }))(list);
  }

  public glIsTexture(texture: GLuint): GLboolean {
    return (this._glIsTexture ??= load('glIsTexture', { args: [u32], returns: u8 }))(texture);
  }

  public glLightModelf(pname: GLenum, param: GLfloat): void {
    return (this._glLightModelf ??= load('glLightModelf', { args: [u32, f32], returns: voidType }))(pname, param);
  }

  public glLightModelfv(pname: GLenum, params: GLfloat_): void {
    return (this._glLightModelfv ??= load('glLightModelfv', { args: [u32, ptr], returns: voidType }))(pname, params);
  }

  public glLightModeli(pname: GLenum, param: GLint): void {
    return (this._glLightModeli ??= load('glLightModeli', { args: [u32, i32], returns: voidType }))(pname, param);
  }

  public glLightModeliv(pname: GLenum, params: GLint_): void {
    return (this._glLightModeliv ??= load('glLightModeliv', { args: [u32, ptr], returns: voidType }))(pname, params);
  }

  public glLightf(light: GLenum, pname: GLenum, param: GLfloat): void {
    return (this._glLightf ??= load('glLightf', { args: [u32, u32, f32], returns: voidType }))(light, pname, param);
  }

  public glLightfv(light: GLenum, pname: GLenum, params: GLfloat_): void {
    return (this._glLightfv ??= load('glLightfv', { args: [u32, u32, ptr], returns: voidType }))(light, pname, params);
  }

  public glLighti(light: GLenum, pname: GLenum, param: GLint): void {
    return (this._glLighti ??= load('glLighti', { args: [u32, u32, i32], returns: voidType }))(light, pname, param);
  }

  public glLightiv(light: GLenum, pname: GLenum, params: GLint_): void {
    return (this._glLightiv ??= load('glLightiv', { args: [u32, u32, ptr], returns: voidType }))(light, pname, params);
  }

  public glLineStipple(factor: GLint, pattern: number): void {
    return (this._glLineStipple ??= load('glLineStipple', { args: [i32, u16], returns: voidType }))(factor, pattern);
  }

  public glLineWidth(width: GLfloat): void {
    return (this._glLineWidth ??= load('glLineWidth', { args: [f32], returns: voidType }))(width);
  }

  public glListBase(base: GLuint): void {
    return (this._glListBase ??= load('glListBase', { args: [u32], returns: voidType }))(base);
  }

  public glLoadIdentity(): void {
    return (this._glLoadIdentity ??= load('glLoadIdentity', { args: [], returns: voidType }))();
  }

  public glLoadMatrixd(m: GLdouble_): void {
    return (this._glLoadMatrixd ??= load('glLoadMatrixd', { args: [ptr], returns: voidType }))(m);
  }

  public glLoadMatrixf(m: GLfloat_): void {
    return (this._glLoadMatrixf ??= load('glLoadMatrixf', { args: [ptr], returns: voidType }))(m);
  }

  public glLoadName(name: GLuint): void {
    return (this._glLoadName ??= load('glLoadName', { args: [u32], returns: voidType }))(name);
  }

  public glLogicOp(opcode: GLenum): void {
    return (this._glLogicOp ??= load('glLogicOp', { args: [u32], returns: voidType }))(opcode);
  }

  public glMap1d(target: GLenum, u1: GLdouble, u2: GLdouble, stride: GLint, order: GLint, points: GLdouble_): void {
    return (this._glMap1d ??= load('glMap1d', { args: [u32, f64, f64, i32, i32, ptr], returns: voidType }))(target, u1, u2, stride, order, points);
  }

  public glMap1f(target: GLenum, u1: GLfloat, u2: GLfloat, stride: GLint, order: GLint, points: GLfloat_): void {
    return (this._glMap1f ??= load('glMap1f', { args: [u32, f32, f32, i32, i32, ptr], returns: voidType }))(target, u1, u2, stride, order, points);
  }

  public glMap2d(target: GLenum, u1: GLdouble, u2: GLdouble, ustride: GLint, uorder: GLint, v1: GLdouble, v2: GLdouble, vstride: GLint, vorder: GLint, points: GLdouble_): void {
    return (this._glMap2d ??= load('glMap2d', { args: [u32, f64, f64, i32, i32, f64, f64, i32, i32, ptr], returns: voidType }))(target, u1, u2, ustride, uorder, v1, v2, vstride, vorder, points);
  }

  public glMap2f(target: GLenum, u1: GLfloat, u2: GLfloat, ustride: GLint, uorder: GLint, v1: GLfloat, v2: GLfloat, vstride: GLint, vorder: GLint, points: GLfloat_): void {
    return (this._glMap2f ??= load('glMap2f', { args: [u32, f32, f32, i32, i32, f32, f32, i32, i32, ptr], returns: voidType }))(target, u1, u2, ustride, uorder, v1, v2, vstride, vorder, points);
  }

  public glMapGrid1d(un: GLint, u1: GLdouble, u2: GLdouble): void {
    return (this._glMapGrid1d ??= load('glMapGrid1d', { args: [i32, f64, f64], returns: voidType }))(un, u1, u2);
  }

  public glMapGrid1f(un: GLint, u1: GLfloat, u2: GLfloat): void {
    return (this._glMapGrid1f ??= load('glMapGrid1f', { args: [i32, f32, f32], returns: voidType }))(un, u1, u2);
  }

  public glMapGrid2d(un: GLint, u1: GLdouble, u2: GLdouble, vn: GLint, v1: GLdouble, v2: GLdouble): void {
    return (this._glMapGrid2d ??= load('glMapGrid2d', { args: [i32, f64, f64, i32, f64, f64], returns: voidType }))(un, u1, u2, vn, v1, v2);
  }

  public glMapGrid2f(un: GLint, u1: GLfloat, u2: GLfloat, vn: GLint, v1: GLfloat, v2: GLfloat): void {
    return (this._glMapGrid2f ??= load('glMapGrid2f', { args: [i32, f32, f32, i32, f32, f32], returns: voidType }))(un, u1, u2, vn, v1, v2);
  }

  public glMaterialf(face: GLenum, pname: GLenum, param: GLfloat): void {
    return (this._glMaterialf ??= load('glMaterialf', { args: [u32, u32, f32], returns: voidType }))(face, pname, param);
  }

  public glMaterialfv(face: GLenum, pname: GLenum, params: GLfloat_): void {
    return (this._glMaterialfv ??= load('glMaterialfv', { args: [u32, u32, ptr], returns: voidType }))(face, pname, params);
  }

  public glMateriali(face: GLenum, pname: GLenum, param: GLint): void {
    return (this._glMateriali ??= load('glMateriali', { args: [u32, u32, i32], returns: voidType }))(face, pname, param);
  }

  public glMaterialiv(face: GLenum, pname: GLenum, params: GLint_): void {
    return (this._glMaterialiv ??= load('glMaterialiv', { args: [u32, u32, ptr], returns: voidType }))(face, pname, params);
  }

  public glMatrixMode(mode: GLenum): void {
    return (this._glMatrixMode ??= load('glMatrixMode', { args: [u32], returns: voidType }))(mode);
  }

  public glMultMatrixd(m: GLdouble_): void {
    return (this._glMultMatrixd ??= load('glMultMatrixd', { args: [ptr], returns: voidType }))(m);
  }

  public glMultMatrixf(m: GLfloat_): void {
    return (this._glMultMatrixf ??= load('glMultMatrixf', { args: [ptr], returns: voidType }))(m);
  }

  public glNewList(list: GLuint, mode: GLenum): void {
    return (this._glNewList ??= load('glNewList', { args: [u32, u32], returns: voidType }))(list, mode);
  }

  public glNormal3f(nx: GLfloat, ny: GLfloat, nz: GLfloat): void {
    return (this._glNormal3f ??= load('glNormal3f', { args: [f32, f32, f32], returns: voidType }))(nx, ny, nz);
  }

  public glNormalPointer(type: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    return (this._glNormalPointer ??= load('glNormalPointer', { args: [u32, i32, ptr], returns: voidType }))(type, stride, pointer);
  }

  public glOrtho(left: GLdouble, right: GLdouble, bottom: GLdouble, top: GLdouble, zNear: GLdouble, zFar: GLdouble): void {
    return (this._glOrtho ??= load('glOrtho', { args: [f64, f64, f64, f64, f64, f64], returns: voidType }))(left, right, bottom, top, zNear, zFar);
  }

  public glPassThrough(token: GLfloat): void {
    return (this._glPassThrough ??= load('glPassThrough', { args: [f32], returns: voidType }))(token);
  }

  public glPixelMapfv(map: GLenum, mapsize: GLsizei, values: GLfloat_): void {
    return (this._glPixelMapfv ??= load('glPixelMapfv', { args: [u32, i32, ptr], returns: voidType }))(map, mapsize, values);
  }

  public glPixelMapuiv(map: GLenum, mapsize: GLsizei, values: GLuint_): void {
    return (this._glPixelMapuiv ??= load('glPixelMapuiv', { args: [u32, i32, ptr], returns: voidType }))(map, mapsize, values);
  }

  public glPixelMapusv(map: GLenum, mapsize: GLsizei, values: GLushort_): void {
    return (this._glPixelMapusv ??= load('glPixelMapusv', { args: [u32, i32, ptr], returns: voidType }))(map, mapsize, values);
  }

  public glPixelStoref(pname: GLenum, param: GLfloat): void {
    return (this._glPixelStoref ??= load('glPixelStoref', { args: [u32, f32], returns: voidType }))(pname, param);
  }

  public glPixelStorei(pname: GLenum, param: GLint): void {
    return (this._glPixelStorei ??= load('glPixelStorei', { args: [u32, i32], returns: voidType }))(pname, param);
  }

  public glPixelTransferf(pname: GLenum, param: GLfloat): void {
    return (this._glPixelTransferf ??= load('glPixelTransferf', { args: [u32, f32], returns: voidType }))(pname, param);
  }

  public glPixelTransferi(pname: GLenum, param: GLint): void {
    return (this._glPixelTransferi ??= load('glPixelTransferi', { args: [u32, i32], returns: voidType }))(pname, param);
  }

  public glPixelZoom(xfactor: GLfloat, yfactor: GLfloat): void {
    return (this._glPixelZoom ??= load('glPixelZoom', { args: [f32, f32], returns: voidType }))(xfactor, yfactor);
  }

  public glPointSize(size: GLfloat): void {
    return (this._glPointSize ??= load('glPointSize', { args: [f32], returns: voidType }))(size);
  }

  public glPolygonMode(face: GLenum, mode: GLenum): void {
    return (this._glPolygonMode ??= load('glPolygonMode', { args: [u32, u32], returns: voidType }))(face, mode);
  }

  public glPolygonOffset(factor: GLfloat, units: GLfloat): void {
    return (this._glPolygonOffset ??= load('glPolygonOffset', { args: [f32, f32], returns: voidType }))(factor, units);
  }

  public glPolygonStipple(mask: GLubyte_): void {
    return (this._glPolygonStipple ??= load('glPolygonStipple', { args: [ptr], returns: voidType }))(mask);
  }

  public glPopAttrib(): void {
    return (this._glPopAttrib ??= load('glPopAttrib', { args: [], returns: voidType }))();
  }

  public glPopMatrix(): void {
    return (this._glPopMatrix ??= load('glPopMatrix', { args: [], returns: voidType }))();
  }

  public glPopName(): void {
    return (this._glPopName ??= load('glPopName', { args: [], returns: voidType }))();
  }

  public glPrioritizeTextures(n: GLsizei, textures: GLuint_, priorities: GLclampf_): void {
    return (this._glPrioritizeTextures ??= load('glPrioritizeTextures', { args: [i32, ptr, ptr], returns: voidType }))(n, textures, priorities);
  }

  public glPushAttrib(mask: GLbitfield): void {
    return (this._glPushAttrib ??= load('glPushAttrib', { args: [u32], returns: voidType }))(mask);
  }

  public glPushMatrix(): void {
    return (this._glPushMatrix ??= load('glPushMatrix', { args: [], returns: voidType }))();
  }

  public glPushName(name: GLuint): void {
    return (this._glPushName ??= load('glPushName', { args: [u32], returns: voidType }))(name);
  }

  public glRasterPos2f(x: GLfloat, y: GLfloat): void {
    return (this._glRasterPos2f ??= load('glRasterPos2f', { args: [f32, f32], returns: voidType }))(x, y);
  }

  public glRasterPos3f(x: GLfloat, y: GLfloat, z: GLfloat): void {
    return (this._glRasterPos3f ??= load('glRasterPos3f', { args: [f32, f32, f32], returns: voidType }))(x, y, z);
  }

  public glRasterPos4f(x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void {
    return (this._glRasterPos4f ??= load('glRasterPos4f', { args: [f32, f32, f32, f32], returns: voidType }))(x, y, z, w);
  }

  public glReadBuffer(mode: GLenum): void {
    return (this._glReadBuffer ??= load('glReadBuffer', { args: [u32], returns: voidType }))(mode);
  }

  public glReadPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    return (this._glReadPixels ??= load('glReadPixels', { args: [i32, i32, i32, i32, u32, u32, ptr], returns: voidType }))(x, y, width, height, format, type, pixels);
  }

  public glRenderMode(mode: GLenum): GLint {
    return (this._glRenderMode ??= load('glRenderMode', { args: [u32], returns: i32 }))(mode);
  }

  public glRotatef(angle: GLfloat, x: GLfloat, y: GLfloat, z: GLfloat): void {
    return (this._glRotatef ??= load('glRotatef', { args: [f32, f32, f32, f32], returns: voidType }))(angle, x, y, z);
  }

  public glRotated(angle: GLdouble, x: GLdouble, y: GLdouble, z: GLdouble): void {
    return (this._glRotated ??= load('glRotated', { args: [f64, f64, f64, f64], returns: voidType }))(angle, x, y, z);
  }

  public glScalef(x: GLfloat, y: GLfloat, z: GLfloat): void {
    return (this._glScalef ??= load('glScalef', { args: [f32, f32, f32], returns: voidType }))(x, y, z);
  }

  public glScaled(x: GLdouble, y: GLdouble, z: GLdouble): void {
    return (this._glScaled ??= load('glScaled', { args: [f64, f64, f64], returns: voidType }))(x, y, z);
  }

  public glScissor(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
    return (this._glScissor ??= load('glScissor', { args: [i32, i32, i32, i32], returns: voidType }))(x, y, width, height);
  }

  public glSelectBuffer(size: GLsizei, buffer: GLuint_): void {
    return (this._glSelectBuffer ??= load('glSelectBuffer', { args: [i32, ptr], returns: voidType }))(size, buffer);
  }

  public glShadeModel(mode: GLenum): void {
    return (this._glShadeModel ??= load('glShadeModel', { args: [u32], returns: voidType }))(mode);
  }

  public glStencilFunc(func: GLenum, ref: GLint, mask: GLuint): void {
    return (this._glStencilFunc ??= load('glStencilFunc', { args: [u32, i32, u32], returns: voidType }))(func, ref, mask);
  }

  public glStencilMask(mask: GLuint): void {
    return (this._glStencilMask ??= load('glStencilMask', { args: [u32], returns: voidType }))(mask);
  }

  public glStencilOp(fail: GLenum, zfail: GLenum, zpass: GLenum): void {
    return (this._glStencilOp ??= load('glStencilOp', { args: [u32, u32, u32], returns: voidType }))(fail, zfail, zpass);
  }

  public glTexCoord2f(s: GLfloat, t: GLfloat): void {
    return (this._glTexCoord2f ??= load('glTexCoord2f', { args: [f32, f32], returns: voidType }))(s, t);
  }

  public glTexCoordPointer(size: GLint, type: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    return (this._glTexCoordPointer ??= load('glTexCoordPointer', { args: [i32, u32, i32, ptr], returns: voidType }))(size, type, stride, pointer);
  }

  public glTexEnvf(target: GLenum, pname: GLenum, param: GLfloat): void {
    return (this._glTexEnvf ??= load('glTexEnvf', { args: [u32, u32, f32], returns: voidType }))(target, pname, param);
  }

  public glTexEnvfv(target: GLenum, pname: GLenum, params: GLfloat_): void {
    return (this._glTexEnvfv ??= load('glTexEnvfv', { args: [u32, u32, ptr], returns: voidType }))(target, pname, params);
  }

  public glTexEnvi(target: GLenum, pname: GLenum, param: GLint): void {
    return (this._glTexEnvi ??= load('glTexEnvi', { args: [u32, u32, i32], returns: voidType }))(target, pname, param);
  }

  public glTexEnviv(target: GLenum, pname: GLenum, params: GLint_): void {
    return (this._glTexEnviv ??= load('glTexEnviv', { args: [u32, u32, ptr], returns: voidType }))(target, pname, params);
  }

  public glTexGend(coord: GLenum, pname: GLenum, param: GLdouble): void {
    return (this._glTexGend ??= load('glTexGend', { args: [u32, u32, f64], returns: voidType }))(coord, pname, param);
  }

  public glTexGendv(coord: GLenum, pname: GLenum, params: GLdouble_): void {
    return (this._glTexGendv ??= load('glTexGendv', { args: [u32, u32, ptr], returns: voidType }))(coord, pname, params);
  }

  public glTexGenf(coord: GLenum, pname: GLenum, param: GLfloat): void {
    return (this._glTexGenf ??= load('glTexGenf', { args: [u32, u32, f32], returns: voidType }))(coord, pname, param);
  }

  public glTexGenfv(coord: GLenum, pname: GLenum, params: GLfloat_): void {
    return (this._glTexGenfv ??= load('glTexGenfv', { args: [u32, u32, ptr], returns: voidType }))(coord, pname, params);
  }

  public glTexGeni(coord: GLenum, pname: GLenum, param: GLint): void {
    return (this._glTexGeni ??= load('glTexGeni', { args: [u32, u32, i32], returns: voidType }))(coord, pname, param);
  }

  public glTexGeniv(coord: GLenum, pname: GLenum, params: GLint_): void {
    return (this._glTexGeniv ??= load('glTexGeniv', { args: [u32, u32, ptr], returns: voidType }))(coord, pname, params);
  }

  public glTexImage1D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    return (this._glTexImage1D ??= load('glTexImage1D', { args: [u32, i32, i32, i32, i32, u32, u32, ptr], returns: voidType }))(target, level, internalformat, width, border, format, type, pixels);
  }

  public glTexImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    return (this._glTexImage2D ??= load('glTexImage2D', { args: [u32, i32, i32, i32, i32, i32, u32, u32, ptr], returns: voidType }))(target, level, internalformat, width, height, border, format, type, pixels);
  }

  public glTexParameterf(target: GLenum, pname: GLenum, param: GLfloat): void {
    return (this._glTexParameterf ??= load('glTexParameterf', { args: [u32, u32, f32], returns: voidType }))(target, pname, param);
  }

  public glTexParameterfv(target: GLenum, pname: GLenum, params: GLfloat_): void {
    return (this._glTexParameterfv ??= load('glTexParameterfv', { args: [u32, u32, ptr], returns: voidType }))(target, pname, params);
  }

  public glTexParameteri(target: GLenum, pname: GLenum, param: GLint): void {
    return (this._glTexParameteri ??= load('glTexParameteri', { args: [u32, u32, i32], returns: voidType }))(target, pname, param);
  }

  public glTexParameteriv(target: GLenum, pname: GLenum, params: GLint_): void {
    return (this._glTexParameteriv ??= load('glTexParameteriv', { args: [u32, u32, ptr], returns: voidType }))(target, pname, params);
  }

  public glTexSubImage1D(target: GLenum, level: GLint, xoffset: GLint, width: GLsizei, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    return (this._glTexSubImage1D ??= load('glTexSubImage1D', { args: [u32, i32, i32, i32, u32, u32, ptr], returns: voidType }))(target, level, xoffset, width, format, type, pixels);
  }

  public glTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: GLvoid_): void {
    return (this._glTexSubImage2D ??= load('glTexSubImage2D', { args: [u32, i32, i32, i32, i32, i32, u32, u32, ptr], returns: voidType }))(target, level, xoffset, yoffset, width, height, format, type, pixels);
  }

  public glTranslatef(x: GLfloat, y: GLfloat, z: GLfloat): void {
    return (this._glTranslatef ??= load('glTranslatef', { args: [f32, f32, f32], returns: voidType }))(x, y, z);
  }

  public glTranslated(x: GLdouble, y: GLdouble, z: GLdouble): void {
    return (this._glTranslated ??= load('glTranslated', { args: [f64, f64, f64], returns: voidType }))(x, y, z);
  }

  public glVertex2f(x: GLfloat, y: GLfloat): void {
    return (this._glVertex2f ??= load('glVertex2f', { args: [f32, f32], returns: voidType }))(x, y);
  }

  public glVertex3f(x: GLfloat, y: GLfloat, z: GLfloat): void {
    return (this._glVertex3f ??= load('glVertex3f', { args: [f32, f32, f32], returns: voidType }))(x, y, z);
  }

  public glVertexPointer(size: GLint, type: GLenum, stride: GLsizei, pointer: GLvoid_): void {
    return (this._glVertexPointer ??= load('glVertexPointer', { args: [i32, u32, i32, ptr], returns: voidType }))(size, type, stride, pointer);
  }

  public glViewport(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
    return (this._glViewport ??= load('glViewport', { args: [i32, i32, i32, i32], returns: voidType }))(x, y, width, height);
  }

  private _glAccum?: OpenGL32['glAccum'];
  private _glAlphaFunc?: OpenGL32['glAlphaFunc'];
  private _glAreTexturesResident?: OpenGL32['glAreTexturesResident'];
  private _glArrayElement?: OpenGL32['glArrayElement'];
  private _glBegin?: OpenGL32['glBegin'];
  private _glBindTexture?: OpenGL32['glBindTexture'];
  private _glBitmap?: OpenGL32['glBitmap'];
  private _glBlendFunc?: OpenGL32['glBlendFunc'];
  private _glCallList?: OpenGL32['glCallList'];
  private _glCallLists?: OpenGL32['glCallLists'];
  private _glClear?: OpenGL32['glClear'];
  private _glClearAccum?: OpenGL32['glClearAccum'];
  private _glClearColor?: OpenGL32['glClearColor'];
  private _glClearDepth?: OpenGL32['glClearDepth'];
  private _glClearIndex?: OpenGL32['glClearIndex'];
  private _glClearStencil?: OpenGL32['glClearStencil'];
  private _glClipPlane?: OpenGL32['glClipPlane'];
  private _glColorMask?: OpenGL32['glColorMask'];
  private _glColorMaterial?: OpenGL32['glColorMaterial'];
  private _glColorPointer?: OpenGL32['glColorPointer'];
  private _glCopyPixels?: OpenGL32['glCopyPixels'];
  private _glCopyTexImage1D?: OpenGL32['glCopyTexImage1D'];
  private _glCopyTexImage2D?: OpenGL32['glCopyTexImage2D'];
  private _glCopyTexSubImage1D?: OpenGL32['glCopyTexSubImage1D'];
  private _glCopyTexSubImage2D?: OpenGL32['glCopyTexSubImage2D'];
  private _glCullFace?: OpenGL32['glCullFace'];
  private _glDeleteLists?: OpenGL32['glDeleteLists'];
  private _glDeleteTextures?: OpenGL32['glDeleteTextures'];
  private _glDepthFunc?: OpenGL32['glDepthFunc'];
  private _glDepthMask?: OpenGL32['glDepthMask'];
  private _glDepthRange?: OpenGL32['glDepthRange'];
  private _glDisable?: OpenGL32['glDisable'];
  private _glDisableClientState?: OpenGL32['glDisableClientState'];
  private _glDrawArrays?: OpenGL32['glDrawArrays'];
  private _glDrawBuffer?: OpenGL32['glDrawBuffer'];
  private _glDrawElements?: OpenGL32['glDrawElements'];
  private _glDrawPixels?: OpenGL32['glDrawPixels'];
  private _glEdgeFlag?: OpenGL32['glEdgeFlag'];
  private _glEdgeFlagPointer?: OpenGL32['glEdgeFlagPointer'];
  private _glEdgeFlagv?: OpenGL32['glEdgeFlagv'];
  private _glEnable?: OpenGL32['glEnable'];
  private _glEnableClientState?: OpenGL32['glEnableClientState'];
  private _glEnd?: OpenGL32['glEnd'];
  private _glEndList?: OpenGL32['glEndList'];
  private _glFeedbackBuffer?: OpenGL32['glFeedbackBuffer'];
  private _glFinish?: OpenGL32['glFinish'];
  private _glFlush?: OpenGL32['glFlush'];
  private _glFogf?: OpenGL32['glFogf'];
  private _glFogfv?: OpenGL32['glFogfv'];
  private _glFogi?: OpenGL32['glFogi'];
  private _glFogiv?: OpenGL32['glFogiv'];
  private _glFrontFace?: OpenGL32['glFrontFace'];
  private _glFrustum?: OpenGL32['glFrustum'];
  private _glGenLists?: OpenGL32['glGenLists'];
  private _glGenTextures?: OpenGL32['glGenTextures'];
  private _glGetBooleanv?: OpenGL32['glGetBooleanv'];
  private _glGetClipPlane?: OpenGL32['glGetClipPlane'];
  private _glGetDoublev?: OpenGL32['glGetDoublev'];
  private _glGetError?: OpenGL32['glGetError'];
  private _glGetFloatv?: OpenGL32['glGetFloatv'];
  private _glGetIntegerv?: OpenGL32['glGetIntegerv'];
  private _glGetLightfv?: OpenGL32['glGetLightfv'];
  private _glGetLightiv?: OpenGL32['glGetLightiv'];
  private _glGetMapdv?: OpenGL32['glGetMapdv'];
  private _glGetMapfv?: OpenGL32['glGetMapfv'];
  private _glGetMapiv?: OpenGL32['glGetMapiv'];
  private _glGetMaterialfv?: OpenGL32['glGetMaterialfv'];
  private _glGetMaterialiv?: OpenGL32['glGetMaterialiv'];
  private _glGetPixelMapfv?: OpenGL32['glGetPixelMapfv'];
  private _glGetPixelMapuiv?: OpenGL32['glGetPixelMapuiv'];
  private _glGetPixelMapusv?: OpenGL32['glGetPixelMapusv'];
  private _glGetPointerv?: OpenGL32['glGetPointerv'];
  private _glGetPolygonStipple?: OpenGL32['glGetPolygonStipple'];
  private _glGetString?: OpenGL32['glGetString'];
  private _glGetTexEnvfv?: OpenGL32['glGetTexEnvfv'];
  private _glGetTexEnviv?: OpenGL32['glGetTexEnviv'];
  private _glGetTexGendv?: OpenGL32['glGetTexGendv'];
  private _glGetTexGenfv?: OpenGL32['glGetTexGenfv'];
  private _glGetTexGeniv?: OpenGL32['glGetTexGeniv'];
  private _glGetTexImage?: OpenGL32['glGetTexImage'];
  private _glGetTexLevelParameterfv?: OpenGL32['glGetTexLevelParameterfv'];
  private _glGetTexLevelParameteriv?: OpenGL32['glGetTexLevelParameteriv'];
  private _glGetTexParameterfv?: OpenGL32['glGetTexParameterfv'];
  private _glGetTexParameteriv?: OpenGL32['glGetTexParameteriv'];
  private _glHint?: OpenGL32['glHint'];
  private _glIndexMask?: OpenGL32['glIndexMask'];
  private _glIndexPointer?: OpenGL32['glIndexPointer'];
  private _glIndexd?: OpenGL32['glIndexd'];
  private _glIndexf?: OpenGL32['glIndexf'];
  private _glIndexi?: OpenGL32['glIndexi'];
  private _glIndexs?: OpenGL32['glIndexs'];
  private _glInitNames?: OpenGL32['glInitNames'];
  private _glInterleavedArrays?: OpenGL32['glInterleavedArrays'];
  private _glIsEnabled?: OpenGL32['glIsEnabled'];
  private _glIsList?: OpenGL32['glIsList'];
  private _glIsTexture?: OpenGL32['glIsTexture'];
  private _glLightModelf?: OpenGL32['glLightModelf'];
  private _glLightModelfv?: OpenGL32['glLightModelfv'];
  private _glLightModeli?: OpenGL32['glLightModeli'];
  private _glLightModeliv?: OpenGL32['glLightModeliv'];
  private _glLightf?: OpenGL32['glLightf'];
  private _glLightfv?: OpenGL32['glLightfv'];
  private _glLighti?: OpenGL32['glLighti'];
  private _glLightiv?: OpenGL32['glLightiv'];
  private _glLineStipple?: OpenGL32['glLineStipple'];
  private _glLineWidth?: OpenGL32['glLineWidth'];
  private _glListBase?: OpenGL32['glListBase'];
  private _glLoadIdentity?: OpenGL32['glLoadIdentity'];
  private _glLoadMatrixd?: OpenGL32['glLoadMatrixd'];
  private _glLoadMatrixf?: OpenGL32['glLoadMatrixf'];
  private _glLoadName?: OpenGL32['glLoadName'];
  private _glLogicOp?: OpenGL32['glLogicOp'];
  private _glMap1d?: OpenGL32['glMap1d'];
  private _glMap1f?: OpenGL32['glMap1f'];
  private _glMap2d?: OpenGL32['glMap2d'];
  private _glMap2f?: OpenGL32['glMap2f'];
  private _glMapGrid1d?: OpenGL32['glMapGrid1d'];
  private _glMapGrid1f?: OpenGL32['glMapGrid1f'];
  private _glMapGrid2d?: OpenGL32['glMapGrid2d'];
  private _glMapGrid2f?: OpenGL32['glMapGrid2f'];
  private _glMaterialf?: OpenGL32['glMaterialf'];
  private _glMaterialfv?: OpenGL32['glMaterialfv'];
  private _glMateriali?: OpenGL32['glMateriali'];
  private _glMaterialiv?: OpenGL32['glMaterialiv'];
  private _glMatrixMode?: OpenGL32['glMatrixMode'];
  private _glMultMatrixd?: OpenGL32['glMultMatrixd'];
  private _glMultMatrixf?: OpenGL32['glMultMatrixf'];
  private _glNewList?: OpenGL32['glNewList'];
  private _glNormal3f?: OpenGL32['glNormal3f'];
  private _glNormalPointer?: OpenGL32['glNormalPointer'];
  private _glOrtho?: OpenGL32['glOrtho'];
  private _glPassThrough?: OpenGL32['glPassThrough'];
  private _glPixelMapfv?: OpenGL32['glPixelMapfv'];
  private _glPixelMapuiv?: OpenGL32['glPixelMapuiv'];
  private _glPixelMapusv?: OpenGL32['glPixelMapusv'];
  private _glPixelStoref?: OpenGL32['glPixelStoref'];
  private _glPixelStorei?: OpenGL32['glPixelStorei'];
  private _glPixelTransferf?: OpenGL32['glPixelTransferf'];
  private _glPixelTransferi?: OpenGL32['glPixelTransferi'];
  private _glPixelZoom?: OpenGL32['glPixelZoom'];
  private _glPointSize?: OpenGL32['glPointSize'];
  private _glPolygonMode?: OpenGL32['glPolygonMode'];
  private _glPolygonOffset?: OpenGL32['glPolygonOffset'];
  private _glPolygonStipple?: OpenGL32['glPolygonStipple'];
  private _glPopAttrib?: OpenGL32['glPopAttrib'];
  private _glPopMatrix?: OpenGL32['glPopMatrix'];
  private _glPopName?: OpenGL32['glPopName'];
  private _glPrioritizeTextures?: OpenGL32['glPrioritizeTextures'];
  private _glPushAttrib?: OpenGL32['glPushAttrib'];
  private _glPushMatrix?: OpenGL32['glPushMatrix'];
  private _glPushName?: OpenGL32['glPushName'];
  private _glRasterPos2f?: OpenGL32['glRasterPos2f'];
  private _glRasterPos3f?: OpenGL32['glRasterPos3f'];
  private _glRasterPos4f?: OpenGL32['glRasterPos4f'];
  private _glReadBuffer?: OpenGL32['glReadBuffer'];
  private _glReadPixels?: OpenGL32['glReadPixels'];
  private _glRenderMode?: OpenGL32['glRenderMode'];
  private _glRotatef?: OpenGL32['glRotatef'];
  private _glRotated?: OpenGL32['glRotated'];
  private _glScalef?: OpenGL32['glScalef'];
  private _glScaled?: OpenGL32['glScaled'];
  private _glScissor?: OpenGL32['glScissor'];
  private _glSelectBuffer?: OpenGL32['glSelectBuffer'];
  private _glShadeModel?: OpenGL32['glShadeModel'];
  private _glStencilFunc?: OpenGL32['glStencilFunc'];
  private _glStencilMask?: OpenGL32['glStencilMask'];
  private _glStencilOp?: OpenGL32['glStencilOp'];
  private _glTexCoord2f?: OpenGL32['glTexCoord2f'];
  private _glTexCoordPointer?: OpenGL32['glTexCoordPointer'];
  private _glTexEnvf?: OpenGL32['glTexEnvf'];
  private _glTexEnvfv?: OpenGL32['glTexEnvfv'];
  private _glTexEnvi?: OpenGL32['glTexEnvi'];
  private _glTexEnviv?: OpenGL32['glTexEnviv'];
  private _glTexGend?: OpenGL32['glTexGend'];
  private _glTexGendv?: OpenGL32['glTexGendv'];
  private _glTexGenf?: OpenGL32['glTexGenf'];
  private _glTexGenfv?: OpenGL32['glTexGenfv'];
  private _glTexGeni?: OpenGL32['glTexGeni'];
  private _glTexGeniv?: OpenGL32['glTexGeniv'];
  private _glTexImage1D?: OpenGL32['glTexImage1D'];
  private _glTexImage2D?: OpenGL32['glTexImage2D'];
  private _glTexParameterf?: OpenGL32['glTexParameterf'];
  private _glTexParameterfv?: OpenGL32['glTexParameterfv'];
  private _glTexParameteri?: OpenGL32['glTexParameteri'];
  private _glTexParameteriv?: OpenGL32['glTexParameteriv'];
  private _glTexSubImage1D?: OpenGL32['glTexSubImage1D'];
  private _glTexSubImage2D?: OpenGL32['glTexSubImage2D'];
  private _glTranslatef?: OpenGL32['glTranslatef'];
  private _glTranslated?: OpenGL32['glTranslated'];
  private _glVertex2f?: OpenGL32['glVertex2f'];
  private _glVertex3f?: OpenGL32['glVertex3f'];
  private _glVertexPointer?: OpenGL32['glVertexPointer'];
  private _glViewport?: OpenGL32['glViewport'];
}

export default OpenGL32;
