import { SnakePart } from "./snakePart";
import * as THREE from 'three';

export class Snake{
    constructor(size=0, start_position=[0,0,0], part_list = []){
        this.size = size;
        this.start_position = start_position;
        this.part_list = part_list;
        // if list not empty set start position of first element to (0,0,0)
        if(part_list.length > 0){
            part_list.at(0).set_position(start_position[0], start_position[1], start_position[2]);
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
            //console.log(this.part_list.at(i).cube.position);
            this.part_list.at(i).set_position(this.part_list.at(i-1).cube.position.x, this.part_list.at(i-1).cube.position.y, this.part_list.at(i-1).cube.position.z);
        }

        head.move(direction);
    }

    addPart(scene){
        let newSnakePart = new SnakePart(this,new THREE.Mesh(new THREE.BoxGeometry(1,1,1)
        , new THREE.MeshStandardMaterial({color: 0x23ffba}) ) )

        this.part_list.push(newSnakePart);
        
        this.draw(scene);
        
        // set the position of new cube
        this.part_list.at(-1).set_position(this.part_list.at(-2).cube.position.x,this.part_list.at(-2).cube.position.y,this.part_list.at(-2).cube.position.z+1)
    }

}