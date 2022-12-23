import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Loop } from './loop.js';
import { Snake } from '../snake_js/snake.js';
import { Box } from '../snake_js/box.js';
import { Fruit } from '../snake_js/fruit';

export class World{
    #camera;
    #renderer;
    #scene;
    #loop;
    #controls;
    snake;
    fruits = [];
    box;
    interval=30;

    constructor(container){
        this.#camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
        this.#renderer = new THREE.WebGLRenderer({canvas: container});
        this.#scene = new THREE.Scene();
        this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);

        this.#loop = new Loop(this.#camera, this.#scene, this.#renderer, this.#controls, this);

        this.#renderer.setPixelRatio(window.devicePixelRatio);
        this.#renderer.setSize(window.innerWidth, window.innerHeight);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.#scene.add(ambientLight);

        this.#camera.position.setZ(30);


        this.snake = new Snake(new THREE.Vector3( 0, 0, 0 ),4);


        this.box = new Box(20);
        this.box.draw(this.#scene);
        this.snake.draw(this.#scene);

        this.fruits.push(new Fruit(new THREE.Vector3( 0, 0, -4 )));


        document.addEventListener('keydown', (e) => {
            if(e.key === 'w'){
              this.snake.move_forward();
            }else if(e.key === ' '){
              this.snake.addPart(this.#scene);
            }else if(e.key === 'a' || e.key === 'd' || e.key === 's'){
              this.snake.turn(e.key);
            }else if(e.key === 'p'){
              this.interval -= 1;
              console.log(this.interval)
            }
        });

        
    }
    checkForCollisionsWithFruits(){        
        for(let i =0; i< this.fruits.length; i++){
            if(this.fruits.at(i).getPosition().equals(this.snake.part_list.at(0).getPosition())){
                //remove fruit
                this.snake.addPart(this.#scene);
                this.#scene.remove(this.fruits.at(i).cube);
                this.fruits.splice(i,1);

                //speed the game up
                if(this.snake.size % 5 == 0){
                    this.interval -= 1;
                }

                // place new fruit
                // ranodmize coords until valid:
                while(true){
                    const max = this.box.size/2;
                    const min = -this.box.size/2;

                    let x = Math.floor(Math.random() * (max-min) + min);
                    //let y =  Math.floor(Math.random() * (max-min) + min);
                    let z = Math.floor(Math.random() * (max-min) + min);
                    let y = 0;

                    const fruit_position = new THREE.Vector3(x,y,z);
                    //check if valid
                    let is_valid = true;
                    this.snake.part_list.forEach(part => {
                        if(fruit_position.equals(part.getPosition())){
                            is_valid = false;
                        }
                    })
                    if(is_valid){
                        this.fruits.push(new Fruit(fruit_position));
                        this.fruits.at(-1).draw(this.#scene);
                        break;
                    }
                }
            }
        }

    }

    checkForSnakeCollisions(){
        //check if snake outside the box
        const head = this.snake.part_list.at(0);
        if(Math.abs(head.getPosition().x) > this.box.size/2
         || Math.abs(head.getPosition().y) > this.box.size/2
         || Math.abs(head.getPosition().z) > this.box.size/2
        ){
            this.stop();
        }

        //check if snake eats itself

        this.snake.part_list.slice(1).forEach(part => {
            if(part.getPosition().equals(head.getPosition())){
                this.stop();
            }
        })
    }

    render(){
        this.#renderer.render();
    }
    start(){
        this.#loop.start();
        console.log(this.interval)
    }
    stop(){
        this.#loop.stop()
    }
}