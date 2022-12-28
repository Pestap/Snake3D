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
            // rotate 'up'
            let temp_f = this.forward.clone();
            this.forward = this.up.clone();
            this.up = temp_f.negate();
        }else if(direction === 's'){
            //rotate 'down'
            let temp_u = this.up.clone();
            this.up = this.forward.clone();
            this.forward = temp_u.negate();
        }else if(direction === 'a'){
            //rotate 'left'
            let temp_r = this.right.clone();
            this.right = this.forward.clone();
            this.forward = temp_r.negate();
            this.forward = new THREE.Vector3(this.forward.z, 0,-this.forward.x);
        }else if(direction === 'd'){
            // rotate 'right'
            let temp_f = this.forward.clone();
            this.forward = this.right.clone();
            this.right = temp_f.negate();
        }
    }

    move_forward(){
        this.cube.position.add(this.forward);
    }

    setPosition(vector){
        this.cube.position.set(vector.x, vector.y, vector.z);   
    }

    getPosition(){
        return this.cube.position;
    }

}