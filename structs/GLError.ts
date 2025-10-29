class GLError extends Error {
  public readonly code: number;

  public readonly what: string;

  constructor(what: string, code: number) {
    const { Codes, Messages } = GLError;

    const hex = `0x${(code >>> 0).toString(16).padStart(0x04, '0')}`;
    const message = Messages[code] ?? 'Unknown OpenGL error.';
    const name = Codes[code] ?? 'GL_UNKNOWN_ERROR';

    super(`${what} failed (${hex} — ${name}): ${message}`);

    this.code = code;
    this.name = 'GLError';
    this.what = what;

    Error.captureStackTrace?.(this, GLError);
  }

  public static readonly Messages: Record<number, string> = {
    0x0000: 'No error has been recorded. The value of this symbolic constant is guaranteed to be zero.',
    0x0500: 'An unacceptable value is specified for an enumerated argument. The offending function is ignored, having no side effect other than to set the error flag.',
    0x0501: 'A numeric argument is out of range. The offending function is ignored, having no side effect other than to set the error flag.',
    0x0502: 'The specified operation is not allowed in the current state. The offending function is ignored, having no side effect other than to set the error flag.',
    0x0503: 'This function would cause a stack overflow. The offending function is ignored, having no side effect other than to set the error flag.',
    0x0504: 'This function would cause a stack underflow. The offending function is ignored, having no side effect other than to set the error flag.',
    0x0505: 'There is not enough memory left to execute the function. The state of OpenGL is undefined, except for the state of the error flags, after this error is recorded.',
    0x0506: 'The framebuffer object is not complete. The offending function is ignored, having no side effect other than to set the error flag.',
    0x0507: 'The OpenGL context has been lost, due to a graphics card reset. All OpenGL state is lost, and the context must be created before continuing rendering.',
  };

  public static readonly Codes: Record<number, string> = {
    0x0000: 'GL_NO_ERROR',
    0x0500: 'GL_INVALID_ENUM',
    0x0501: 'GL_INVALID_VALUE',
    0x0502: 'GL_INVALID_OPERATION',
    0x0503: 'GL_STACK_OVERFLOW',
    0x0504: 'GL_STACK_UNDERFLOW',
    0x0505: 'GL_OUT_OF_MEMORY',
    0x0506: 'GL_INVALID_FRAMEBUFFER_OPERATION',
    0x0507: 'GL_CONTEXT_LOST',
  };
}

export default GLError;
