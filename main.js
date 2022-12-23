import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SnakePart } from './snake_js/snakePart.js';
import { Snake } from './snake_js/snake.js';
import { Box } from './snake_js/box.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#bg")});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.BoxGeometry(1,1,1);

const material = new THREE.MeshStandardMaterial({color: 0x23ff0a});

const cube = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material);
const snakePart = new SnakePart(1, new THREE.Mesh(geometry, material));
const snakePart2 = new SnakePart(1, new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({color: 0x23ffba}) ));
const snakePart3 = new SnakePart(1, new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({color: 0x131eba}) ));
const snakePart4 = new SnakePart(1, new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({color: 0x03205a}) ));

//snakePart.draw(scene);
//snakePart2.draw(scene);
snakePart2.setPosition(new THREE.Vector3( 0, 0,1 ));
snakePart3.setPosition(new THREE.Vector3( 0, 0,2 ));
snakePart4.setPosition(new THREE.Vector3( 0, 0,3 ));

const box = new Box(20);
box.draw(scene);
const snake = new Snake(new THREE.Vector3( 0, 0,0 ), [snakePart, snakePart2, snakePart3, snakePart4],20);
snake.draw(scene);


/*const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,2,10);
scene.add(pointLight); 
*/
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


//const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(lightHelper);





const controls = new OrbitControls(camera, renderer.domElement);

document.addEventListener('keydown', (e) => {
  if(e.key === 'w'){
    snake.move_forward();
  }else if(e.key === ' '){
    snake.addPart(scene);
  }else if(e.key === 'a' || e.key === 'd' || e.key === 's'){
    snake.turn(e.key);
  }else if(e.key === 'p'){
    //snake.part_list.at(0).cube.position.y -= 3;
  }

});
// move evert 0.5 s
setInterval(function () {snake.move_forward()}, 500);

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera)

  controls.update()
}

animate()