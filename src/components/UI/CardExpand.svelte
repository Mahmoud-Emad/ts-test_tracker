<script lang="ts">
  import type { Requirements } from '../../utils/types';
  import Card from './Card.svelte';
  import Button from './forms/Button.svelte';

  export let item: Requirements;

  let details: HTMLDivElement;

  const viewDetails = () => {
    if ( details.style.display === 'none' ) {
      details.style.display = 'block';
    } else {
      details.style.display = 'none';
    }
  };
</script>

<Card cardClassName={'card-expand'} cardClassBody={'pb-0'}>
  <span slot="card-body">
    <div class="row">
      <div class="col-1 col-left-custom">
        <Button
          icon={'fas fa-solid fa-up-down-left-right i-draggble-left'}
          className={'btn-simple drag-btn c-grab'}
          onClick={() => {
            console.log( '' );
          }}
          text={''}
        />
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="col-11 col-center11-custom" on:click={viewDetails}>
        <p class="card-expand-header mb-0">
          <strong class="text-primary">{item.requirement_title}</strong> - {item.title.toLocaleUpperCase()}
        </p>
        <div class="details">
          <div class="row">
            <div class="col-3">Created:</div>
            <div class="col-3">Updated:</div>
          </div>
          <div class="row">
            <div class="col-3">
              <p class="text-primary">{item.created}</p>
            </div>
            <div class="col-3">
              <p class="text-primary">{item.updated}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-expand-details" bind:this={details}>
      <p>{item.description}</p>
    </div>
  </span>
</Card>

<style>
  .col-left-custom {
    margin: 0;
    padding: 0;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: self-start;
  }
  .col-center11-custom {
    cursor: pointer;
  }
  .details {
    background: var(--boxes-bg);
    margin-bottom: 0;
    padding-bottom: 0;
  }
</style>
