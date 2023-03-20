<script lang="ts">
  import { Link } from 'svelte-navigator';
  import testPlans from '../../apis/testPlan';
  import { testPlansStore } from '../../stores/test_plans';
  import { alertStore } from '../../stores/utils';
  import {
    DeleteType,
    type ProjectsType,
    type TestPlanChart,
    type UpdateFieldsModalobject,
  } from '../../utils/types';
  import { validateProjectName } from '../../utils/validators';
  import Card from '../UI/cards/Card.svelte';
  import Button from '../UI/forms/Button.svelte';
  import Input from '../UI/forms/Input.svelte';
  import DeleteModal from '../UI/modals/DeleteModal.svelte';
  import UpdateModal from '../UI/modals/UpdateModal.svelte';

  export let plan: TestPlanChart;
  export let project: ProjectsType;

  let openDeleteModal: boolean;
  let openUpdateModal: boolean;
  const titleOnDelete = `${project.title}/${plan.title}`;

  const fields: Array<UpdateFieldsModalobject> = [
    {
      component: Input,
      fieldLabel: 'Test Plan Tilte',
      fieldName: 'title',
      fieldValue: plan.title,
      validation: validateProjectName,
    },
  ];

  const onDelete = async () => {
    await testPlans.delete( project.id, plan.id ).then( () => {
      const plans: TestPlanChart[] = project.test_plans;
      const indx = project.test_plans.findIndex(
        ( _plan ) => plan.id === _plan.id,
      );
      plans.splice( indx, 1 );
      project.test_plans = plans;
      testPlansStore.set( project.test_plans );
      alertStore.set( {
        className: 'danger',
        close: true,
        message: 'Test Plan Deleted Successfully!',
        isOpen: openDeleteModal,
        title: 'Test Plan Deleted Successfully!',
      } );
      setTimeout( () => {
        openDeleteModal = false;
      }, 3000 );
    } );
  };

  const onUpdate = async ( testPlan: TestPlanChart ) => {
    await testPlans.update( project.id, plan.id, testPlan ).then( () => {
      const plans: TestPlanChart[] = project.test_plans;
      const indx = project.test_plans.findIndex(
        ( _plan ) => plan.id === _plan.id,
      );
      plans[indx] = testPlan;
      project.test_plans = plans;
      testPlansStore.set( project.test_plans );
      setTimeout( () => {
        openUpdateModal = false;
      }, 3000 );
    } );
  };
</script>

<Link
  to="/projects/{project.id}/test-plans/{plan.id}"
  class="text-primary d-block text-decoration-none"
>
  <Card
    cardClassBody={'pb-2'}
    cardClassName={'card-component mb-3'}
    cardClassHeader={'text-primary'}
  >
    <span slot="card-body">
      <h5 class="card-title">{plan.title}</h5>
      <div class="pt-4">
        <div class="row">
          <div class="col-6 col-md-6 col-sm-6 col-xs-12">
            <p class="text-color">
              Created: <strong>{plan.created}</strong>
            </p>
          </div>
          <div class="col-6 col-md-6 col-sm-6 col-xs-12">
            <p class="text-color">
              Updated: <strong>{plan.updated}</strong>
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
              tooltip="edit title"
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
    buffer={plan}
    {fields}
    on:update={async ( event ) => {
      await onUpdate( event.detail.data );
    }}
  />
{/if}
