import * as THREE from "three";
import { MyObject3D } from "../webgl/myObject3D";

export class SkillBack extends MyObject3D {
  private _mesh: THREE.Mesh;
  private _width: number;
  private _height: number;
  private _position: { x: number; y: number } = { x: 0, y: 0 };

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
  }

  private _updateWidthHeight() {
    const dom = document.querySelector(".skills-wrap")!;
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
    this._mesh.scale.set(this._width * 1.6, this._height * 1.6, 1);
    this.position.set(this._position.x, this._position.y, -0.01);
  }

  protected _update(): void {
    super._update();

    this._updateWidthHeight();
    this._updateMesh();
  }

  protected _resize(): void {
    super._resize();

    this._updateWidthHeight();
    this._updateMesh();
  }
}
