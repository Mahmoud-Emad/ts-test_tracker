<script lang="ts">
  import type {
    TestPlanChart,
    TestPlanSection,
    FieldsModalObject,
  } from '../../utils/types';
  import { ObjectTypeEnum } from '../../utils/types';
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
  import InputsModal from '../UI/modals/InputsModal.svelte';
  import { testPlanSectionsStore } from '../../stores/test_plans';

  export let openViewModal: boolean;
  export let openDeleteModal: boolean;
  export let openInputsModal: boolean;
  export let selectedSection: TestPlanSection;
  export let testPlan: TestPlanChart;
  export let projectID: string;

  let selectedSectionFields: Array<FieldsModalObject>;

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
      openInputsModal = false;
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
    type={ObjectTypeEnum.testPlanSection}
    callableFunction={deleteTestPlanSection}
    bind:openModal={openDeleteModal}
  />
{:else if openInputsModal}
  <InputsModal
    buffer={{}}
    fields={getFields()}
    bind:openModal={openInputsModal}
    on:update={async ( event ) => {
      await onUpdateTestPlanSection( event.detail.data );
    }}
  />
{/if}
