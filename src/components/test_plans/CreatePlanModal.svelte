<script lang="ts">
  import Modal from '../UI/modals/Modal.svelte';
  import Input from '../UI/forms/Input.svelte';
  import type { ProjectsType, TestPlanChart } from '../../utils/types';
  import { validateProjectName } from '../../utils/validators';
  import Button from '../UI/forms/Button.svelte';
  import Alert from '../UI/Alert.svelte';
  import { alertStore, testPlansStore } from '../../utils/store';
  import CheckBox from '../UI/forms/CheckBox.svelte';

  export let openModal: boolean;
  export let project: ProjectsType;

  const planType: TestPlanChart = {};
  let withTemplate = false;

  const onCreateTestPlan = async () => {
    await testPlansStore.create( planType, project.id ).then( ( plan ) => {
      if ( plan ) {
        const plans = project.test_plans;
        plans.splice( 0, 0, plan );
        project.test_plans = plans;
        testPlansStore.set( project.test_plans );
      }
    } );
  };

  const setTestPlanType = () => {
    if ( withTemplate ) {
      planType.type = 'template';
    } else {
      planType.type = 'blank';
    }
    return withTemplate;
  };

  let disabledForm = true;

  $: disabledForm = !validateProjectName( planType.title ).isValid;
</script>

<Modal bind:openModal withFooter={true}>
  <h5 slot="modal-header" class="text-color">Create New Test Plan</h5>
  <div slot="modal-body">
    <Input
      bind:value={planType.title}
      label={'Title'}
      type={'text'}
      validation={validateProjectName}
    />
    <CheckBox
      label={'With Template'}
      bind:value={withTemplate}
      onClick={setTestPlanType}
    />
    {#if withTemplate}
      <small class="ml-7 text-muted"
        >* A suggested test plan structure will be created.</small
      >
    {:else}
      <small class="ml-7 text-muted">* A blank test plan will be created.</small
      >
    {/if}
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
      onClick={onCreateTestPlan}
      disabled={disabledForm}
      text={'New Test Plan'}
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

<style>
  .ml-7 {
    margin-left: 7px;
  }
</style>
