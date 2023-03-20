<script lang="ts">
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import projects from '../../apis/projects';
  import { requirementsStore } from '../../stores/requirements';
  import type { ProjectsType, RequirementsDocChart } from '../../utils/types';
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import NavBar from '../UI/navbar/Navbar.svelte';
  import NavAction from '../UI/navbar/NavAction.svelte';
  import {
    clearAlertMessage,
    clearNotifacationStore,
    filterStore,
  } from '../../utils/helpers';
  import { alertStore, notifacationStore } from '../../stores/utils';
  import Alert from '../UI/Alert.svelte';
  import Search from '../UI/Search.svelte';
  import CardExpand from '../UI/cards/CardExpand.svelte';
  import LastUpdatedCard from '../UI/cards/LastUpdatedCard.svelte';

  export let isLoading: boolean;
  const params = useParams();
  let project: ProjectsType = {};
  let document: RequirementsDocChart;
  let openModal: boolean;
  let value: string;

  onMount( async () => {
    isLoading = true;
    await projects.get( +$params.projectID ).then( ( resp ) => {
      if ( resp ) {
        project = resp;
        const indx = project.requirements_docs.findIndex(
          ( doc ) => +$params.documentID === doc.id,
        );
        document = project.requirements_docs[indx];
        requirementsStore.set( document.requirements );
      }
    } );
    isLoading = false;
  } );
</script>

{#if isLoading}
  <LoadingComponent className="page" />
{:else if document && document.title}
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
          Requirement Document
        </span>
       | {document.title}
      </p>
      <p class="text-color">
        There {document.requirements.length <= 1 ? 'is' : 'are'}
        <strong class="text-primary">{document.requirements.length}</strong>
        {document.requirements.length <= 1 ? 'requirement' : 'requirements'}
        associated.
      </p>
    </div>
    <LastUpdatedCard obj={document}/>
    <Search
      label={'Search Requirement\'s'}
      store={requirementsStore}
      bind:value
      searchField={'title'}
    />
    <div class="container mt-3">
      {#each filterStore( $requirementsStore, 'title', value ) as requirement}
        <CardExpand item={requirement} />
      {:else}
        <Alert
          className={'light not-available'}
          isOpen={true}
          close={false}
          message={'There are no requirements inside this document, try to create new one from the navbar.'}
        />
      {/each}
    </div>
  </div>
{/if}
