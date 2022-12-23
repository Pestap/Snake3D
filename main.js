import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { World } from './game_loop/world.js';

let world = new World(document.querySelector("#bg"));
world.start();

