import {GLTFLoader} from "three/examples/jsm/Addons.js";
import {Mesh, MeshStandardMaterial, Object3D} from "three";

export class Rhino{
    mesh = new Object3D;

    constructor() {
        this.init();
        this.update();
    }

    async init(){
        const gltfLoader = new GLTFLoader();
        const gltf = await gltfLoader.loadAsync('./models/rhino.glb');

        const material = new MeshStandardMaterial({
            color: 0x000000,
            metalness: 1,
        });

        gltf.scene.traverse((child) => {
            if (child instanceof Mesh) {
                child.material = material;
            }
        })
        this.mesh.castShadow = true;



        this.mesh.add(gltf.scene);
    }

    update(){
        this.mesh.scale.set(0.04,0.04,0.04);
        this.mesh.position.y = 0.5;
    }
}