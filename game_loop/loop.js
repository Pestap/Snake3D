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
            this.world.snake.move_forward();
            counter = 0;
        }
        counter++;

        

    }
}
