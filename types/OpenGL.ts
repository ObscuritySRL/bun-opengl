import type { Pointer } from 'bun:ffi';

export enum GLenum {
  /* AlphaFunction */
  Always = 0x0207,
  Equal = 0x0202,
  Gequal = 0x0206,
  Greater = 0x0204,
  Lequal = 0x0203,
  Less = 0x0201,
  Never = 0x0200,
  Notequal = 0x0205,

  /* BeginMode */
  LineLoop = 0x0002,
  Lines = 0x0001,
  LineStrip = 0x0003,
  Points = 0x0000,
  TriangleFan = 0x0006,
  Triangles = 0x0004,
  TriangleStrip = 0x0005,

  /* BlendingFactorDest */
  DstAlpha = 0x0304,
  One = 1,
  OneMinusDstAlpha = 0x0305,
  OneMinusSrcAlpha = 0x0303,
  OneMinusSrcColor = 0x0301,
  SrcAlpha = 0x0302,
  SrcColor = 0x0300,
  Zero = 0,

  /* BlendingFactorSrc */
  /*      DstAlpha */
  DstColor = 0x0306,
  /*      One */
  /*      OneMinusDstAlpha */
  OneMinusDstColor = 0x0307,
  /*      OneMinusSrcAlpha */
  /*      SrcAlpha */
  SrcAlphaSaturate = 0x0308,
  /*      Zero */

  /* Boolean */
  False = 0,
  True = 1,

  /* ClearBufferMask */
  AccumBufferBit = 0x00000200,
  ColorBufferBit = 0x00004000,
  DepthBufferBit = 0x00000100,
  StencilBufferBit = 0x00000400,

  /* AttribMask */
  CurrentBit = 0x00000001,
  PointBit = 0x00000002,
  LineBit = 0x00000004,
  PolygonBit = 0x00000008,
  PolygonStippleBit = 0x00000010,
  PixelModeBit = 0x00000020,
  LightingBit = 0x00000040,
  FogBit = 0x00000080,
  /*      DepthBufferBit */
  /*      AccumBufferBit */
  /*      StencilBufferBit */
  ViewportBit = 0x00000800,
  TransformBit = 0x00001000,
  EnableBit = 0x00002000,
  /*      ColorBufferBit */
  HintBit = 0x00008000,
  EvalBit = 0x00010000,
  ListBit = 0x00020000,
  TextureBit = 0x00040000,
  ScissorBit = 0x00080000,
  AllAttribBits = 0x000fffff,

  /* ColorMaterialFace */
  /*      FrontAndBack */

  /* ColorMaterialParameter */
  /*      AmbientAndDiffuse */

  /* ColorPointerType */
  /*      Fixed */
  /*      Float */
  /*      UnsignedByte */

  /* CullFaceMode */
  Back = 0x0405,
  Front = 0x0404,
  FrontAndBack = 0x0408,

  /* DataType */
  Byte = 0x1400,
  Fixed = 0x140c,
  Float = 0x1406,
  Short = 0x1402,
  UnsignedByte = 0x1401,
  UnsignedShort = 0x1403,

  /* DepthFunction */
  /*      Always */
  /*      Equal */
  /*      Gequal */
  /*      Greater */
  /*      Lequal */
  /*      Less */
  /*      Never */
  /*      Notequal */

  /* DrawBufferMode */
  None = 0x0000,
  FrontLeft = 0x0400,
  FrontRight = 0x0401,
  BackLeft = 0x0402,
  BackRight = 0x0403,
  Left = 0x0406,
  Right = 0x0407,
  Aux0 = 0x0409,
  Aux1 = 0x040a,
  Aux2 = 0x040b,
  Aux3 = 0x040c,

  /* EnableCap */
  AlphaTest = 0x0bc0,
  Blend = 0x0be2,
  ColorArray = 0x8076,
  ColorLogicOp = 0x0bf2,
  ColorMaterial = 0x0b57,
  CullFace = 0x0b44,
  DepthTest = 0x0b71,
  Dither = 0x0bd0,
  Fog = 0x0b60,
  /*      Light0 */
  /*      Light1 */
  /*      Light2 */
  /*      Light3 */
  /*      Light4 */
  /*      Light5 */
  /*      Light6 */
  /*      Light7 */
  Lighting = 0x0b50,
  LineSmooth = 0x0b20,
  PolygonSmooth = 0x0b41,
  Multisample = 0x809d,
  NormalArray = 0x8075,
  Normalize = 0x0ba1,
  PointSmooth = 0x0b10,
  PolygonOffsetFill = 0x8037,
  RescaleNormal = 0x803a,
  SampleAlphaToCoverage = 0x809e,
  SampleAlphaToOne = 0x809f,
  SampleCoverage = 0x80a0,
  ScissorTest = 0x0c11,
  StencilTest = 0x0b90,
  Texture2D = 0x0de1,
  TextureCoordArray = 0x8078,
  VertexArray = 0x8074,

