<script lang="ts">
  import {
    type TestPlanChart,
    type TestPlanSection,
    type FieldsModalObject,
    RequestActionEnum,
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
  import UpdateTestPlanSection from '../UI/modals/InputsModal.svelte';
  import { testPlanSectionsStore } from '../../stores/test_plans';

  export let openViewModal: boolean;
  export let openDeleteModal: boolean;
  export let openInputsModal: boolean;
  export let selectedSection: TestPlanSection;
  export let testPlan: TestPlanChart;
  export let projectID: string;

  let fields: Array<FieldsModalObject> = [
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
  let sectionBuffer: TestPlanSection = {};

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

  const onUpdateTestPlanSection = async ( ) => {
    await TestPlans.updateSection(
      +projectID,
      testPlan.id,
      selectedSection.title,
      sectionBuffer,
    ).then( () => {
      const temps: TestPlanSection[] = testPlan.temps;
      const indx = temps.findIndex( ( v ) => v.title === selectedSection.title );
      temps[indx] = sectionBuffer;
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
  <UpdateTestPlanSection
    action={RequestActionEnum.update}
    type={ObjectTypeEnum.testPlanSection}
    buffer={sectionBuffer}
    bind:fields
    bind:openModal={openInputsModal}
    on:update={onUpdateTestPlanSection}
  />
{/if}
