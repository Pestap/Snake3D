# Snake3D

## Introduction

The aim of the project is to implement a 3D version of popular game - snake. The 3D version is much more complex than the standard variant,
it allows for 6 degrees of freedom and makes it harder for the player to understand where the fruits are and where the playing area ends.

## Description

You can start the game by pressing the spacebar (as indicated at the top of the screen).
The goal of the game is to eat as many fruits as possible and in result make your snake as long as possible. Fruits are represented by red cubes.
You lose when the snake eats itself or hits the wall. The snake starts moving faster, the more frutis you eat.

You can track your score and speed at the top of the screen, when you lose a game, your score will be compared with the highest score you achieved and
it it is, it will be displayed under the score.

Have fun!

### Controls
- Start/pause - spacebar
- Up/Down - W/S
- Left/Right - A/D
- Rotate anticlockwise/clockwise - Q/E
- z, x, c - display fruit location helpers (explained in more detail below)

### Helper features
To solve the problems that occured only in 3D version I decided to implement some helper feateures:

- pressing z, x or c (or any 2 or 3 of those at the same time) will result in a helper 'wall' to appear,
which indicates the position of the fruit in one of 3 axes (each one of the controls allows users to display a wall on different axis)

![obraz](https://user-images.githubusercontent.com/90579181/225307297-11a6fcdd-520b-4684-89ad-fb8ed813b600.png)


- when the snake gets to close to a wall, it is illuminated to let the player know

![obraz](https://user-images.githubusercontent.com/90579181/225307419-cccd265d-62db-416c-a087-756d90834969.png)

- game can be paused (using the spacebar) which allows the player to analyse the game without time preassure (but I encourage you to not use it 😉)

## Technologies used

The game was implemented using JavaScript with Three.js library used for 3D rendering.

## GitHub Pages

Currently not working :(

## Future ideas for the project:

I hope to implement a backend server, which will allow users to create accounts and share their scores and compete with friends.