  /* ErrorCode */
  InvalidEnum = 0x0500,
  InvalidOperation = 0x0502,
  InvalidValue = 0x0501,
  NoError = 0,
  OutOfMemory = 0x0505,
  StackOverflow = 0x0503,
  StackUnderflow = 0x0504,

  /* FogMode */
  Exp = 0x0800,
  Exp2 = 0x0801,
  /*      Linear */

  /* FogParameter */
  FogColor = 0x0b66,
  FogDensity = 0x0b62,
  FogEnd = 0x0b64,
  FogMode = 0x0b65,
  FogStart = 0x0b63,

  /* FrontFaceDirection */
  Ccw = 0x0901,
  Cw = 0x0900,

  /* GetPName */
  AliasedLineWidthRange = 0x846e,
  AliasedPointSizeRange = 0x846d,
  AlphaBits = 0x0d55,
  BlueBits = 0x0d54,
  CompressedTextureFormats = 0x86a3,
  DepthBits = 0x0d56,
  GreenBits = 0x0d53,
  ImplementationColorReadFormatOes = 0x8b9b,
  ImplementationColorReadTypeOes = 0x8b9a,
  LineWidth = 0x0b21,
  MatrixMode = 0x0ba0,
  MaxElementsIndices = 0x80e9,
  MaxElementsVertices = 0x80e8,
  MaxLights = 0x0d31,
  MaxModelviewStackDepth = 0x0d36,
  MaxProjectionStackDepth = 0x0d38,
  MaxTextureSize = 0x0d33,
  MaxTextureStackDepth = 0x0d39,
  MaxTextureUnits = 0x84e2,
  MaxViewportDims = 0x0d3a,
  NumCompressedTextureFormats = 0x86a2,
  RedBits = 0x0d52,
  SmoothLineWidthRange = 0x0b22,
  SmoothPointSizeRange = 0x0b12,
  StencilBits = 0x0d57,
  SubpixelBits = 0x0d50,
  Viewport = 0x0ba2,

  /* HintMode */
  DontCare = 0x1100,
  Fastest = 0x1101,
  Nicest = 0x1102,

  /* HintTarget */
  FogHint = 0x0c54,
  LineSmoothHint = 0x0c52,
  PerspectiveCorrectionHint = 0x0c50,
  PointSmoothHint = 0x0c51,
  PolygonSmoothHint = 0x0c53,

  /* LightModelParameter */
  LightModelAmbient = 0x0b53,
  LightModelTwoSide = 0x0b52,

  /* LightName */
  Light0 = 0x4000,
  Light1 = 0x4001,
  Light2 = 0x4002,
  Light3 = 0x4003,
  Light4 = 0x4004,
  Light5 = 0x4005,
  Light6 = 0x4006,
  Light7 = 0x4007,

  /* LightParameter */
  Ambient = 0x1200,
  ConstantAttenuation = 0x1207,
  Diffuse = 0x1201,
  LinearAttenuation = 0x1208,
  Position = 0x1203,
  QuadraticAttenuation = 0x1209,
  Specular = 0x1202,
  SpotCutoff = 0x1206,
  SpotDirection = 0x1204,
  SpotExponent = 0x1205,

  /* LogicOp */
  And = 0x1501,
  AndInverted = 0x1504,
  AndReverse = 0x1502,
  Clear = 0x1500,
  Copy = 0x1503,
  CopyInverted = 0x150c,
  Equiv = 0x1509,
  Invert = 0x150a,
  Nand = 0x150e,
  Noop = 0x1505,
  Nor = 0x1508,
  Or = 0x1507,
  OrInverted = 0x150d,
  OrReverse = 0x150b,
  Set = 0x150f,
  Xor = 0x1506,

  /* MaterialFace */
  /*      FrontAndBack */

  /* MaterialParameter */
  /*      Ambient */
  AmbientAndDiffuse = 0x1602,
  /*      Diffuse */
  Emission = 0x1600,
  Shininess = 0x1601,
  /*      Specular */

  /* MatrixMode */
  Modelview = 0x1700,
  Projection = 0x1701,
  Texture = 0x1702,

  /* PolygonMode */
  Fill = 0x1b02,
  Line = 0x1b01,
  Point = 0x1b00,

