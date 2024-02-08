<script>
    /**
     * Svelte
     */
    import { getContext, onMount } from 'svelte';
    import mergeFloorplan from '../lib/mergeFloorplan.js';

    /**
     * getContext
     */
    const cfg = getContext('cfg');
    const floor = getContext('floor');
    const selectedFloor = getContext('floor');
    const selectedLayer = getContext('layer');
    const pinch = getContext('pinch');
    const zoom = getContext('zoom');

    /**
     * Variables
     */
    let canvas;

    /**
     * Functions
     */
    function draggable(node) {
      let x;
      let y;
      let startX;
      let startY;
      let endX;
      let endY;

      function handleMousedown(event) {
        if (event.type === 'touchstart') {
          event = event.touches[0];
        }

        x = event.clientX;
        y = event.clientY;
        startX = x;
        startY = y;
        node.dispatchEvent(
          new CustomEvent('dragstart', {
            detail: { x, y },
          }),
        );

        window.addEventListener('mousemove', handleMousemove);
        window.addEventListener('mouseup', handleMouseup);

        window.addEventListener('touchmove', handleMousemove);
        window.addEventListener('touchend', handleMouseup);
      }

      function handleMousemove(event) {
        if (event.type === 'touchmove') {
          event = event.changedTouches[0];
        }

        const dx = event.clientX - x;
        const dy = event.clientY - y;

        x = event.clientX;
        y = event.clientY;
        endX = x;
        endY = y;
        node.dispatchEvent(
          new CustomEvent('dragmove', {
            detail: {
              x, y, dx, dy, startX, startY, endX, endY,
            },
          }),
        );
      }

      function handleMouseup(event) {
        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(
          new CustomEvent('dragend', {
            detail: { x, y },
          }),
        );

        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);

        window.removeEventListener('touchmove', handleMousemove);
        window.removeEventListener('touchend', handleMouseup);
      }

      node.addEventListener('mousedown', handleMousedown);
      node.addEventListener('touchstart', handleMousedown);

      return {
        destroy() {
          node.removeEventListener('mousedown', handleMousedown);
          node.removeEventListener('touchstart', handleMousedown);
        },
      };
    }

    const handleMove = ({
      startX, startY, x, y,
    }) => {
      console.log('pinch');
      if ($pinch === 'pinchLayer') {
        $cfg.floors[$selectedFloor].layers[$selectedLayer].top = y - startY;
        $cfg.floors[$selectedFloor].layers[$selectedLayer].left = x - startX;
      } else if ($pinch === 'pinchFloor') {
        $cfg.floors[$selectedFloor].top = y - startY;
        $cfg.floors[$selectedFloor].left = x - startX;
      }
    };

    const handleWheel = (e) => {
      if (!$zoom) return;
      if (e.deltaY < 0) {
        $cfg.canvas.scale += 0.05;
      } else {
        $cfg.canvas.scale -= 0.05;
      }
    };
    const loadImages = (node) => {
      canvas = node;
      mergeFloorplan(node, $floor, $cfg);
    };

    /**
     * Reactivity
     */
    $: if (canvas && $floor && $cfg) {
      mergeFloorplan(canvas, $floor, $cfg);
    }

    /**
     * onMount
     */
    onMount(() => {
      if (!$floor) {
        $floor = 'gf';
      }
    });

</script>

<div class="canvas">
    <canvas id="canvas"
            use:draggable
            use:loadImages
            on:wheel={(e) => handleWheel(e)}
            on:dragmove={(e) => handleMove(e.detail)}
    ></canvas>
</div>

<style>
    .canvas {
        height: 100%;
    }
</style>
