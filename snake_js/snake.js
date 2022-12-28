import { SnakePart } from "./snakePart";
import * as THREE from 'three';

export class Snake{
    part_list = [];
    constructor(start_position, size){
        this.size = size
        this.start_position = start_position;
        this.geometry = new THREE.BoxGeometry(1,1,1);
        this.material = new THREE.MeshStandardMaterial({color: 0x23ff0a});
        for(let i = 0; i< size; i++){
            this.part_list.push(new SnakePart(new THREE.Mesh(this.geometry, this.material),new THREE.Vector3( 0, 0, i)));
 
        }
    }

    // adding all parts to the scene
    draw(scene){
        this.part_list.forEach(element => scene.add(element.cube));
    }

    move_forward(){
        // moving from the end of the list because movement direction is dicated by th head
        let head = this.part_list.at(0);

        for (let i = this.part_list.length-1 ; i >= 1; i--){
            let currentElement = this.part_list.at(i);
            let previousElement = this.part_list.at(i-1);
            let prevElementPosition = previousElement.getPosition().clone();
            currentElement.direction = prevElementPosition.sub(currentElement.getPosition());
            currentElement.move('w');
        }

        head.move_forward('w');
    }

    turn(direction){
        this.part_list.at(0).move(direction);
    }

    addPart(scene){
        this.size += 1;

        // set the position of new cube based on direction of movement of last cube
        let prevPartPosition = this.part_list.at(-1).getPosition().clone();
        let prevPartDirection = this.part_list.at(-1).forward.clone();
        // calculate position of new cube by subtracting the direction from previous position (new cube is added on the opposite side)
        let newPartPosition = prevPartPosition.sub(prevPartDirection);
 
        // set new cube position and direction of movement
       
        let newSnakePart = new SnakePart(new THREE.Mesh(new THREE.BoxGeometry(1,1,1)
        , this.material),newPartPosition );
        newSnakePart.forward = prevPartDirection;

        this.part_list.push(newSnakePart);
        this.draw(scene);
    }

}