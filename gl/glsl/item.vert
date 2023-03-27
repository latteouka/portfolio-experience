uniform float uTime;
uniform float u_progress;
uniform vec4 u_resolution;

varying vec3 vPos;
varying vec2 vUv;

void main(){
  vPos = position;
  vUv = uv;

  float direction = 0.0;
  vec3 pos = position;
        
  float distance = length(uv - vec2(0.5));
  float maxdist = length(vec2(0.5));
  float normalizeDistance = distance / maxdist;
  
  float stickEffectIn = normalizeDistance;
  float stickEffectOut = -normalizeDistance;
  float stickEffect = mix(stickEffectIn, stickEffectOut, direction);
  
  float backForthProgress = min(2.0 * u_progress, 2.0 * (1.0 - u_progress));
  
  float zDistance = 0.0;
  float zProgress = mix(clamp(2.0 * u_progress, 0.0, 1.0), clamp(1.0 - 2.0 * (1.0 - u_progress), 0.0, 1.0), direction);
  
  pos.z += zDistance * (stickEffect * backForthProgress - zProgress);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
