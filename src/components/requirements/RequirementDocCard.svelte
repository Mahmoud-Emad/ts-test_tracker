<script lang="ts">
  import { Link } from 'svelte-navigator';
  import {
    DeleteType,
    type ProjectsType,
    type RequirementsDocChart,
    type UpdateFieldsModalobject,
  } from '../../utils/types';
  import { validateProjectName } from '../../utils/validators';
  import Card from '../UI/Card.svelte';
  import Button from '../UI/forms/Button.svelte';
  import Input from '../UI/forms/Input.svelte';
  import Requirements from '../../apis/requirements';
  import { requirementsDocStore } from '../../stores/requirements';
  import { alertStore } from '../../stores/utils';
  import DeleteModal from '../UI/modals/DeleteModal.svelte';
  import UpdateModal from '../UI/modals/UpdateModal.svelte';

  export let document: RequirementsDocChart;
  export let project: ProjectsType;

  let openDeleteModal: boolean;
  let openUpdateModal: boolean;
  const titleOnDelete = `${project.title}/${document.title}`;

  const fields: Array<UpdateFieldsModalobject> = [
    {
      component: Input,
      fieldLabel: 'Requirement Document Tilte',
      fieldName: 'title',
      fieldValue: document.title,
      validation: validateProjectName,
    },
  ];

  const onDelete = async () => {
    await Requirements.deleteDocument( project.id, document.id ).then( () => {
      const docs: RequirementsDocChart[] = project.requirements_docs;
      const indx = project.requirements_docs.findIndex(
        ( doc ) => document.id === doc.id,
      );
      docs.splice( indx, 1 );
      project.requirements_docs = docs;
      requirementsDocStore.set( project.requirements_docs );
      alertStore.set( {
        className: 'danger',
        close: true,
        message: 'Requirement Document Deleted Successfully!',
        isOpen: openDeleteModal,
        title: 'Requirement Document Deleted Successfully!',
      } );
      setTimeout( () => {
        openDeleteModal = false;
      }, 3000 );
    } );
  };

  const onUpdate = async ( _document: RequirementsDocChart ) => {
    await Requirements.updateDocument( project.id, document.id, document ).then(
      () => {
        const docs: RequirementsDocChart[] = project.requirements_docs;
        const indx = project.requirements_docs.findIndex(
          ( doc ) => document.id === doc.id,
        );
        docs[indx] = _document;
        project.requirements_docs = docs;
        requirementsDocStore.set( project.requirements_docs );
        setTimeout( () => {
          openUpdateModal = false;
        }, 3000 );
      },
    );
  };
</script>

<Link
  to="/projects/{project.id}/requirements/{document.id}"
  class="text-primary d-block text-decoration-none"
>
  <Card
    cardClassBody={'pb-2'}
    cardClassName={'card-component mb-3'}
    cardClassHeader={'text-primary'}
  >
    <span slot="card-body">
      <h5 class="card-title">{document.title}</h5>
      <div class="pt-4">
        <div class="row">
          <div class="col-6 col-md-6 col-sm-6 col-xs-12">
            <p class="text-color">
              Created: <strong>{document.created}</strong>
            </p>
          </div>
          <div class="col-6 col-md-6 col-sm-6 col-xs-12">
            <p class="text-color">
              Updated: <strong>{document.updated}</strong>
            </p>
          </div>
          <div class="col d-flex justify-content-between">
            <Button
              iconWidth={35}
              icon="fa fa-pencil"
              onClick={() => {
                openUpdateModal = true;
              }}
              className="btn-simple p-0 test-plan-content-actions-btns"
              text=""
              tooltip="Update Title"
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
    </span>
  </Card>
</Link>

{#if openDeleteModal}
  <DeleteModal
    bindTitle={titleOnDelete}
    type={DeleteType.testPlan}
    bind:openModal={openDeleteModal}
    callableFunction={onDelete}
  />
{:else if openUpdateModal}
  <UpdateModal
    bind:openModal={openUpdateModal}
    buffer={document}
    {fields}
    on:update={async ( event ) => {
      await onUpdate( event.detail.data );
    }}
  />
{/if}
