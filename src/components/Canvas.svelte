<script>
    import { getContext } from 'svelte';
    import mergeFloorplan from '../lib/mergeFloorplan.js';

    const cfg = getContext('cfg');
    const floor = getContext('floor');

    let canvas;
    const loadImages = (node) => {
      canvas = node;
      mergeFloorplan(node, $floor, $cfg);
    };

    // eslint-disable-next-line no-unused-expressions
    $: mergeFloorplan(canvas, $floor, $cfg), $floor, $cfg;
</script>

<canvas id="canvas" use:loadImages></canvas>
