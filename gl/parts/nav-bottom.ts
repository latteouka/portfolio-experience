import * as THREE from "three";
import vertex from "../glsl/hero.vert";
import fragment from "../glsl/hero.frag";
import { MyObject3D } from "../webgl/myObject3D";
import { Update } from "../libs/update";
import { Func } from "../core/func";
import { Param } from "../core/param";
import { MousePointer } from "../core/mousePointer";

export class NavBottom extends MyObject3D {
  private _mesh: THREE.Mesh;
  private _width: number;
  private _height: number;
  private _position: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    super();

    const dom = document.querySelector(".nav-bottom")!;
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
  }

  private _updateWidthHeight() {
    const dom = document.querySelector(".nav-bottom")!;
    this._width = dom.getBoundingClientRect().width;
    this._height = dom.getBoundingClientRect().height;
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
    this._mesh.scale.set(this._width, this._height, 1);
    this._mesh.position.set(this._position.x, this._position.y, 0.01);
  }

  protected _update(): void {
    super._update();

    this._updateWidthHeight();
    this._updateMesh();

    const material = this._mesh.material as THREE.ShaderMaterial;
    material.uniforms.u_progress.value = Param.instance.main.progress.value;
    material.uniforms.u_lightPos.value.set(
      MousePointer.instance.x - Func.instance.sw() / 2,
      -MousePointer.instance.y + Func.instance.sh() / 2,
      400
    );
  }

  protected _resize(): void {
    super._resize();

    this._updateWidthHeight();
    this._updateMesh();
  }
}
