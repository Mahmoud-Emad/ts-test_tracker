<script lang="ts">
  import Input from '../UI/forms/Input.svelte';
  import {
    ObjectTypeEnum,
    RequestActionEnum,
    type FieldsModalObject,
    type ProjectsType,
    type TestPlanChart,
  } from '../../utils/types';
  import { validateProjectName } from '../../utils/validators';
  import { testPlansStore } from '../../stores/test_plans';
  import CheckBox from '../UI/forms/CheckBox.svelte';
  import { clearFields } from '../../utils/helpers';
  import InputsModal from '../UI/modals/InputsModal.svelte';

  export let openModal: boolean;
  export let project: ProjectsType;

  const planType: TestPlanChart = {};
  let withTemplate: boolean;
  let fields: Array<FieldsModalObject> = [
    {
      component: Input,
      validation: validateProjectName,
      fieldName: 'title',
      fieldLabel: 'Title',
      fieldValue: '',
    },
    {
      component: CheckBox,
      onClick: () => {
        withTemplate = withTemplate ? false : true;
      },
      fieldName: 'type',
      fieldLabel: 'With Template',
      fieldValue: withTemplate,
    },
  ];

  const onCreateTestPlan = async () => {
    if ( withTemplate ) {
      planType.type = 'template';
    } else {
      planType.type = 'blank';
    }
    await testPlansStore.create( planType, project.id ).then( () => {
      fields = clearFields( fields );
      withTemplate = false;
    } );
  };

  let disabledForm = true;
  $: disabledForm = !validateProjectName( planType.title ).isValid;
</script>

<InputsModal
  action={RequestActionEnum.create}
  type={ObjectTypeEnum.project}
  bind:fields
  bind:openModal
  buffer={planType}
  on:create={onCreateTestPlan}
>
  <span slot="modal-hint">
    {#if withTemplate}
      <small class="ml-7 text-muted"
        >* A suggested test plan structure will be created.</small
      >
    {:else}
      <small class="ml-7 text-muted">* A blank test plan will be created.</small
      >
    {/if}
  </span>
</InputsModal>

<style>
  .ml-7 {
    margin-left: 7px;
  }
</style>
