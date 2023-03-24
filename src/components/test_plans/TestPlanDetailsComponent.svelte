<script lang="ts">
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import testPlans from '../../apis/testPlan';
  import {
    testPlanSectionsStore,
    testPlansStore,
  } from '../../stores/test_plans';
  import { alertStore, notifacationStore } from '../../stores/utils';
  import type { TestPlanChart, TestPlanSection } from '../../utils/types';
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import NavBar from '../UI/navbar/Navbar.svelte';
  import Alert from '../UI/Alert.svelte';
  import NavAction from '../UI/navbar/NavAction.svelte';
  import {
    clearAlertMessage,
    clearNotifacationStore,
    filterStore,
  } from '../../utils/helpers';
  import Card from '../UI/cards/Card.svelte';
  import Search from '../UI/Search.svelte';
  import Button from '../UI/forms/Button.svelte';
  import TestPlanActions from './TestPlanActions.svelte';
  import LastUpdatedCard from '../UI/cards/LastUpdatedCard.svelte';

  export let isLoading: boolean;

  const params = useParams();
  const projectID = $params.projectID;
  const planID = $params.planID;

  let openModal: boolean;
  let testPlan: TestPlanChart = {};
  let value = '';
  let openDeleteModal: boolean;
  let openInputsModal: boolean;
  let openViewModal: boolean;
  let selectedSection: TestPlanSection;

  onMount( async () => {
    isLoading = true;
    await testPlans.get( +projectID, +planID ).then( ( resp ) => {
      if ( resp ) {
        testPlan = resp;
        testPlansStore.set( [ testPlan ] );
        testPlanSectionsStore.set( testPlan.temps );
      }
    } );
    isLoading = false;
  } );
</script>

{#if isLoading}
  <LoadingComponent className="page" />
{:else if testPlan && testPlan.title}
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
        <span class="text-primary"> Test-Plan | </span>
        {testPlan.title}
      </p>
      <p class="text-color">
        There {testPlan.temps.length <= 1 ? 'is' : 'are'}
        <strong class="text-primary">{testPlan.temps.length}</strong>
        {testPlan.temps.length <= 1 ? 'Text Content' : 'Text Contents'}
        Associated.
      </p>
    </div>
    <LastUpdatedCard obj={testPlan} />
    <Search
      label={'Search Test Plan Contents'}
      store={testPlansStore}
      bind:value
      searchField={'title'}
    />
    <div class="pt-5">
      <div class="row">
        {#each filterStore( $testPlanSectionsStore, 'title', value ) as section}
          <div class="col-6">
            <Card
              withFooter={true}
              cardClassBody={'pb-2 card-body-overflow-130-h'}
              cardClassName={'mb-3'}
            >
              <span slot="card-body">
                <h5 class="card-title text-primary text-center">
                  {section.title}
                </h5>
                <p class="mt-4 text-color text-center">
                  {section.content.length <= 60
                    ? section.content
                    : section.content.slice( 0, 60 ) + '...'}
                </p>
              </span>
              <div slot="card-footer" class="text-center">
                <Button
                  icon="fa fa-eye"
                  onClick={() => {
                    openViewModal = true;
                    selectedSection = section;
                  }}
                  className="btn-simple test-plan-content-actions-btns"
                  text=""
                  tooltip="View"
                />
                <Button
                  icon="fa fa-pencil"
                  onClick={() => {
                    openInputsModal = true;
                    selectedSection = section;
                  }}
                  className="btn-simple test-plan-content-actions-btns"
                  text=""
                  tooltip="Edit"
                />
                <Button
                  icon="fa fa-trash"
                  onClick={() => {
                    openDeleteModal = true;
                    selectedSection = section;
                  }}
                  className="btn-simple btn-trash test-plan-content-actions-btns"
                  text=""
                  tooltip="Delete"
                />
              </div>
            </Card>
          </div>
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
  </div>
  {#if selectedSection}
    <TestPlanActions
      bind:openDeleteModal
      bind:openViewModal
      bind:openInputsModal
      {projectID}
      {testPlan}
      {selectedSection}
    />
  {/if}
{/if}
