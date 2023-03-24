<script lang="ts">
  import { requirementsStore } from '../../stores/requirements';
  import {
    ObjectTypeEnum,
    RequestActionEnum,
    type FieldsModalObject,
    type ProjectsType,
    type RequirementsDocChart,
    type RequirementsType,
  } from '../../utils/types';
  import {
    validateProjectDescription,
    validateProjectName,
  } from '../../utils/validators';
  import Card from '../UI/cards/Card.svelte';
  import Button from '../UI/forms/Button.svelte';
  import Input from '../UI/forms/Input.svelte';
  import TextArea from '../UI/forms/TextArea.svelte';
  import DeleteModal from '../UI/modals/DeleteModal.svelte';
  import InputsModal from '../UI/modals/InputsModal.svelte';

  export let item: RequirementsType;
  export let document: RequirementsDocChart;
  export let project: ProjectsType;

  let details: HTMLDivElement;
  let openUpdateModal: boolean;
  let openDeleteModal: boolean;
  const requirementsBuffer: RequirementsType = {};
  const reqTitle = `${document.title}/${item.title}`;

  let fields: Array<FieldsModalObject> = [
    {
      fieldLabel: 'Requirement Title',
      fieldName: 'title',
      fieldValue: item.title,
      validation: validateProjectName,
      component: Input,
    },
    {
      fieldLabel: 'Requirement Description',
      fieldName: 'description',
      fieldValue: item.description,
      validation: validateProjectDescription,
      component: TextArea,
    },
  ];

  const viewDetails = () => {
    if ( details.style.display === 'none' || details.style.display === '' ) {
      details.style.display = 'block';
    } else {
      details.style.display = 'none';
    }
  };

  const onDeleteRequirement = async () => {
    await requirementsStore.remove( project.id, document.id, item.id );
    setTimeout( () => {
      openDeleteModal = false;
    }, 2000 );
  };

  const onUpdateRequirement = async () => {
    await requirementsStore
      .edit( project.id, document.id, item.id, requirementsBuffer )
      .then( () => {
        setTimeout( () => {
          openDeleteModal = false;
        }, 2000 );
      } );
  };
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<Card cardClassName={'card-expand mt-3'} cardClassBody={'pb-0 pr-none'}>
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
            <div
              class="col-6 text-color  text-center d-flex justify-content-end"
            >
              Actions Buttons
            </div>
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
                icon={details && details.style.display === 'block'
                  ? 'fa fa-solid fa-arrow-up i-expand'
                  : 'fa fa-solid fa-arrow-down i-expand'}
                onClick={viewDetails}
                className="btn-simple p-0 test-plan-content-actions-btns"
                text=""
                tooltip={details && details.style.display === 'block'
                  ? 'Collapse'
                  : 'Expand'}
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

<DeleteModal
  bindTitle={reqTitle}
  type={ObjectTypeEnum.requirement}
  bind:openModal={openDeleteModal}
  callableFunction={onDeleteRequirement}
/>

<InputsModal
  bind:openModal={openUpdateModal}
  bind:fields
  buffer={requirementsBuffer}
  action={RequestActionEnum.update}
  type={ObjectTypeEnum.requirement}
  on:update={onUpdateRequirement}
/>

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
