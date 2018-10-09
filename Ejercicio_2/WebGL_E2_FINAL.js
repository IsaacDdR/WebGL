main();

  function main() {
    const canvas = document.querySelector("#glCanvas");

    const gl = canvas.getContext('webgl');

    if (gl == null){
      alert('Unable to connect');
      return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  const vsSource =

    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    };

  const fsSource =
   void main() {
     gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
   };

   const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

   const programInfo = {
     program: shaderProgram,
     attribLocations: {
       vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
     },
     uniformLocations: {
       projectionMatrix: gl.getUniformLocation(shaderProgram, 'uShaderProgram'),
       modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
     }
   }

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

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      alert('Ocurrio un error fatal: 'gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }


  function initBuffers(gl){

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
      -1.0, 1.0,
       1.0, -1.0,
      -1.0, 1.0,
       1.0, 1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions),
                  gl.STATUS_DRAW);
    return{
      positon: positionBuffer,
    };
  }

  function drawScene(gl, programInfo, buffers){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT |  gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI/ 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix,
                    fieldOfView,
                    aspect,
                    zNear,
                    zFar);
    const modelViewMatrix = mat4.create();

    mat4.translate(modelViewMatrix,
                    modelViewMatrix,
                  [-0.0, 0.0, -6.0]);


    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const noramlize = false;
      const stride = 0;

      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
    }

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArray(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }
