import { SnakePart } from "./snakePart";
import * as THREE from 'three';

export class Snake{
    constructor(size=0, start_position=new THREE.Vector3( 0, 0, 0 ), part_list = []){
        this.size = part_list.length;
        this.start_position = start_position;
        this.part_list = part_list;
        // if list not empty set start position of first element to (0,0,0)
        if(part_list.length > 0){
            part_list.at(0).setPosition(start_position);
        }
    }

    // adding all parts to the scene
    draw(scene){
        this.part_list.forEach(element => scene.add(element.cube));
    }

    move(direction){
        // moving from the end of the list because movement direction is dicated by th head
        let head = this.part_list.at(0);

        for (let i = this.part_list.length-1 ; i >= 1; i--){
            let currentElement = this.part_list.at(i);
            let previousElement = this.part_list.at(i-1);
            // copy for subtracting (calculating the direction of travel)
            let prevElementPosition = previousElement.getPosition().clone();
            currentElement.direction = prevElementPosition.sub(currentElement.getPosition());

            currentElement.setPosition(previousElement.getPosition());
        }

        head.move(direction);
    }

    addPart(scene){
        let newSnakePart = new SnakePart(this,new THREE.Mesh(new THREE.BoxGeometry(1,1,1)
        , new THREE.MeshStandardMaterial({color: 0x23ffba}) ) )

        this.part_list.push(newSnakePart);
        this.size += 1;

        this.draw(scene);
        
        // set the position of new cube based on direction of movement of last cube
        let prevPartPosition = this.part_list.at(-2).getPosition().clone();
        let prevPartDirection = this.part_list.at(-2).direction.clone();
        // calculate position of new cube by subtracting the direction from previous position (new cube is added on the opposite side)
        let newPartPosition = prevPartPosition.sub(prevPartDirection);

        // set new cube position and direction of movement
        this.part_list.at(-1).setPosition(newPartPosition);
        this.part_list.at(-1).direction = prevPartDirection;
    }

}