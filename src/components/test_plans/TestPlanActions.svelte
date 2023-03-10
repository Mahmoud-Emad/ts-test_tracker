<script lang="ts">
  import type {
    TestPlanChart,
    TestPlanSection,
    UpdateFieldsModalobject,
  } from '../../utils/types';
  import { DeleteType } from '../../utils/types';
  import {
    validateProjectDescription,
    validateProjectName,
  } from '../../utils/validators';
  import Button from '../UI/forms/Button.svelte';
  import TextArea from '../UI/forms/TextArea.svelte';
  import Input from '../UI/forms/Input.svelte';
  import DeleteModal from '../UI/modals/DeleteModal.svelte';
  import TestPlans from '../../apis/testPlan';

  import Modal from '../UI/modals/Modal.svelte';
  import UpdateModal from '../UI/modals/UpdateModal.svelte';
  import { testPlanSectionsStore } from '../../utils/store';

  export let openViewModal: boolean;
  export let openDeleteModal: boolean;
  export let openUpdateModal: boolean;
  export let selectedSection: TestPlanSection;
  export let testPlan: TestPlanChart;
  export let projectID: string;

  let selectedSectionFields: Array<UpdateFieldsModalobject>;

  const getFields = () => {
    if ( selectedSection && selectedSection.title ) {
      selectedSectionFields = [
        {
          fieldName: 'title',
          fieldLabel: 'Section Title',
          fieldValue: selectedSection.title,
          component: Input,
          validation: validateProjectName,
        },
        {
          fieldName: 'content',
          fieldLabel: 'Section Content',
          fieldValue: selectedSection.content,
          component: TextArea,
          validation: validateProjectDescription,
        },
      ];
    }
    return selectedSectionFields;
  };

  const deleteTestPlanSection = async () => {
    await TestPlans.deleteSection(
      +projectID,
      testPlan.id,
      selectedSection.title,
    ).then( () => {
      const temps: TestPlanSection[] = testPlan.temps;
      const indx = temps.findIndex( ( v ) => v.title === selectedSection.title );
      temps.splice( indx, 1 );
      testPlan.temps = temps;
      testPlanSectionsStore.set( testPlan.temps );
      openDeleteModal = false;
    } );
  };

  const onUpdateTestPlanSection = async ( section: TestPlanSection ) => {
    await TestPlans.updateSection(
      +projectID,
      testPlan.id,
      selectedSection.title,
      section,
    ).then( () => {
      const temps: TestPlanSection[] = testPlan.temps;
      const indx = temps.findIndex( ( v ) => v.title === selectedSection.title );
      temps[indx] = section;
      testPlan.temps = temps;
      testPlanSectionsStore.set( testPlan.temps );
      openUpdateModal = false;
    } );
  };
</script>

{#if openViewModal}
  <Modal bind:openModal={openViewModal} withFooter={true}>
    <span slot="modal-header">
      {selectedSection.title}
    </span>
    <span slot="modal-body">
      {selectedSection.content}
    </span>
    <span slot="modal-footer">
      <Button
        className="btn-primary"
        onClick={() => {
          openViewModal = false;
        }}
        text="Close"
      />
    </span>
  </Modal>
{:else if openDeleteModal}
  <DeleteModal
    bindTitle={testPlan.title + '/' + selectedSection.title}
    type={DeleteType.testPlanSection}
    callableFunction={deleteTestPlanSection}
    bind:openModal={openDeleteModal}
  />
{:else if openUpdateModal}
  <UpdateModal
    buffer={{}}
    fields={getFields()}
    bind:openModal={openUpdateModal}
    on:update={async ( event ) => {
      await onUpdateTestPlanSection( event.detail.data );
    }}
  />
{/if}
