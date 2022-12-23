import * as THREE from 'three';

export class SnakePart{
    constructor(cube, position){
        this.cube = cube;
        this.setPosition(position);
        this.direction = new THREE.Vector3(0,0,-1) // start heading
    }

    draw(scene){
        scene.add(this.cube);
    }

    move(direction){
        if(direction === 'w'){
            this.cube.position.add(this.direction);
        }else if(direction === 'a'){
            this.direction = new THREE.Vector3(this.direction.z, 0,-this.direction.x);
        }else if(direction === 'd'){
            this.direction = new THREE.Vector3(-this.direction.z, 0,this.direction.x);
        }
    }

    setPosition(vector){
        this.cube.position.set(vector.x, vector.y, vector.z);   
    }

    getPosition(){
        return this.cube.position;
    }

}