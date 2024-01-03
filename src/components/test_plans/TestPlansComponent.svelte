<script lang="ts">
  import { onMount } from 'svelte';
  import { testPlansStore } from '../../stores/test_plans';
  import { alertStore, notifacationStore } from '../../stores/utils';
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import NavBar from '../UI/navbar/Navbar.svelte';
  import NavAction from '../UI/navbar/NavAction.svelte';
  import {
    clearAlertMessage,
    clearNotifacationStore,
    filterStore,
  } from '../../utils/helpers';
  import Search from '../UI/Search.svelte';
  import Alert from '../UI/Alert.svelte';
  import CreatePlanModal from './CreatePlanModal.svelte';
  import { useParams } from 'svelte-navigator';
  import projects from '../../apis/projects';
  import {
    ObjectTypeEnum,
    type FieldsModalObject,
    type ProjectsType,
    type TestPlanChart,
  } from '../../utils/types';
  import ListCard from '../UI/cards/ListCard.svelte';
  import { validateProjectName } from '../../utils/validators';
  import Input from '../UI/forms/Input.svelte';
  import testPlans from '../../apis/test_plan';

  export let isLoading: boolean;
  let openEditModal: boolean;
  let openDeleteModal: boolean;

  let openModal: boolean;
  let value: string;
  const params = useParams();
  let project: ProjectsType = {};

  onMount( async () => {
    isLoading = true;
    await projects.get( +$params.projectID ).then( ( resp ) => {
      if ( resp ) {
        project = resp;
        testPlansStore.set( project.test_plans );
      }
    } );
    isLoading = false;
  } );

  const getFields = ( plan: TestPlanChart ): Array<FieldsModalObject> => {
    return [
      {
        component: Input,
        fieldLabel: 'Test Plan Tilte',
        fieldName: 'title',
        fieldValue: plan.title,
        validation: validateProjectName,
      },
    ];
  };

  const onUpdate = async (
    actualTextPlan: TestPlanChart,
    updatedTestPlan: TestPlanChart,
  ) => {
    await testPlans
      .update( project.id, actualTextPlan.id, updatedTestPlan )
      .then( () => {
        const plans: TestPlanChart[] = project.test_plans;
        const indx = project.test_plans.findIndex(
          ( _plan ) => actualTextPlan.id === _plan.id,
        );
        plans[indx] = updatedTestPlan;
        project.test_plans = plans;
        testPlansStore.set( project.test_plans );
        setTimeout( () => {
          openEditModal = false;
        }, 3000 );
      } );
  };

  const onDelete = async ( testPlan: TestPlanChart ) => {
    await testPlans.delete( project.id, testPlan.id ).then( () => {
      const plans: TestPlanChart[] = project.test_plans;
      const indx = project.test_plans.findIndex(
        ( _plan ) => testPlan.id === _plan.id,
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
</script>

{#if isLoading}
  <LoadingComponent className="page" />
{:else if project && project.title}
  <NavBar projectView={true}>
    <NavAction
      slot="action-btn"
      tooltip={'Create New Test Plan'}
      onClick={() => {
        if ( $alertStore.isOpen || $notifacationStore.isOpen ) {
          clearAlertMessage();
          clearNotifacationStore();
        }
        openModal = true;
      }}
    />
  </NavBar>
  <div class="container pt-4 pb-4">
    <div class="pt-0">
      <p class="h5">
        <span class="text-primary">
          {project.title}
        </span>
        | Test-Plans
      </p>
      <p class="text-color">
        There {$testPlansStore.length <= 1 ? 'is' : 'are'}
        <strong class="text-primary">{$testPlansStore.length}</strong>
        {$testPlansStore.length <= 1 ? 'plan' : 'plans'}
        associated.
      </p>
    </div>
    <Search
      label={'Search Plan\'s'}
      store={testPlansStore}
      bind:value
      searchField={'title'}
    />
    <div class="container mt-3">
      {#each filterStore( $testPlansStore, 'title', value ) as plan}
        <ListCard
          {project}
          item={plan}
          type={ObjectTypeEnum.testSuite}
          to="/projects/{project.id}/test-plans/{plan.id}"
          {openEditModal}
          {openDeleteModal}
          updateFields={getFields( plan )}
          on:delete={() => {
            return onDelete( plan );
          }}
          on:update={( e ) => {
            return onUpdate( plan, e.detail.updatedItem );
          }}
        />
      {:else}
        <Alert
          className={'light not-available'}
          isOpen={true}
          close={false}
          message={'There are no plans inside this project, try to create new one from the navbar.'}
        />
      {/each}
    </div>
  </div>
  {#if openModal}
    <CreatePlanModal bind:openModal {project} />
  {/if}
{/if}
