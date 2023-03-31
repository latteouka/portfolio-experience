import * as THREE from "three";
import vertex from "../glsl/item.vert";
import fragment from "../glsl/item.frag";
import { MyObject3D } from "../webgl/myObject3D";
import { Update } from "../libs/update";
import { Func } from "../core/func";
import { TexLoader } from "../webgl/texLoader";
import { Param } from "../core/param";
import { MousePointer } from "../core/mousePointer";

export class Item extends MyObject3D {
  private _mesh: THREE.Mesh;

  constructor() {
    super();

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
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        u_Time: { value: Update.instance.cnt },
        u_texture: {
          value: TexLoader.instance.get("/img/latte.webp"),
        },
        u_resolution: {
          value: new THREE.Vector4(width, height, a1, a2),
        },
        u_progress: {
          value: 0,
        },
        u_mouse: {
          value: new THREE.Vector2(0, 0),
        },
      },
    });

    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.scale.set(Func.instance.sw(), Func.instance.sh(), 1);
    this.add(this._mesh);
  }

  protected _update(): void {
    super._update();

    const material = this._mesh.material as THREE.ShaderMaterial;
    material.uniforms.u_progress.value = Param.instance.main.progress.value;

    material.uniforms.u_mouse.value.set(
      (MousePointer.instance.normal.x + 1) / 2,
      (-MousePointer.instance.normal.y + 1) / 2
    );
  }

  protected _resize(): void {
    super._resize();
    this._mesh.scale.set(Func.instance.sw(), Func.instance.sh(), 1);

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
    const material = this._mesh.material as THREE.ShaderMaterial;
    material.uniforms.u_resolution.value.set(width, height, a1, a2);
  }
}