  /* NormalPointerType */
  /*      Byte */
  /*      Fixed */
  /*      Float */
  /*      Short */

  /* PixelFormat */
  ColorIndex = 0x1900,
  Alpha = 0x1906,
  Blue = 0x1905,
  DepthComponent = 0x1902,
  Green = 0x1904,
  Luminance = 0x1909,
  LuminanceAlpha = 0x190a,
  Red = 0x1903,
  Rgb = 0x1907,
  Rgba = 0x1908,
  StencilIndex = 0x1901,

  /* PixelInternalFormat */
  Palette4R5G6B5Oes = 0x8b92,
  Palette4Rgb5A1Oes = 0x8b94,
  Palette4Rgb8Oes = 0x8b90,
  Palette4Rgba4Oes = 0x8b93,
  Palette4Rgba8Oes = 0x8b91,
  Palette8R5G6B5Oes = 0x8b97,
  Palette8Rgb5A1Oes = 0x8b99,
  Palette8Rgb8Oes = 0x8b95,
  Palette8Rgba4Oes = 0x8b98,
  Palette8Rgba8Oes = 0x8b96,

  /* PixelStoreParameter */
  PackAlignment = 0x0d05,
  PackLsbFirst = 0x0d01,
  PackRowLength = 0x0d02,
  PackSkipPixels = 0x0d04,
  PackSkipRows = 0x0d03,
  PackSwapBytes = 0x0d00,
  UnpackAlignment = 0x0cf5,
  UnpackLsbFirst = 0x0cf1,
  UnpackRowLength = 0x0cf2,
  UnpackSkipPixels = 0x0cf4,
  UnpackSkipRows = 0x0cf3,
  UnpackSwapBytes = 0x0cf0,

  /* PixelType */
  /*      UnsignedByte */
  UnsignedShort4444 = 0x8033,
  UnsignedShort5551 = 0x8034,
  UnsignedShort565 = 0x8363,

  /* ShadingModel */
  Flat = 0x1d00,
  Smooth = 0x1d01,

  /* StencilFunction */
  /*      Always */
  /*      Equal */
  /*      Gequal */
  /*      Greater */
  /*      Lequal */
  /*      Less */
  /*      Never */
  /*      Notequal */

  /* StencilOp */
  Decr = 0x1e03,
  Incr = 0x1e02,
  /*      Invert */
  Keep = 0x1e00,
  Replace = 0x1e01,
  /*      Zero */

  /* StringName */
  Extensions = 0x1f03,
  Renderer = 0x1f01,
  Vendor = 0x1f00,
  Version = 0x1f02,

  /* TexCoordPointerType */
  /*      Byte */
  /*      Fixed */
  /*      Float */
  /*      Short */

  /* TexGenCoord */
  S = 0x2000,
  T = 0x2001,
  R = 0x2002,
  Q = 0x2003,

  /* TexGenParameter */
  ObjectLinear = 0x2401,
  EyeLinear = 0x2400,
  SphereMap = 0x2402,
  TextureGenMode = 0x2500,
  ObjectPlane = 0x2501,
  EyePlane = 0x2502,

  /* TextureEnvMode */
  Add = 0x0104,
  /*      Blend */
  Decal = 0x2101,
  Modulate = 0x2100,
  /*      Replace */

  /* TextureEnvParameter */
  TextureEnvColor = 0x2201,
  TextureEnvMode = 0x2200,

  /* TextureEnvTarget */
  TextureEnv = 0x2300,

  /* TextureMagFilter */
  Linear = 0x2601,
  Nearest = 0x2600,

  /* TextureMinFilter */
  /*      Linear */
  LinearMipmapLinear = 0x2703,
  LinearMipmapNearest = 0x2701,
  /*      Nearest */
  NearestMipmapLinear = 0x2702,
  NearestMipmapNearest = 0x2700,

  /* TextureParameterName */
  TextureBorderColor = 0x1004,
  TextureMagFilter = 0x2800,
  TextureMinFilter = 0x2801,
  TextureWrapS = 0x2802,
  TextureWrapT = 0x2803,
  TexturePriority = 0x8066,
  TextureResident = 0x8067,

  /* TextureTarget */
  /*      Texture2D */

