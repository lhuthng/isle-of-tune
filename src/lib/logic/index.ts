import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class GameLogic {

    camera: Three.OrthographicCamera;
    scene: Three.Scene;
    renderer: Three.WebGLRenderer;
    meshes: Three.Mesh[];

    constructor(
        camera: Three.OrthographicCamera,
        scene: Three.Scene,
        renderer: Three.WebGLRenderer,
    ) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.meshes = [];
    }

    Setup() {
        const geometry = new Three.BoxGeometry( 1, 1, 1 );
        const material = new Three.MeshBasicMaterial( { color: 0xffff00 } );

        for (let i = 0; i < 5; i++) {
            const cube = new Three.Mesh( geometry, new Three.MeshBasicMaterial({
                color: new Three.Color().setRGB(0, 0, 0.5 + i / 10)
            }) );
            cube.position.set(i, 0, 0);
            this.meshes.push(cube);
            this.scene.add( cube );
        }

        const gridHelper = new Three.GridHelper();
        gridHelper.position.x += 0.5;
        gridHelper.position.z += 0.5;
        this.scene.add(gridHelper);


        this.camera.position.set(-5, 5, 5);
        this.camera.lookAt(0, 0, 0);
        this.scene.background = new Three.Color( 0xf0f0f0 );
        
        const control = new OrbitControls(this.camera, this.renderer.domElement);
    }

    Loop() {
        this.renderer.render(this.scene, this.camera);
    }

    Destroy() {
        
    }
}