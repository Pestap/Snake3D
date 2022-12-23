import * as THREE from 'three';

export class Fruit{
    constructor(position){
        this.geometry = new THREE.BoxGeometry(1,1,1);
        this.material = new THREE.MeshStandardMaterial({color: 0xfc0303});
        this.cube = new THREE.Mesh(this.geometry, this.material)
        this.setPosition(position);
    }

    draw(scene){
        scene.add(this.cube);
    }

    getPosition(){
        return this.cube.position;
    }

    setPosition(vector){
        this.cube.position.set(vector.x, vector.y, vector.z);   
    }


}