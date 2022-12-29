import * as THREE from 'three';

export class Fruit{
    helpers = {
        'x' : null,
        'y' : null,
        'z' : null
    } // x y z helpers
    constructor(position, box_size){
        this.geometry = new THREE.BoxGeometry(1,1,1);
        this.material = new THREE.MeshStandardMaterial({color: 0xfc0303});
        this.cube = new THREE.Mesh(this.geometry, this.material)
        this.setPosition(position);
        this.init_helpers(box_size);
    }

    draw(scene){
        scene.add(this.cube);
    }

    getPosition(){
        return this.cube.position;
    }

    init_helpers(box_size){
        let material = new THREE.MeshPhongMaterial({color: 0xff000f, opacity: 0.2, transparent: true}); // create transparent material
        this.helpers['x'] = new THREE.Mesh(new THREE.BoxGeometry(1,box_size,box_size), material);
        this.helpers['y'] = new THREE.Mesh(new THREE.BoxGeometry(box_size, 1 ,box_size), material);
        this.helpers['z'] = new THREE.Mesh(new THREE.BoxGeometry(box_size, box_size ,1), material);
    }

    draw_helper(scene, axis, box_size){
        
        let helper_plane_position = new THREE.Vector3();

        if(axis === 'x'){
            helper_plane_position.x = this.cube.position.x;
        }else if(axis === 'y'){
            helper_plane_position.y = this.cube.position.y;
        }else if(axis === 'z'){
            helper_plane_position.z = this.cube.position.z;
        }

        this.helpers[axis].position.set(helper_plane_position.x, helper_plane_position.y, helper_plane_position.z);
        //check if scene contains:

        
        if(!scene.children.includes(this.helpers[axis])){ // only draw if helper does not exist
            scene.add(this.helpers[axis]);
        }

    }

    remove_helper(scene, axis){
        scene.remove(this.helpers[axis]);
    }
    remove_all_helpers(scene){
        this.remove_helper(scene, 'x');
        this.remove_helper(scene, 'y');
        this.remove_helper(scene, 'z');
    }
    setPosition(vector){
        this.cube.position.set(vector.x, vector.y, vector.z);   
    }


}