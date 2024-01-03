<script lang="ts">
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import NavBar from '../UI/navbar/Navbar.svelte';
  import NavAction from '../UI/navbar/NavAction.svelte';
  import { alertStore, notifacationStore } from '../../stores/utils';
  import {
    clearAlertMessage,
    clearNotifacationStore,
    filterStore,
  } from '../../utils/helpers';
  import { testSuiteStore } from '../../stores/test_suites';
  import {
    ObjectTypeEnum,
    RequestActionEnum,
    type FieldsModalObject,
    type ProjectsType,
    type TestSuiteChart,
  } from '../../utils/types';
  import { onMount } from 'svelte';
  import projects from '../../apis/projects';
  import { useParams } from 'svelte-navigator';
  import Search from '../UI/Search.svelte';
  import Alert from '../UI/Alert.svelte';
  import ListCard from '../UI/cards/ListCard.svelte';
  import { validateProjectName } from '../../utils/validators';
  import Input from '../UI/forms/Input.svelte';
  import InputsModal from '../UI/modals/InputsModal.svelte';
  import SelectAria from '../UI/forms/SelectAria.svelte';

  export let isLoading: boolean;
  let openEditModal: boolean;
  let openDeleteModal: boolean;
  let openModal: boolean;
  let project: ProjectsType;
  let value = '';
  let selectedTestPlanID: number;
  const testSuiteBuffer: TestSuiteChart = {};
  const params = useParams();

  onMount( async () => {
    isLoading = true;
    await projects.get( +$params.projectID ).then( ( resp ) => {
      if ( resp ) {
        project = resp;
        testSuiteStore.set( project.total_suites );
      }
    } );
    isLoading = false;
  } );

  const getFields = ( suite?: TestSuiteChart ): Array<FieldsModalObject> => {
    return [
      {
        component: Input,
        fieldLabel: 'Test Suite Tilte',
        fieldName: 'title',
        fieldValue: suite ? suite.title : '',
        validation: validateProjectName,
      },
      {
        component: SelectAria,
        fieldLabel: 'Test Plan',
        fieldName: 'test_plan',
        fieldValue: project.total_test_plan,
        onClick: ( id: number ) => {
          selectedTestPlanID = id;
        },
      },
    ];
  };
</script>

{#if isLoading}
  <LoadingComponent className="page" />
{:else if project && project.title}
  <NavBar projectView={true}>
    <NavAction
      slot="action-btn"
      tooltip={'New Test Suite'}
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
        | Test-Suites
      </p>
      <p class="text-color">
        There {$testSuiteStore.length <= 1 ? 'is' : 'are'}
        <strong class="text-primary">{$testSuiteStore.length}</strong>
        {$testSuiteStore.length <= 1 ? 'suite' : 'suites'}
        associated.
      </p>
    </div>
    <Search
      label={'Search Suite\'s'}
      store={testSuiteStore}
      bind:value
      searchField={'title'}
    />
    <div class="container mt-3">
      {#each filterStore( $testSuiteStore, 'title', value ) as suite}
        <ListCard
          {project}
          item={suite}
          type={ObjectTypeEnum.testSuite}
          to="/projects/{project.id}/test-suites/{suite.id}"
          {openEditModal}
          {openDeleteModal}
          updateFields={getFields( suite )}
          on:delete={async () => {
            return await testSuiteStore.remove( project.id, suite.id );
          }}
          on:update={async ( e ) => {
            return await testSuiteStore.edit(
              project.id,
              suite.id,
              e.detail.updatedItem,
            );
          }}
        />
      {:else}
        <Alert
          className={'light not-available'}
          isOpen={true}
          close={false}
          message={'There are no suites inside this project, try to create new one from the navbar.'}
        />
      {/each}
    </div>
  </div>
  <InputsModal
    bind:openModal
    action={RequestActionEnum.create}
    fields={getFields()}
    buffer={testSuiteBuffer}
    type={ObjectTypeEnum.testSuite}
    on:create={async () => {
      console.log( 'testSuiteBuffer', testSuiteBuffer );
      testSuiteBuffer.test_plan = testSuiteBuffer.test_plan.filter(
        ( plan ) => plan.id === selectedTestPlanID,
      )[0].id;
      console.log( 'Changed, ', testSuiteBuffer );

      return await testSuiteStore.create(project.id, testSuiteBuffer);
    }}
  />
{/if}
