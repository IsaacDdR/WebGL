// an attribute will recieve data from the buffer

attribute vec4 a_position;

void(){
  //gl_Position is a special variable a vertex shader
  //is responsible for setting

  gl_Position = a_position;
}
