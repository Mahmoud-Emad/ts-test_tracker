<script lang="ts">
  import { onMount } from 'svelte';
  import {
    clearAlertMessage,
    clearNotifacationStore,
  } from '../../../utils/helpers';

  export let modalClassName = '';
  export let modalClassHeader = '';
  export let cardClassBody = '';
  export let modalClassFooter = '';
  export let openModal = false;
  export let withFooter = false;

  onMount( () => {
    clearNotifacationStore();
    clearAlertMessage();
  } );
</script>

<div
  class="modal {modalClassName}"
  tabindex="-1"
  style="display:{openModal ? 'block' : 'none'}"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="modal-header {modalClassHeader}">
        <div class="close">
          <i
            class="fa fa-close"
            on:click={() => {
              openModal = false;
            }}
          />
        </div>
        <slot name="modal-header" />
      </div>
      <div class="modal-body {cardClassBody}">
        <slot name="modal-body" />
      </div>
      {#if withFooter}
        <div class="modal-footer {modalClassFooter}">
          <slot name="modal-footer" />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .modal {
    background: var(--modal-background);
  }
  .modal-content {
    background: var(--boxes-bg);
  }
  .close {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 20px;
  }
  .close i {
    padding: 5px;
    cursor: pointer;
  }
  .modal-header {
    position: relative;
  }
</style>
