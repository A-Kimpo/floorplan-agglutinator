<script>
    /**
     * Svelte
     */
    import { setContext } from 'svelte';
    import { writable, derived } from 'svelte/store';

    /**
     * Get Context
     */
    const getRatio = (width, height) => width / height;

    /**
     * Wrapper Size
     */
    const width = writable(0),
      height = writable(0),
      ratio = derived([width, height], ([$width, $height]) => getRatio($width, $height));

    /**
     * Container Size
     */
    const containerWidth = writable(0),
      containerHeight = writable(0),
      containerRatio = derived(
        [containerWidth, containerHeight],
        ([$containerWidth, $containerHeight]) => getRatio($containerWidth, $containerHeight),
      );

    /**
     * Set Context
     */
    setContext('wrapper', {
      width,
      height,
      ratio,
    });
    const context = {
      width: containerWidth,
      height: containerHeight,
      ratio: containerRatio,
    };
    setContext('container', context);
</script>

<div
        id="1"
        bind:this={context.container}
        bind:offsetWidth={$width}
        bind:offsetHeight={$height}
        class="container"
>
    {#if context.container}
        <slot/>
    {/if}
</div>

<slot name="background"/>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;

    user-select: none;
    touch-action: none;

    pointer-events: all;
  }
</style>
