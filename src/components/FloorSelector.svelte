<script>
    /**
     * Svelte
     */
    import { getContext } from 'svelte';

    /**
     * Get Context
     */
    const selectedFloor = getContext('floor');
    const cfg = getContext('cfg');

    const handleSelect = (floor) => {
      window.dispatchEvent(
        new CustomEvent('select-floor', { detail: floor }),
      );
      $selectedFloor = floor;
    };

</script>

<div class="wrapper flex-ctr">
    <div class="floor-control-wrapper flex-ctr">
        {#each Object.keys($cfg.floors) as floor}
            <div
                    on:click={() => handleSelect(floor)}
                    class:active={$selectedFloor === floor}
                    class="floor-cell flex-ctr">
                {floor.toUpperCase()}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
  .flex-ctr {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .wrapper {
    gap: 10px;

    flex-direction: column;
  }

  .floor-control-wrapper {
    gap: 6px;
    color: #eeeeee;
  }

  .floor-cell {
    width: 40px;
    height: 25px;

    border-radius: 8px;
    background-color: #353535;
    box-shadow: var(--button_panel_shadow);

    pointer-events: all;
    transition: var(--transition);
    cursor: pointer;

    padding: 10px 9px;
    z-index: 2;

    &:hover {
      background: #2f2f2f;
      box-shadow: #2f2f2f;
    }

    &.active {
      background: #eeeeee;
      color: #2f2f2f;
    }
  }

  .help-buttons {
    gap: 6px;

    .btn {
      width: 130px;
      height: 32px;

      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
      background-color: #353535;

      font-size: 14px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0;
      text-align: center;

      transition: var(--transition);
      pointer-events: all;
      cursor: pointer;

      &.back-to-master {
        background: #353535;

        .title {
          color: #eeeeee;
        }

        &:hover {
          background: rgba(35, 35, 35, 0.9);
        }
      }

      &.vr {
        background: #dadada;

        .title {
          color: #000000;
        }

        &:hover {
          background: #f1f1f1;
        }

        &:active {
          background: #b3b3b3;
        }
      }
    }
  }

</style>
