<script>
    import { getContext } from 'svelte';
    import FloorSelector from './FloorSelector.svelte';

    const selectedFloor = getContext('floor');
    const selectedLayer = getContext('layer');
    const cfg = getContext('cfg');

    let opacity;
    let position;
    let inputTop = '';
    let inputLeft = '';

    let groupOpacity;
    let groupPosition;
    let groupInputTop = '';
    let groupInputLeft = '';

    let selectValue;

    $: if ($selectedFloor) {
      const layer = $cfg.floors[$selectedFloor]?.layers[$selectedLayer];
      const floor = $cfg.floors[$selectedFloor];

      opacity = layer?.opacity;
      position = { top: layer?.top || 0, left: layer?.left || 0 };

      groupOpacity = $cfg.floors[$selectedFloor]?.groupOpacity;
      groupPosition = { top: floor?.top || 0, left: floor?.left || 0 };
    }

    const increaseOpacity = (elem) => {
      if (elem === 'layer') {
        if ($cfg.floors[$selectedFloor].layers[$selectedLayer].opacity >= 1) return;
        $cfg.floors[$selectedFloor].layers[$selectedLayer].opacity = (+$cfg.floors[$selectedFloor].layers[$selectedLayer].opacity + 0.1).toFixed(1);
      }
      if (elem === 'floor') {
        if ($cfg.floors[$selectedFloor].groupOpacity >= 1) return;
        $cfg.floors[$selectedFloor].groupOpacity = (+$cfg.floors[$selectedFloor].groupOpacity + 0.1).toFixed(1);
      }
    };
    const decreaseOpacity = (elem) => {
      if (elem === 'layer') {
        if ($cfg.floors[$selectedFloor].layers[$selectedLayer].opacity <= 0.1) {
          $cfg.floors[$selectedFloor].layers[$selectedLayer].opacity = 0;
          return;
        }
        $cfg.floors[$selectedFloor].layers[$selectedLayer].opacity = (+$cfg.floors[$selectedFloor].layers[$selectedLayer].opacity - 0.1).toFixed(1);
      }
      if (elem === 'floor') {
        if ($cfg.floors[$selectedFloor].groupOpacity <= 0.1) {
          $cfg.floors[$selectedFloor].groupOpacity = 0;
          return;
        }
        $cfg.floors[$selectedFloor].groupOpacity = (+$cfg.floors[$selectedFloor].groupOpacity - 0.1).toFixed(1);
      }
    };
    const resetOpacity = (elem) => {
      if (elem === 'layer') {
        $cfg.floors[$selectedFloor].layers[$selectedLayer].opacity = 1;
      }
      if (elem === 'floor') {
        $cfg.floors[$selectedFloor].groupOpacity = 1;
      }
    };

    const resetPosition = (elem) => {
      if (elem === 'layer') {
        $cfg.floors[$selectedFloor].layers[$selectedLayer].top = 0;
        $cfg.floors[$selectedFloor].layers[$selectedLayer].left = 0;
        inputTop = '';
        inputLeft = '';
      }
      if (elem === 'floor') {
        $cfg.floors[$selectedFloor].top = 0;
        $cfg.floors[$selectedFloor].left = 0;
        groupInputTop = '';
        groupInputLeft = '';
      }
    };

    $: $selectedLayer = selectValue;
    $: inputTop = '', inputLeft = '', $selectedLayer;
    $: groupInputTop = '', groupInputLeft = '', $selectedFloor;

</script>

{#if $selectedFloor}
    <div class="wrapper">
        <div class="control">
            Choose layer:
            <select bind:value={selectValue} name="select">
                {#each $cfg.floors[$selectedFloor].layers as layer, idx}
                    <option value={idx}>{`layer: ${layer?.name}`}</option>
                {/each}
            </select>
            Layer opacity: {opacity}
            <div class="btn-group layer-opacity-control">
                <button on:click={() => decreaseOpacity('layer')}>-</button>
                <button on:click={() => increaseOpacity('layer')}>+</button>
                <button on:click={() => resetOpacity('layer')}>reset</button>
            </div>
            Layer position:
            <div class="inputs">
                <label for="top">top: {position.top}</label>
                <input id="top"
                       on:change={() => ($cfg.floors[$selectedFloor].layers[$selectedLayer].top = inputTop)}
                       bind:value={inputTop}/>
                <label for="left">left: {position.left}</label>
                <input id="left"
                       on:change={() => ($cfg.floors[$selectedFloor].layers[$selectedLayer].left = inputLeft)}
                       bind:value={inputLeft}/>
                <button class="btn" on:click={() => resetPosition('layer')}>reset</button>
            </div>
        </div>
        <div class="control">
            Choose floor:
            <FloorSelector/>
            Floor opacity: {groupOpacity}
            <div class="btn-group floor-opacity-control">
                <button on:click={() => decreaseOpacity('floor')}>-</button>
                <button on:click={() => increaseOpacity('floor')}>+</button>
                <button on:click={() => resetOpacity('floor')}>reset</button>
            </div>
            Floor position:
            <div class="inputs">
                <label for="groupLeft">top: {groupPosition.top}</label>
                <input name="groupTop"
                       on:change={() => ($cfg.floors[$selectedFloor].top = groupInputTop)}
                       bind:value={groupInputTop}/>
                <label for="groupLeft">left: {groupPosition.left}</label>
                <input id="groupLeft"
                       on:change={() => ($cfg.floors[$selectedFloor].left = groupInputLeft)}
                       bind:value={groupInputLeft}/>
                <button class="btn" on:click={() => resetPosition('floor')}>reset</button>
            </div>
        </div>
    </div>

{/if}

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    position: fixed;
    top: 10%;
    left: 10%;

    background-color: #242424;
    color: white;
  }

  .control {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    border: 1px solid #646cff;
    padding: 15px;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 2px;
  }

  .btn {
    width: 100%;
    margin-top: 10px;
  }

  .btn-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }
</style>
