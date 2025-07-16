<script lang="ts">
    import GameLogic from '$lib/logic';
    import MusicalEntity from '$lib/logic/musical-entity';
    import { onMount } from 'svelte';
    import * as Three from 'three';
    import { textureStore } from 'three/tsl';
    let container: HTMLDivElement | null = null;

    let scene: Three.Scene | null = null;
    let camera: Three.OrthographicCamera | null;
    let renderer: Three.WebGLRenderer | null;
    
    let logic: GameLogic;
    let frustumSize = 20;

    function resizeRenderer() {
        if (!container || !camera || !renderer) return;

        const [ width, height ] = [ container.clientWidth, container.clientHeight ];
        const aspect = width / height;
        camera.left = frustumSize * aspect / -2;
        camera.right = frustumSize * aspect / 2;
        camera.top = frustumSize / 2;
        camera.bottom = frustumSize / -2;

        camera.updateProjectionMatrix();

        renderer.setSize(width, height);        
    }
        
    let entity: MusicalEntity | null = null;

    onMount(() => {
        if (container == null) {
            console.log("No container found!");
            return;
        }

        camera = new Three.OrthographicCamera(1, 1, 1, 1, 1, 1000);
        renderer = new Three.WebGLRenderer();
        scene = new Three.Scene;

        container.appendChild(renderer.domElement);

        resizeRenderer();
        window.addEventListener('resize', resizeRenderer);

        logic = new GameLogic(camera, scene, renderer);

        logic.Setup();
        renderer.setAnimationLoop(logic.Loop.bind(logic));

        entity = new MusicalEntity();

        return () => {
            renderer?.setAnimationLoop(null);
            logic.Destroy();
            window.removeEventListener('resize', resizeRenderer);
        }
    });
</script>

<div id="canvas-container" 
    bind:this={container}
>
</div>
<button
    aria-label="test"
    onclick={() => entity?.trigger()}
>
    Hello?
</button>

<style>
    #canvas-container {
        width: 50rem;
        height: 50rem;
    }
</style>