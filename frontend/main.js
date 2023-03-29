import './style.css';
import { World } from './game_loop/world.js';

let world = new World(document.querySelector("#bg"));
world.start();

