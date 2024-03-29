let counter = 0;
export class Loop {
    constructor(camera, scene, renderer,controls, world){
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.controls = controls;
        this.world = world;
        this.going = false;
    }

    init(){
        counter = 0;
        this.going = true;
        this.world.ui.displayStartInfo();
        this.renderer.setAnimationLoop(() => {
            this.renderer.render(this.scene, this.camera);
            this.controls.update();
            this.controls.enabled = false;
            this.controls.target.lerp(this.world.snake.part_list.at(0).getPosition(), 0.01);
            this.controls.enabled = true;
        });
    }

    start() {
        counter = 0;
        this.going = true;
        
        this.renderer.setAnimationLoop(() => {
            this.renderer.render(this.scene, this.camera);
            this.controls.update();
            this.controls.enabled = false;
            this.controls.target.lerp(this.world.snake.part_list.at(0).getPosition(), 0.01);
            this.controls.enabled = true;
            this.tick();
        });

    }

    // without animation blocking
    soft_stop() {

        this.renderer.setAnimationLoop(() => {
            this.renderer.render(this.scene, this.camera);
            this.controls.update();
            this.controls.enabled = false;
            this.controls.target.lerp(this.world.snake.part_list.at(0).getPosition(), 0.01);
            this.controls.enabled = true;
        });
        this.going = false;
        counter = 0;
    }

    // with animation blocking
    hard_stop() {
        this.renderer.setAnimationLoop(null);
        this.going = false;
        counter = 0;
    }


    toggle(){
        if(this.going){
            this.soft_stop();
            this.world.ui.displayPauseInfo();
        }else{
            this.start();
            this.world.ui.removePauseInfo()
        }
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
            //check for wall proximity
            this.world.checkForWallProximity();
            counter = 0;
        }

        // update speed display
        this.world.ui.updateSpeed(Math.round(60/this.world.interval * 100) / 100);

        counter++;

    }
}
