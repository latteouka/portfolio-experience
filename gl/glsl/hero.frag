#pragma glslify: noise = require(./snoise2d.glsl)

uniform float u_Time;
uniform sampler2D u_texture;
uniform vec4 u_resolution;
uniform vec3 u_color;
uniform vec3 u_lightColor;

varying vec3 vPos;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vSurfaceToLight;

vec3 light_reflection(vec3 lightColor) {
  vec3 ambient = lightColor;
  vec3 diffuse = lightColor * dot(vSurfaceToLight, vNormal);

  return (ambient + diffuse);
}

void main(void) {
  vec2 uv = gl_FragCoord.xy / 3.0;

  vec3 light_value = light_reflection(u_lightColor);
  vec3 noiseColors = vec3(noise(uv) * 0.5 + 0.5);

  light_value *= 0.5;
  noiseColors *= pow(light_value.r, 5.0);

  gl_FragColor.r = max(noiseColors.r, u_color.r);
  gl_FragColor.g = max(noiseColors.g, u_color.g);
  gl_FragColor.b = max(noiseColors.b, u_color.b);
  gl_FragColor.a = 1.0;
}
