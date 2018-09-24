main();

function main(){
  const canvas = documents.querySelector(#glCanvas);
  const gl = canvas.getContext("webgl");

  if (gl === null){
    alert ("No hay webgl en tu computadora");
    return;
  }
gl.clearColor(0.0, 0.0, 0.0, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);
}
