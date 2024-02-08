<script>
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';

    import initConfig from '../lib/initConfig';

    const floor = writable(false);
    const layer = writable(false);
    const cfg = writable(initConfig);

    setContext('floor', floor);
    setContext('layer', layer);
    setContext('cfg', cfg);
</script>

<slot/>
