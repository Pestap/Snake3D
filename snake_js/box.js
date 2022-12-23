import * as THREE from 'three';

export class Box{
    constructor(size, middle_position = new THREE.Vector3(0,0,0)){
        const half = size/2 + 0.5;
        this.points = [];
        // maybe find better way later
        this.points.push(new THREE.Vector3(half, half, -half));
        this.points.push(new THREE.Vector3(half, half, half));
        this.points.push(new THREE.Vector3(-half, half, half));
        this.points.push(new THREE.Vector3(-half, half, -half));
        this.points.push(new THREE.Vector3(half, half, -half));
        this.points.push(new THREE.Vector3(half, -half, -half));
        this.points.push(new THREE.Vector3(half, -half, half));
        this.points.push(new THREE.Vector3(-half, -half, half));
        this.points.push(new THREE.Vector3(-half, -half, -half));
        this.points.push(new THREE.Vector3(half, -half, -half));
        this.points.push(new THREE.Vector3(-half, -half, -half));
        this.points.push(new THREE.Vector3(-half, half, -half));
        this.points.push(new THREE.Vector3(-half, half, half));
        this.points.push(new THREE.Vector3(-half, -half, half));
        this.points.push(new THREE.Vector3(half, -half, half));
        this.points.push(new THREE.Vector3(half, half, half));
    }

    draw(scene){
        const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        const line = new THREE.Line( geometry, material );
        scene.add(line);
    }



}