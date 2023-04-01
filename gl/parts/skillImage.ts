import * as THREE from "three";
import vertex from "../glsl/image.vert";
import fragment from "../glsl/image.frag";
import { MyObject3D } from "../webgl/myObject3D";
import { Update } from "../libs/update";
import { Param } from "../core/param";
import { MousePointer } from "../core/mousePointer";

export class SkillImage extends MyObject3D {
  private _mesh: THREE.Mesh;
  private _width: number;
  private _height: number;
  private _position: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    super();

    const dom = document.querySelector(".skills-content-image")!;
    this._width = dom.getBoundingClientRect().width;
    this._height = dom.getBoundingClientRect().height;
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        u_progress: {
          value: 0,
        },
        u_mouse: {
          value: new THREE.Vector2(),
        },
        u_texture: {
          value: Param.instance.main.texture.value,
        },
        u_alpha: {
          value: Param.instance.main.skillAlpha.value,
        },
        u_velX: {
          value: MousePointer.instance.velocityAlways.x,
        },
        u_velY: {
          value: MousePointer.instance.velocityAlways.y,
        },
        u_radius: {
          value: 0.5,
        },
        u_spikes: {
          value: 1.5,
        },
      },
    });

    this._mesh = new THREE.Mesh(geometry, material);
    this.add(this._mesh);
  }

  private _updateWidthHeight() {
    const dom = document.querySelector(".skills-content-image")!;
    this._width = dom.getBoundingClientRect().width;
    this._height = dom.getBoundingClientRect().height;
    // calculate position from dom position(center point)
    this._position = {
      x:
        -window.innerWidth / 2 +
        this._width / 2 +
        dom.getBoundingClientRect().x,

      y:
        window.innerHeight / 2 -
        this._height / 2 -
        dom.getBoundingClientRect().y,
    };
  }

  private _updateMesh() {
    this._mesh.scale.set(this._width * 2, this._height * 2, 1);
    this._mesh.position.set(this._position.x, this._position.y, 0.01);
  }

  protected _update(): void {
    super._update();

    this._updateWidthHeight();
    this._updateMesh();

    const material = this._mesh.material as THREE.ShaderMaterial;
    material.uniforms.u_texture.value = Param.instance.main.texture.value;
    material.uniforms.u_velX.value = MousePointer.instance.velocityAlways.x;
    material.uniforms.u_velY.value = MousePointer.instance.velocityAlways.y;
    material.uniforms.u_time.value = Update.instance.elapsed;
    material.uniforms.u_alpha.value = Param.instance.main.skillAlpha.value;
  }

  protected _resize(): void {
    super._resize();

    this._updateWidthHeight();
    this._updateMesh();
  }
}
