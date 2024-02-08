<script>
    /**
     * Svelte
     */
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';

    /**
     * Import
     */
    import initConfig from '../lib/initConfig';

    /**
     * Stores
     */
    const floor = writable(false);
    const layer = writable(false);
    const pinch = writable('pinchFloor');
    const zoom = writable(true);
    const cfg = writable(initConfig);

    /**
     * setContext
     */
    setContext('floor', floor);
    setContext('layer', layer);
    setContext('pinch', pinch);
    setContext('zoom', zoom);
    setContext('cfg', cfg);
</script>

<slot/>
