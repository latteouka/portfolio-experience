uniform float u_time;
uniform float u_progress;
uniform vec4 u_resolution;

uniform float u_velX;
uniform float u_velY;

varying vec3 vPos;
varying vec2 vUv;

const float PI = 3.1415926535897932384626433832795;

void main(){
  vPos = position;
  vUv = uv;

  vec3 pos = position;
  pos /= 1. + sin(u_time) * 0.075;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0 );
}
