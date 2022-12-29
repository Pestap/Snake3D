import { SnakePart } from "./snakePart";
import * as THREE from 'three';
import { Vector3 } from "three";

export class Snake{
    part_list = [];
    eyes = [];
    constructor(start_position, size){
        this.size = size
        this.start_position = start_position;
        this.geometry = new THREE.BoxGeometry(1,1,1);
        this.material = new THREE.MeshStandardMaterial({color: 0x23ff0a});
        for(let i = 0; i< size; i++){
            this.part_list.push(new SnakePart(new THREE.Mesh(this.geometry, this.material),new THREE.Vector3( 0, 0, i)));
 
        }

        const eye_geometry = new THREE.SphereGeometry(0.3);
        const eye_material = new THREE.MeshBasicMaterial( { color: 0x0000ff} );
        const left_eye = new THREE.Mesh( eye_geometry,eye_material );
        const right_eye = new THREE.Mesh( eye_geometry, eye_material );

        this.eyes.push(left_eye);
        this.eyes.push(right_eye);

    }

    // adding all parts to the scene
    draw(scene){
        // draw parts
        this.part_list.forEach(element => scene.add(element.cube));
        // draw eyes
        this.eyes.forEach(eye => scene.add(eye));
    }

    move_forward(){
        // moving from the end of the list because movement direction is dicated by th head
        let head = this.part_list.at(0);

        for (let i = this.part_list.length-1 ; i >= 1; i--){
            let currentElement = this.part_list.at(i);
            let previousElement = this.part_list.at(i-1);
            let prevElementPosition = previousElement.getPosition().clone();
            currentElement.forward = prevElementPosition.sub(currentElement.getPosition());
            currentElement.move_forward();
        }

        head.move_forward();
        
        // set eyes position
        let left_eye = this.eyes.at(0);
        let left_eye_position = new Vector3(head.getPosition().clone().x, head.getPosition().clone().y, head.getPosition().clone().z); 

        left_eye.position.set(left_eye_position.x,left_eye_position.y,left_eye_position.z);
        left_eye.position.add(head.up.clone().multiplyScalar(0.5));
        left_eye.position.add(head.right.clone().negate().multiplyScalar(0.5));
        left_eye.position.add(head.forward.clone().multiplyScalar(0.5));

        let right_eye = this.eyes.at(1);
        let right_eye_position = new Vector3(head.getPosition().clone().x, head.getPosition().clone().y, head.getPosition().clone().z); 

        right_eye.position.set(right_eye_position.x,right_eye_position.y,right_eye_position.z);
        right_eye.position.add(head.up.clone().multiplyScalar(0.5));
        right_eye.position.add(head.right.clone().multiplyScalar(0.5));
        right_eye.position.add(head.forward.clone().multiplyScalar(0.5));


    }

    turn(direction){
        this.part_list.at(0).move(direction);
    }

    addPart(scene){
        this.size += 1;

        // set the position of new cube based on direction of movement of last cube
        let prevPartPosition = this.part_list.at(-1).getPosition().clone();
        let prevPartForward = this.part_list.at(-1).forward.clone();
        let prevPartUp = this.part_list.at(-1).up.clone();
        let prevPartRight = this.part_list.at(-1).right.clone();
        // calculate position of new cube by subtracting the direction from previous position (new cube is added on the opposite side)
        let newPartPosition = prevPartPosition.sub(prevPartForward);
 
        // set new cube position and direction of movement
       
        let newSnakePart = new SnakePart(new THREE.Mesh(new THREE.BoxGeometry(1,1,1)
        , this.material),newPartPosition );
        newSnakePart.forward = prevPartForward;
        newSnakePart.up = prevPartUp;
        newSnakePart.right = prevPartRight;

        this.part_list.push(newSnakePart);
        this.draw(scene);
    }

}