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
        this.#camera.position.setZ(30);
        this.#renderer = new THREE.WebGLRenderer({canvas: container});
        this.#renderer.setPixelRatio(window.devicePixelRatio);
        this.#renderer.setSize(window.innerWidth, window.innerHeight);

        this.#scene = new THREE.Scene();
        this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);

        this.#loop = new Loop(this.#camera, this.#scene, this.#renderer, this.#controls, this);




        document.addEventListener('keydown', (e) => {
            if(e.key === ' '){
              this.snake.addPart(this.#scene);
            }else if(e.key === 'a' || e.key === 'd'){
              this.snake.turn(e.key);
            }else if(e.key === 'p'){
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
                if(this.snake.size % 1 == 0){
                    this.interval -= 1;
                }
                
                // update score
                let score_span = document.getElementById('score');
                score_span.textContent = this.snake.size;

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
            this.restart();
        }

        //check if snake eats itself

        this.snake.part_list.slice(1).forEach(part => {
            if(part.getPosition().equals(head.getPosition())){
                this.restart();
            }
        })
    }

    render(){
        this.#renderer.render();
    }
    start(){
        // initialize game
        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.#scene.add(ambientLight);

        this.snake = new Snake(new THREE.Vector3( 0, 0, 0 ),1);

        // initialize UI
        let score_span = document.getElementById('score');
        score_span.innerText = this.snake.size;

        this.box = new Box(20);
        this.box.draw(this.#scene);
        this.snake.draw(this.#scene);


        this.fruits.push(new Fruit(new THREE.Vector3( 0, 0, -4 )));



        this.#loop.start();
    }

    restart(){
        this.interval = 30;
        const iterations = this.#scene.children.length;
        for(let i =0; i<iterations; i++){
            this.#scene.remove(this.#scene.children.at(0));
        }

        this.fruits = [];
        this.start()
    }

    stop(){
        //deinitailize game
        this.#loop.stop()
    }
}