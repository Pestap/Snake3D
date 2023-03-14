import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls';
import { Loop } from './loop.js';
import { Snake } from '../snake_js/snake.js';
import { Box } from '../snake_js/box.js';
import { Fruit } from '../snake_js/fruit';
import { UI } from './ui.js';

export class World{
    #camera;
    #renderer;
    #scene;
    #loop;
    #controls;
    snake;
    fruits = [];
    box;
    ui;
    interval=30;
    helpers = {
        'x_positive' : null,
        'x_negative' : null,
        'y_positive' : null,
        'y_negative' : null,
        'z_positive' : null,
        'z_negtive' : null
    }

    constructor(container){
        this.#camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
        this.#camera.position.setZ(40);
        this.#camera.position.setY(30);
        this.#renderer = new THREE.WebGLRenderer({canvas: container});
        this.#renderer.setPixelRatio(window.devicePixelRatio);
        this.#renderer.setSize(window.innerWidth, window.innerHeight);

        this.#scene = new THREE.Scene();
        this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);
        this.#controls.enableDamping = true;
        this.#controls.enablePan = false;
        this.#controls.noPan = true;
        this.#loop = new Loop(this.#camera, this.#scene, this.#renderer, this.#controls, this);
        this.ui = new UI();

        // key mapping
        document.addEventListener('keypress', (e) => {
            if(e.key === 'b'){
                this.rotate_camera_behind();
            }else if(e.key === 'a' || e.key === 'd' || e.key === 'w' || e.key === 's' || e.key === 'q' || e.key === 'e'){
              this.snake.turn(e.key);
            }else if(e.key === 'p'){
              this.#camera.position.lerp(new THREE.Vector3(100,100,100), 0.1);
            }else if(e.key === 'z'){
                this.fruits.at(0).draw_helper(this.#scene, 'x', 50);
            }else if(e.key === 'x'){
                this.fruits.at(0).draw_helper(this.#scene, 'y', 50);
            }else if(e.key === 'c'){
                this.fruits.at(0).draw_helper(this.#scene, 'z', 50);
            }else if(e.key == ' '){
                if(this.ui.startInfoDisplayed){
                    this.ui.removeStartInfo();
                    this.#loop.start();
                }else{
                    this.#loop.toggle();
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key === 'z'){
                this.fruits.at(0).remove_helper(this.#scene, 'x');
            }else if(e.key === 'x'){
                this.fruits.at(0).remove_helper(this.#scene, 'y');
            }if(e.key === 'c'){
                this.fruits.at(0).remove_helper(this.#scene, 'z');
            }
        });

        //resizing window
        window.addEventListener('resize', (e) => {
            let width = window.innerWidth;
            let height = window.innerHeight;
            this.#renderer.setSize(width, height);
            this.#camera.aspect = width/height;
            this.#camera.updateProjectionMatrix();
            //this.#controls.handleResize(); // only for trackball controls
        } )
        

        // initialize wall helpers


        
    }

    rotate_camera_behind(){
        // TODO: Rotate around current position by given angle (depending on movment direction)
        // holding space bar allows to reset camera to behind
        let snake_head_position = this.snake.part_list.at(0).getPosition().clone();
        let camera_x = snake_head_position.x;
        let camera_y = snake_head_position.y;
        let camera_z = snake_head_position.z;

        let new_camera_position = new THREE.Vector3(camera_x, camera_y, camera_z);
       // this.#camera.position.lerp(new_camera_position, 0.1);
        this.#camera.position.lookAt = new_camera_position;
    }

    checkForCollisionsWithFruits(){        
        for(let i =0; i< this.fruits.length; i++){
            if(this.fruits.at(i).getPosition().equals(this.snake.part_list.at(0).getPosition())){
                //remove fruit
                this.snake.addPart(this.#scene);
                this.#scene.remove(this.fruits.at(i).cube);
                this.fruits.at(i).remove_all_helpers(this.#scene);
                this.fruits.splice(i,1);

                //speed the game up
                if(this.snake.size % 5 == 0){
                    this.interval -= 1;
                }
                
                // update score
                let score_span = document.getElementById('score');
                // fruits eaten
                score_span.textContent = this.snake.size-1;

                // place new fruit
                // ranodmize coords until valid:
                while(true){
                    const max = this.box.size/2;
                    const min = -this.box.size/2;

                    let x = Math.floor(Math.random() * (max-min) + min);
                    let y =  Math.floor(Math.random() * (max-min) + min);
                    let z = Math.floor(Math.random() * (max-min) + min);
                    

                    const fruit_position = new THREE.Vector3(x,y,z);
                    //check if valid
                    let is_valid = true;
                    this.snake.part_list.forEach(part => {
                        if(fruit_position.equals(part.getPosition())){
                            is_valid = false;
                        }
                    })
                    if(is_valid){
                        this.fruits.push(new Fruit(fruit_position, this.box.size));
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

    initWallHelpers(){
        // initialize walls
        let material = new THREE.MeshPhongMaterial({color: 0x0000ff, opacity: 0.2, transparent: true}); // create transparent material
        this.helpers['x_positive'] = new THREE.Mesh(new THREE.BoxGeometry(0.01,this.box.size + 1,this.box.size+1), material);
        this.helpers['x_negative'] = new THREE.Mesh(new THREE.BoxGeometry(0.01,this.box.size + 1,this.box.size+1), material);
        this.helpers['y_positive'] = new THREE.Mesh(new THREE.BoxGeometry(this.box.size + 1, 0.01, this.box.size+1), material);
        this.helpers['y_negative'] = new THREE.Mesh(new THREE.BoxGeometry(this.box.size + 1, 0.01, this.box.size+1), material);
        this.helpers['z_positive'] = new THREE.Mesh(new THREE.BoxGeometry(this.box.size + 1, this.box.size + 1, 0.01), material);
        this.helpers['z_negative'] = new THREE.Mesh(new THREE.BoxGeometry(this.box.size + 1, this.box.size + 1, 0.01), material);
    }
    checkForWallProximity(){
        // 3 cases 
        //check all 3 scenarios(ex. in a corner)

        let threshlod = 0.15; // threshold in percentage

        let head = this.snake.part_list.at(0); // get the head of the snake
        
        let helpers_to_add = [];
        let helpers_to_remove = [];

        //determine side of each axis

        let x_sign = head.getPosition().x / Math.abs(head.getPosition().x)
        let x_sign_key = x_sign >= 0 ? 'x_positive' : 'x_negative';

        let y_sign = head.getPosition().y / Math.abs(head.getPosition().y)
        let y_sign_key = y_sign >= 0 ? 'y_positive' : 'y_negative';

        let z_sign = head.getPosition().z / Math.abs(head.getPosition().z)
        let z_sign_key = z_sign >= 0 ? 'z_positive' : 'z_negative';


        //draw or remove walls on x axis
        if(Math.abs(head.getPosition().x)  >= this.box.size/2 * (1 - threshlod)){
            this.helpers[x_sign_key].position.set(x_sign*(this.box.size/2 + 0.5), 0, 0);
            // add wall to list to be drawn
            helpers_to_add.push(this.helpers[x_sign_key]);

        }else{
            // add wall to list to be removed
            helpers_to_remove.push(this.helpers[x_sign_key])
        }
        // draw or remove walls on y axis
        if(Math.abs(head.getPosition().y)  >= this.box.size/2  * (1 - threshlod)){
            this.helpers[y_sign_key].position.set(0, y_sign*(this.box.size/2 + 0.5), 0);
            // add wall to list to be drawn
            helpers_to_add.push(this.helpers[y_sign_key]);

        }else{
            // add wall to list to be removed
            helpers_to_remove.push(this.helpers[y_sign_key])
        }
        // draw or remove wallls on z axis
        if(Math.abs(head.getPosition().z)  >= this.box.size/2 * (1 - threshlod)){
            this.helpers[z_sign_key].position.set(0, 0, z_sign*(this.box.size/2 + 0.5));
            // add wall to list to be drawn
            helpers_to_add.push(this.helpers[z_sign_key]);

        }else{
            // add wall to list to be removed
            helpers_to_remove.push(this.helpers[z_sign_key])
        }



        // draw desired helper walls

        helpers_to_add.forEach(wall => {
            if(!this.#scene.children.includes(wall)){
                this.#scene.add(wall);
            }
        })

        // remove walls that are not needed
        helpers_to_remove.forEach(wall => {
            if(this.#scene.children.includes(wall)){
                this.#scene.remove(wall);
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
        this.#loop.init();
        let score_span = document.getElementById('score');
        score_span.innerText = this.snake.size-1;

        let highscore_span = document.getElementById('highscore');
        if(localStorage.getItem('highscore') !== null){
            highscore_span.innerText = localStorage.getItem('highscore');
        }

        this.box = new Box(50);
        this.box.draw(this.#scene);
        this.snake.draw(this.#scene);


        this.fruits.push(new Fruit(new THREE.Vector3( 0, 0, -4 ), this.box.size));

        this.initWallHelpers()

        
    }
    // called when game is lost and restarted
    restart(){

        // reset the game
        this.interval = 30;
        const iterations = this.#scene.children.length;
        for(let i =0; i<iterations; i++){
            this.#scene.remove(this.#scene.children.at(0));
        }
        this.fruits = [];
        
        // save high score

        let highscore = localStorage.getItem('highscore');

        if(highscore === null){
            console.log(this.snake.size-1)
            localStorage.setItem('highscore', this.snake.size-1);
        }else{
            if(highscore < this.snake.size-1){
                localStorage.setItem('highscore', this.snake.size-1);
            }
        }


        this.start();
        
    }

    stop(){
        //deinitailize game
        this.#loop.hard_stop()
    }
}