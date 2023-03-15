<script lang="ts">
  import type { ProjectsType } from '../../utils/types';
  import Modal from '../UI/modals/Modal.svelte';
  import Input from '../UI/forms/Input.svelte';
  import type { RequirementsDocChart } from '../../utils/types';
  import { validateProjectName } from '../../utils/validators';
  import { alertStore, requirementsDocStore } from '../../utils/store';
  import Alert from '../UI/Alert.svelte';
  import Button from '../UI/forms/Button.svelte';

  export let openModal: boolean;
  export let project: ProjectsType;

  const requirementDocChart: RequirementsDocChart = {};

  const onCreateDocument = async () => {
    await requirementsDocStore
      .create( requirementDocChart, project.id )
      .then( ( doc ) => {
        if ( doc ) {
          const docs = project.requirements_docs;
          docs.splice( 0, 0, doc );
          project.requirements_docs = docs;
          requirementsDocStore.set( project.requirements_docs );
        }
      } );
  };

  $: disabledForm = !validateProjectName( requirementDocChart.title ).isValid;
</script>

<Modal bind:openModal withFooter={true}>
  <h5 slot="modal-header" class="text-color">
    Create New Requirement Document
  </h5>
  <div slot="modal-body">
    <Input
      bind:value={requirementDocChart.title}
      label={'Title'}
      type={'text'}
      validation={validateProjectName}
    />
    {#if $alertStore.isOpen}
      <Alert
        isOpen={$alertStore.isOpen}
        message={$alertStore.message}
        title={$alertStore.title}
        className={$alertStore.className}
        error={$alertStore.error}
      />
    {/if}
  </div>
  <div slot="modal-footer">
    <Button
      className={'btn-primary'}
      onClick={onCreateDocument}
      disabled={disabledForm}
      text={'New Document'}
    />
    <Button
      className={'btn-danger'}
      onClick={() => {
        openModal = false;
      }}
      disabled={!openModal}
      text={'Close'}
    />
  </div>
</Modal>
