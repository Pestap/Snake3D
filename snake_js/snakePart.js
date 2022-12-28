import * as THREE from 'three';

export class SnakePart{
    constructor(cube, position){
        this.cube = cube;
        this.setPosition(position);
        this.forward = new THREE.Vector3(0,0,-1) // forward direction
        this.up = new THREE.Vector3(0,1,0);
        this.right = new THREE.Vector3(1,0,0);
    }

    draw(scene){
        scene.add(this.cube);
    }

    move(direction){
        if(direction === 'w'){
            this.cube.position.add(this.forward);
        }else if(direction === 'a'){
            this.forward = new THREE.Vector3(this.forward.z, 0,-this.forward.x);
        }else if(direction === 'd'){
            this.forward = new THREE.Vector3(-this.forward.z, 0,this.forward.x);
        }
    }

    setPosition(vector){
        this.cube.position.set(vector.x, vector.y, vector.z);   
    }

    getPosition(){
        return this.cube.position;
    }

}