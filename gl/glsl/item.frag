uniform float u_Time;
uniform sampler2D u_texture;
uniform vec4 u_resolution;
uniform vec2 u_mouse;

varying vec3 vPos;
varying vec2 vUv;

vec3 greyscale(vec3 color, float str) {
    float g = dot(color, vec3(0.299, 0.587, 0.114));
    return mix(color, vec3(g), str);
}

void main(void) {
  vec2 newUv = (vUv - vec2(0.5)) * u_resolution.zw + vec2(0.5);
  vec2 mouse = (u_mouse - vec2(0.5)) * u_resolution.zw + vec2(0.5);

  float mouseDistance = length(newUv - mouse);
  // radius
  float smoothMouse = smoothstep(0.2, 0.0, mouseDistance);

  vec4 color = texture2D(u_texture, newUv);

  vec3 grey = greyscale(color.rgb, 1.0);

  vec3 mixColor = mix(grey, color.rgb, smoothMouse);

  gl_FragColor = vec4(mixColor, 1.0);
}
