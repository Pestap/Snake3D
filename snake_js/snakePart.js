import * as THREE from 'three';

export class SnakePart{
    constructor(snake, cube){
        this.snake = snake;
        this.cube = cube;
        this.direction = new THREE.Vector3(0,0,-1) // start heading
    }

    draw(scene){
        scene.add(this.cube);
    }

    move(direction){
        console.log(direction)
        if(direction === 'w'){
            this.cube.position.add(new THREE.Vector3( 0, 0, -1 ));
            this.direction = new THREE.Vector3( 0, 0, -1 );
        }else if(direction === 's'){
            this.cube.position.add(new THREE.Vector3( 0, 0, 1 ));
            this.direction = new THREE.Vector3( 0, 0, 1 );
        }else if(direction === 'a'){
            this.cube.position.add(new THREE.Vector3( -1, 0,0 ));
            this.direction = new THREE.Vector3( -1, 0, 0 );
        }else if(direction === 'd'){
            this.cube.position.add(new THREE.Vector3( 1, 0, 0 ));
            this.direction = new THREE.Vector3( 1, 0, 0 )
        }
    }

    setPosition(vector){
        
        this.cube.position.set(vector.x, vector.y, vector.z);   
    }

    getPosition(){
        return this.cube.position;
    }

}