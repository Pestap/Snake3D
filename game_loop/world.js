import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Loop } from './loop.js';
import { Snake } from '../snake_js/snake.js';
import { Box } from '../snake_js/box.js';


export class World{
    #camera;
    #renderer;
    #scene;
    #loop;
    #controls;
    snake;
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


        this.snake = new Snake(new THREE.Vector3( 0, 0, 0 ),4,20);


        this.box = new Box(20);
        this.box.draw(this.#scene);
        this.snake.draw(this.#scene);

        document.addEventListener('keydown', (e) => {
            if(e.key === 'w'){
              this.snake.move_forward();
            }else if(e.key === ' '){
              this.snake.addPart(scene);
            }else if(e.key === 'a' || e.key === 'd' || e.key === 's'){
              this.snake.turn(e.key);
            }else if(e.key === 'p'){
              this.interval -= 1;
              console.log(this.interval)
            }
        });

        
    }
    checkForCollisions(){

        
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