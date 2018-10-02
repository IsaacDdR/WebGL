const vsSource =
  attribute vec4 aVertexPosition;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
;
const fsSource =
 void main() {
   gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
 }
;
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loaderShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loaderShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, framentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
    alert('No se puede inicializar el programa' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  //Send the source to the shader object

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  if (!gl.gerShaderParameter(shader, gl.COMPILE_STATUS)){
    alert('Ocurrio un error fatal: 'gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
  return shader;
}
