import { BoxGeometry, MathUtils, Mesh, MeshNormalMaterial } from "three";
import * as dat from "dat.gui";

export class Cube {
  mesh: Mesh;
  gui!: dat.GUI;

  constructor(gui?: dat.GUI) {
    const geometry = new BoxGeometry(3, 3, 3);
    const material = new MeshNormalMaterial();
    this.mesh = new Mesh(geometry, material);
    this.mesh.rotation.y = MathUtils.degToRad(45);
    this.mesh.scale.set(0.3, 0.3, 0.3);
    if (import.meta.env.VITE_ENVIRONMENT == "development" && gui) {
      this.gui = gui;
      this.initGUI();
    }
  }

  initGUI() {
    this.gui.add(this.mesh.position, "y").min(0).max(5).step(1);
  }
}
