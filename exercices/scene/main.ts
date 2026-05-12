import "@/style.css";
import "./style.css";
import {
  AmbientLight,
  AxesHelper,
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  GridHelper,
  PCFShadowMap,
  PerspectiveCamera,
  Scene, SpotLight,
  WebGLRenderer,
} from "three";
import { Cube } from "./Cube";
import * as dat from "dat.gui";
import { Ground } from "./Ground";
import { Tv } from "./tv.ts";

class App {
  canvas: HTMLCanvasElement;
  renderer!: WebGLRenderer;
  camera!: PerspectiveCamera;
  scene!: Scene;
  cube!: Cube;
  ground!: Ground;
  tv!: Tv;
  gui!: dat.GUI;

  constructor(canvas: HTMLCanvasElement) {
    this.animate = this.animate.bind(this);
    this.canvas = canvas;
    this.initRenderer();
    this.initCamera();
    this.initScene();
    if (import.meta.env.VITE_ENVIRONMENT == "development") {
      this.initHelpers();
      this.initGUI();
    }
    this.initLights();
    this.initObjects();
    this.animate();
  }

  initRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      // alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFShadowMap;
  }

  initCamera() {
    this.camera = new PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      200,
    );
    this.camera.position.set(0, 2, 10);
  }

  initScene() {
    this.scene = new Scene();
  }

  initHelpers() {
    const cameraHelper = new CameraHelper(this.camera);
    this.scene.add(cameraHelper);
    const gridHelper = new GridHelper(10, 10);
    this.scene.add(gridHelper);
    const axesHelper = new AxesHelper(3);
    this.scene.add(axesHelper);
  }

  initLights() {
    console.log("initLights");
    const ambient = new AmbientLight(0xffffff, 1);
    this.scene.add(ambient);

    const dirLight = new DirectionalLight(0xffffff, 3);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    this.scene.add(dirLight);
    const helper = new DirectionalLightHelper(dirLight, 5);
    this.scene.add(helper);

    const spot = new SpotLight();
    this.scene.add(spot);
  }

  initObjects() {
    this.cube = new Cube(this.gui);
    this.scene.add(this.cube.mesh);
    this.ground = new Ground(this.gui);
    this.scene.add(this.ground.mesh);
    this.tv = new Tv();
    this.scene.add(this.tv.mesh);
    const cube2 = new Cube();
    const cube3 = new Cube();
    const cube4 = new Cube();
    const cube5 = new Cube();
    cube2.mesh.position.set(3,0.3,2);
    cube3.mesh.position.set(5,0.3,1);
    cube4.mesh.position.set(-3,0.3,-5);
    cube5.mesh.position.set(3.5,0.3,-2);
    this.scene.add(cube2.mesh, cube3.mesh, cube4.mesh, cube5.mesh);

  }

  initGUI() {
    this.gui = new dat.GUI();
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  new App(canvas);
});
