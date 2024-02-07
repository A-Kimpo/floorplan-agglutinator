<script>
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';

    import initConfig from '../lib/initConfig.js';

    const floor = writable(false);
    const cfg = writable(initConfig);

    setContext('floor', floor);
    setContext('cfg', cfg);
</script>

<slot/>
