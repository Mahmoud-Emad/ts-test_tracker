<script lang="ts">
  import { onMount } from 'svelte';
  import {
    alertStore,
    notifacationStore,
    testPlansStore,
  } from '../../utils/store';
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import NavBar from '../UI/navbar/Navbar.svelte';
  import NavAction from '../UI/navbar/NavAction.svelte';
  import {
    clearAlertMessage,
    clearNotifacationStore,
    filterStore,
  } from '../../utils/helpers';
  import Search from '../UI/Search.svelte';
  import PlanCard from './TestPlanCard.svelte';
  import Alert from '../UI/Alert.svelte';
  import CreatePlanModal from './CreatePlanModal.svelte';
  import { useParams } from 'svelte-navigator';
  import projects from '../../apis/projects';
  import type { ProjectsType } from '../../utils/types';

  export let isLoading: boolean;
  let openModal: boolean;
  let value: string;
  const params = useParams();
  let project: ProjectsType = {};

  onMount( async () => {
    isLoading = true;
    await testPlansStore.all( +$params.projectID );
    await projects.get( +$params.projectID ).then( ( resp ) => {
      if ( resp ) {
        project = resp;
      }
    } );
    isLoading = false;
  } );
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
      <p class="text-muted">
        There {$testPlansStore.length <= 1 ? 'is' : 'are'}
        <strong class="text-primary">{$testPlansStore.length}</strong>
        {$testPlansStore.length <= 1 ? 'plan' : 'plans'}
        associated.
      </p>
    </div>
    <Search
      label={'Search Plans'}
      store={testPlansStore}
      bind:value
      searchField={'title'}
    />
    <div class="container mt-3">
      {#each filterStore( $testPlansStore, 'title', value ) as plan}
        <PlanCard {plan} {project} />
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
