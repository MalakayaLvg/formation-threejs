import {Material, Mesh, MeshStandardMaterial, PlaneGeometry} from "three";


export class Tv{
    mesh: Mesh;
    materiel!: Material;

    constructor() {
        const geometry = new PlaneGeometry(3,1.5);
        this.materiel = new MeshStandardMaterial({
            color: 0x0f0f0f,
        });
        this.mesh = new Mesh(geometry, this.materiel);
        this.mesh.receiveShadow = true;
        this.mesh.position.z = -3;
        this.mesh.position.y = 1;
    }


}