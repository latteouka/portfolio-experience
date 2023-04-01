import * as THREE from "three";
import { MyObject3D } from "../webgl/myObject3D";
import { Param } from "../core/param";

export class SkillBack extends MyObject3D {
  private _mesh: THREE.Mesh;
  private _width: number;
  private _height: number;
  private _position: { x: number; y: number } = { x: 0, y: 0 };
  oriY: number = 0;

  constructor() {
    super();

    const dom = document.querySelector(".skills-wrap")!;
    this._width = dom.getBoundingClientRect().width;
    this._height = dom.getBoundingClientRect().height;
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xf5f5f5,
    });

    this._mesh = new THREE.Mesh(geometry, material);
    this.add(this._mesh);

    Param.instance.main.skillBack.value = this;

    this._updateWidthHeight();
  }

  private _updateWidthHeight() {
    const dom = document.querySelector(".skills-wrap")!;
    const { width, height, y } = dom.getBoundingClientRect();
    this.scale.set(this._width * 1.01, this._height * 3, 1);
    this._width = width;
    this._height = height;
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
    this.position.set(this._position.x, this._position.y, 0.01);

    this.oriY = window.innerHeight / 2 - this._height / 2 - y - window.scrollY;
  }

  protected _update(): void {
    super._update();
  }

  protected _resize(): void {
    super._resize();

    this._updateWidthHeight();
  }
}