  /* TextureUnit */
  Texture0 = 0x84c0,
  Texture1 = 0x84c1,
  Texture10 = 0x84ca,
  Texture11 = 0x84cb,
  Texture12 = 0x84cc,
  Texture13 = 0x84cd,
  Texture14 = 0x84ce,
  Texture15 = 0x84cf,
  Texture16 = 0x84d0,
  Texture17 = 0x84d1,
  Texture18 = 0x84d2,
  Texture19 = 0x84d3,
  Texture2 = 0x84c2,
  Texture20 = 0x84d4,
  Texture21 = 0x84d5,
  Texture22 = 0x84d6,
  Texture23 = 0x84d7,
  Texture24 = 0x84d8,
  Texture25 = 0x84d9,
  Texture26 = 0x84da,
  Texture27 = 0x84db,
  Texture28 = 0x84dc,
  Texture29 = 0x84dd,
  Texture3 = 0x84c3,
  Texture30 = 0x84de,
  Texture31 = 0x84df,
  Texture4 = 0x84c4,
  Texture5 = 0x84c5,
  Texture6 = 0x84c6,
  Texture7 = 0x84c7,
  Texture8 = 0x84c8,
  Texture9 = 0x84c9,

  /* TextureWrapMode */
  Clamp = 0x2900,
  ClampToEdge = 0x812f,
  Repeat = 0x2901,

  /* VertexPointerType */
  /*      Byte */
  /*      Fixed */
  /*      Float */
  /*      Short */

  /* ClipPlaneName */
  ClipPlane0 = 0x3000,
  ClipPlane1 = 0x3001,
  ClipPlane2 = 0x3002,
  ClipPlane3 = 0x3003,
  ClipPlane4 = 0x3004,
  ClipPlane5 = 0x3005,

  /* GetMapTarget */
  Coeff = 0x0a00,
  Order = 0x0a01,
  Domain = 0x0a02,

  /* GetPointervPName */
  VertexArrayPointer = 0x808e,
  NormalArrayPointer = 0x808f,
  ColorArrayPointer = 0x8090,
  TextureCoordArrayPointer = 0x8092,

  /* RenderMode */
  Render = 0x1c00,
  Feedback = 0x1c01,
  Select = 0x1c02,

  /* TexLevelParameter */
  TextureWidth = 0x1000,
  TextureHeight = 0x1001,
  TextureComponents = 0x1003,
  TextureBorder = 0x1005,

  /* PixelTransferParameter */
  MapColor = 0x0d10,
  MapStencil = 0x0d11,
  IndexShift = 0x0d12,
  IndexOffset = 0x0d13,
  RedScale = 0x0d14,
  RedBias = 0x0d15,
  GreenScale = 0x0d18,
  GreenBias = 0x0d19,
  BlueScale = 0x0d1a,
  BlueBias = 0x0d1b,
  AlphaScale = 0x0d1c,
  AlphaBias = 0x0d1d,
  DepthScale = 0x0d1e,
  DepthBias = 0x0d1f,

  /* FeedbackType */
  _2D = 0x0600,
  _3D = 0x0601,
  _3DColor = 0x0602,
  _3DColorTexture = 0x0603,
  _4DColorTexture = 0x0604,

  /* ClientAttribMask */
  ClientPixelStoreBit = 0x00000001,
  ClientVertexArrayBit = 0x00000002,
  ClientAllAttribBits = 0xffffffff,
}

export type GLbitfield = number;
export type GLboolean = (typeof GLenum)['False' | 'True'];
export type GLbyte = number;
export type GLclampd = number;
export type GLclampf = number;
export type GLdouble = number;
export type GLfloat = number;
export type GLint = number;
export type GLshort = number;
export type GLsizei = number;
export type GLubyte = number;
export type GLuint = number;
export type GLushort = number;

// Pointer variants for common GL types
export type GLboolean_ = Pointer;
export type GLbyte_ = Pointer;
export type GLclampd_ = Pointer;
export type GLclampf_ = Pointer;
export type GLdouble_ = Pointer;
export type GLenum_ = Pointer;
export type GLfloat_ = Pointer;
export type GLint_ = Pointer;
export type GLshort_ = Pointer;
export type GLubyte_ = Pointer;
export type GLuint_ = Pointer;
export type GLushort_ = Pointer;
export type GLvoid_ = Pointer;

// Windows/WGL related types (aliases for clarity in bindings)
export type BOOL = number; // Win32 BOOL (int)
export type DWORD = number; // Win32 DWORD
export type HDC = Pointer;
export type HGLRC = Pointer;
export type INT = number; // Win32 INT
export type LPCSTR = Pointer;
export type LPPIXELFORMATDESCRIPTOR = Pointer;
export type LPLAYERPLANEDESCRIPTOR = Pointer;
export type LPGLYPHMETRICSFLOAT = Pointer;
export type LPWGLSWAP = Pointer;
export type PROC = Pointer;
export type UINT = number; // Win32 UINT
