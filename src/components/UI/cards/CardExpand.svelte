<script lang="ts">
  import type { Requirements } from '../../../utils/types';
  import Card from './Card.svelte';
  import Button from '../forms/Button.svelte';

  export let item: Requirements;

  let details: HTMLDivElement;
  let openUpdateModal: boolean;
  let openDeleteModal: boolean;

  const viewDetails = () => {    
    if ( details.style.display === 'none' || details.style.display === '') {
      details.style.display = 'block';
    } else {
      details.style.display = 'none';
    }
  };
</script>

<!-- svelte-ignore a11y-invalid-attribute -->

  <Card cardClassName={'card-expand'} cardClassBody={'pb-0 pr-none'}>
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
        <div class="col-11 col-center11-custom">
          <a href="#" on:click={viewDetails}>
            <p class="card-expand-header mb-0 text-color">
              <strong class="text-primary">{item.requirement_title}</strong> - {item.title.toLocaleUpperCase()}
            </p>
          </a>
          <div class="details">
            <div class="row">
              <div class="col-3 text-color">Updated:</div>
              <div class="col-3 text-color">Associated Test Cases:</div>
              <div class="col-6 text-color  text-center d-flex justify-content-end">Actions Buttons</div>
            </div>
            <div class="row mb-2">
              <div class="col-3">
                <strong class="text-primary">{item.updated}</strong>
              </div>
              <div class="col-3">
                <strong class="text-primary">{item.associated_test_cases}</strong>
              </div>
              <div class="col-6 d-flex text-center justify-content-end">
                <Button
                iconWidth={35}
                icon="fa fa-pencil"
                onClick={() => {
                  openUpdateModal = true;
                }}
                className="btn-simple p-0 test-plan-content-actions-btns"
                text=""
                tooltip="edit title"
              />
              <Button
                icon="fa fa-solid fa-arrow-down i-expand"
                onClick={viewDetails}
                className="btn-simple p-0 test-plan-content-actions-btns"
                text=""
                tooltip="Expand"
                iconWidth={35}
              />
              <Button
                icon="fa fa-trash"
                onClick={() => {
                  openDeleteModal = true;
                }}
                className="btn-simple btn-trash p-0 test-plan-content-actions-btns"
                text=""
                tooltip="Delete"
                iconWidth={35}
              />
              </div>
            </div>
          </div>
          <div class="card-expand-details text-color" bind:this={details}>
            <small>Description</small>
            <p>
              {item.description}
            </p>
          </div>
        </div>
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
  .details {
    background: var(--boxes-bg);
    margin-bottom: 0;
    padding-bottom: 0;
  }
</style>
