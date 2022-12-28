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
        counter = 0;
        this.renderer.setAnimationLoop(() => {
            this.renderer.render(this.scene, this.camera);
            this.controls.update();
            this.tick();
        });

    }
    stop() {
        console.log("STOPPED");
        this.renderer.setAnimationLoop(null);
        counter = 0;
    }
    tick(){
        if(counter % this.world.interval === 0){
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

        // update speed display
        let speed_div = document.getElementById('speed');
        speed_div.innerText = Math.round(60/this.world.interval * 100) / 100;
        
        counter++;

    }
}
