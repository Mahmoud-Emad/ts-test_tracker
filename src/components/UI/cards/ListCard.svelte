<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Link } from 'svelte-navigator';
  import {
    RequestActionEnum,
    type FieldsModalObject,
    type ObjectTypeEnum,
    type ProjectsType,
    type RequirementsDocChart,
    type TestPlanChart,
    type TestSuiteChart,
  } from '../../../utils/types';
  import Button from '../forms/Button.svelte';
  import DeleteModal from '../modals/DeleteModal.svelte';
  import InputsModal from '../modals/InputsModal.svelte';
  import Card from './Card.svelte';

  export let project: ProjectsType;
  export let item: TestPlanChart | TestSuiteChart | RequirementsDocChart;
  export let type: ObjectTypeEnum;
  export let updateFields: Array<FieldsModalObject> = [];
  export let to: string;
  export let openEditModal: boolean;
  export let openDeleteModal: boolean;

  const titleOnDelete = `${project.title}/${item.title}`;
  const dispatch = createEventDispatcher();
</script>

<Link {to} class="text-primary d-block text-decoration-none">
  <Card
    cardClassBody={'pb-2'}
    cardClassName={'card-component mb-3'}
    cardClassHeader={'text-primary'}
  >
    <span slot="card-body">
      <h5 class="card-title">{item.title}</h5>
      <div class="pt-4">
        <div class="row">
          <div class="col-6 col-md-6 col-sm-6 col-xs-12">
            <p class="text-color">
              Created: <strong>{item.created}</strong>
            </p>
          </div>
          <div class="col-6 col-md-6 col-sm-6 col-xs-12">
            <p class="text-color">
              Updated: <strong>{item.updated}</strong>
            </p>
          </div>
          <div class="col d-flex justify-content-between">
            <Button
              iconWidth={35}
              icon="fa fa-pencil"
              onClick={() => {
                openEditModal = true;
              }}
              className="btn-simple p-0 test-suite-content-actions-btns"
              text=""
              tooltip="edit title"
            />
            <Button
              icon="fa fa-trash"
              onClick={() => {
                openDeleteModal = true;
              }}
              className="btn-simple btn-trash p-0 test-suite-content-actions-btns"
              text=""
              tooltip="Delete"
              iconWidth={35}
            />
          </div>
        </div>
      </div>
    </span>
  </Card>
</Link>

{#if openDeleteModal}
  <DeleteModal
    bindTitle={titleOnDelete}
    {type}
    bind:openModal={openDeleteModal}
    callableFunction={() => {
      dispatch( 'delete', {
        deletedItem: item,
      } );
    }}
  />
{:else if openEditModal}
  <InputsModal
    action={RequestActionEnum.update}
    {type}
    bind:openModal={openEditModal}
    buffer={item}
    bind:fields={updateFields}
    on:update={async ( event ) => {
      dispatch( 'update', {
        updatedItem: event.detail.data,
      } );
    }}
  />
{/if}
