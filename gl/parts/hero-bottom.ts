import * as THREE from "three";
import vertex from "../glsl/hero.vert";
import fragment from "../glsl/hero.frag";
import { MyObject3D } from "../webgl/myObject3D";
import { Func } from "../core/func";
import { Param } from "../core/param";
import { MousePointer } from "../core/mousePointer";
import { lerp } from "three/src/math/MathUtils";

export class HeroBottom extends MyObject3D {
  private _mesh: THREE.Mesh;
  private _width: number;
  private _height: number;
  private _position: { x: number; y: number } = { x: 0, y: 0 };
  private _resolution: THREE.Vector4 = new THREE.Vector4();
  private _scale: THREE.Vector2 = new THREE.Vector2();
  oriY: number = 0;

  constructor() {
    super();

    const dom = document.querySelector(".hero-bottom-left")!;
    this._width = dom.getBoundingClientRect().width;
    this._height = dom.getBoundingClientRect().height;
    // height / width
    const imageAspect = 853 / 1280;
    const width = Func.instance.sw();
    const height = Func.instance.sh();
    let a1, a2;
    if (height / width > imageAspect) {
      a1 = (width / height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = height / width / imageAspect;
    }

    this._scale.set(this._width, this._height);
    this._resolution.set(width, height, a1, a2);

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        u_resolution: {
          value: new THREE.Vector4(width, height, a1, a2),
        },
        u_progress: {
          value: 0,
        },
        u_mouse: {
          value: new THREE.Vector2(),
        },
        u_lightPos: {
          value: new THREE.Vector3(0, 50, 200),
        },
        u_lightColor: {
          value: new THREE.Color(0xffffff),
        },
        u_color: {
          value: new THREE.Color(0x000000),
        },
        u_lightIntensity: {
          value: 1,
        },
      },
    });

    this._mesh = new THREE.Mesh(geometry, material);
    this.add(this._mesh);

    Param.instance.main.hero.value = this;

    this._updateWidthHeight();
  }

  private _updateWidthHeight() {
    const dom = document.querySelector(".hero-bottom-left")!;
    const { x, y } = dom.getBoundingClientRect();

    // calculate position from dom position(center point)
    this._position = {
      x: -window.innerWidth / 2 + this._width / 2 + x,

      y: window.innerHeight / 2 - this._height / 2 - y,
    };
    this.position.set(this._position.x, this._position.y, 0.01);

    this.oriY = window.innerHeight / 2 - this._height / 2 - y - window.scrollY;
  }

  protected _update(): void {
    super._update();

    const material = this._mesh.material as THREE.ShaderMaterial;
    material.uniforms.u_progress.value = Param.instance.main.progress.value;
    material.uniforms.u_lightPos.value.set(
      MousePointer.instance.x - Func.instance.sw() / 2,
      -MousePointer.instance.y + Func.instance.sh() / 2,
      400
    );
    material.uniforms.u_resolution.value.lerp(this._resolution, 0.05);

    this._width = lerp(this._width, this._scale.x, 0.05);
    this._height = lerp(this._height, this._scale.y, 0.05);
    this.scale.set(this._width, this._height, 1);
  }

  protected _resize(): void {
    super._resize();

    this._updateWidthHeight();

    const imageAspect = 853 / 1280;
    const width = Func.instance.sw();
    const height = Func.instance.sh();
    let a1, a2;
    if (height / width > imageAspect) {
      a1 = (width / height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = height / width / imageAspect;
    }
    const dom = document.querySelector(".hero-bottom-left")!;
    this._scale.set(
      dom.getBoundingClientRect().width,
      dom.getBoundingClientRect().height
    );
    this._resolution.set(width, height, a1, a2);
  }
}
