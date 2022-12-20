import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


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
scene.add(cube);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,2,10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,5)
scene.add(lightHelper);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

document.addEventListener('keydown', (e) => {
  if(e.key === 'w'){
    cube.position.z -= 0.3;
  }else if(e.key === 's'){
    cube.position.z += 0.3;
  }else if(e.key === 'a'){
    cube.position.x -= 0.3;
  }else if(e.key === 'd'){
    cube.position.x += 0.3;

  }
});

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera)

  controls.update()
}

animate()