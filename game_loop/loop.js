let counter = 0;
export class Loop {
    constructor(camera, scene, renderer,controls, world){
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.controls = controls;
        this.world = world;
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.renderer.render(this.scene, this.camera);
            this.controls.update();
            this.tick();
        });

    }
    stop() {
        this.renderer.setAnimationLoop(null);
    }
    tick(){
        if(counter % this.world.interval=== 0){
            // snake movement
            this.world.snake.move_forward();
            //draw fruits
            this.world.fruits.forEach(e => e.draw(this.scene));
            //check if any fruits eaten
            this.world.checkForCollisionsWithFruits();
            //check if collision inside snake
            this.world.checkForSnakeCollisions();

            counter = 0;
        }
        counter++;

        

    }
}
