<script lang="ts">
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import projects from '../../apis/projects';
  import {
    alertStore,
    notifacationStore,
    requirementsDocStore,
  } from '../../utils/store';
  import type { ProjectsType } from '../../utils/types';
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
  import RequirementDocCard from './RequirementDocCard.svelte';
  import CreateRequirementDocModal from './CreateRequirementDocModal.svelte';

  export let isLoading: boolean;

  const params = useParams();
  let project: ProjectsType = {};
  let openModal: boolean;
  let value = '';

  onMount( async () => {
    isLoading = true;
    await projects.get( +$params.projectID ).then( ( resp ) => {
      if ( resp ) {
        project = resp;
        requirementsDocStore.set( project.requirements_docs );
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
        | Requirements Document
      </p>
      <p class="text-color">
        There {$requirementsDocStore.length <= 1 ? 'is' : 'are'}
        <strong class="text-primary">{$requirementsDocStore.length}</strong>
        {$requirementsDocStore.length <= 1 ? 'document' : 'document'}
        associated.
      </p>
    </div>
    <Search
      label={'Search Document\'s'}
      store={requirementsDocStore}
      bind:value
      searchField={'title'}
    />
    <div class="container mt-3">
      {#each filterStore( $requirementsDocStore, 'title', value ) as document}
        <RequirementDocCard {document} {project} />
      {:else}
        <Alert
          className={'light not-available'}
          isOpen={true}
          close={false}
          message={'There are no requirement documents inside this project, try to create new one from the navbar.'}
        />
      {/each}
    </div>
  </div>
  {#if openModal}
    <CreateRequirementDocModal bind:openModal {project} />
  {/if}
{/if}
