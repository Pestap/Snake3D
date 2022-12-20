export class SnakePart{
    constructor(snake, cube){
        this.snake = snake;
        this.cube = cube;
    }

    draw(scene){
        scene.add(this.cube);
    }

    move(direction){
        if(direction === 'w'){
            this.cube.position.z -= 1;
        }else if(direction === 's'){
            this.cube.position.z += 1;
        }else if(direction === 'a'){
            this.cube.position.x -= 1;
        }else if(direction === 'd'){
            this.cube.position.x += 1;
        }
    }

    set_position(x,y,z){
        this.cube.position.set(x,y,z);   
    }

}