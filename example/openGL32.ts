import OpenGL32 from 'bun-opengl32';

const start = performance.now();

OpenGL32.Init();

const end = performance.now();

console.log(`OpenGL32 loaded in ${(end - start).toFixed(2)} ms`);
