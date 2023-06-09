import { Func } from "../core/func";
import { Canvas } from "../webgl/canvas";
import { Object3D } from "three/src/core/Object3D";
import { Item } from "./Item";
import { HeroBottom } from "./hero-bottom";
import { NavBottom } from "./nav-bottom";
import { SkillImage } from "./skillImage";
import { SkillBack } from "./skillBack";

export class Visual extends Canvas {
  private _con: Object3D;

  constructor(opt: any) {
    super(opt);

    this._con = new Object3D();
    this.mainScene.add(this._con);

    const item = new Item();
    const hero = new HeroBottom();
    const skillBack = new SkillBack();
    const nav = new NavBottom();
    const skillImage = new SkillImage();

    this._con.add(item, hero, nav, skillImage, skillBack);

    this._resize();
  }

  protected _update(): void {
    super._update();

    this._render();
  }

  private _render(): void {
    this.renderer.setClearColor("#000", 1);
    this.renderer.render(this.mainScene, this.cameraPers);
  }

  _resize(): void {
    super._resize();

    const w = Func.instance.sw();
    const h = Func.instance.sh();

    this.renderSize.width = w;
    this.renderSize.height = h;

    this._updateOrthCamera(this.cameraOrth, w, h);

    this.cameraPers.fov = 90;
    this._updatePersCamera(this.cameraPers, w, h);

    let pixelRatio: number = window.devicePixelRatio || 1;
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(w, h);
    this.renderer.clear();
  }
}
