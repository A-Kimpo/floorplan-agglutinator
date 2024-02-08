<script>
    import { getContext, onMount } from 'svelte';
    import mergeFloorplan from '../lib/mergeFloorplan.js';

    const cfg = getContext('cfg');
    const floor = getContext('floor');

    let canvas;
    const loadImages = (node) => {
      canvas = node;
      mergeFloorplan(node, $floor, $cfg);
    };

    // eslint-disable-next-line no-unused-expressions
    $: if (canvas && $floor && $cfg) {
      mergeFloorplan(canvas, $floor, $cfg);
    }

    onMount(() => {
      if (!$floor) {
        $floor = 'gf';
      }
    });
</script>
<div class="canvas">
    <canvas id="canvas" use:loadImages></canvas>
</div>

<style>
    /* .canvas {

    } */
</style>
