<script lang="ts">
  import { onMount } from 'svelte';
  import Header from './Header.svelte';
  import RecentProjectsUpdated from './RecentProjectsUpdated.svelte';
  import Search from '../UI/Search.svelte';
  import {
    projectsActivitiesStore,
    recentProjectsStore,
  } from '../../stores/projects';
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import NavBar from '../UI/navbar/Navbar.svelte';
  import NavAction from '../UI/navbar/NavAction.svelte';
  import Dashboard from '../../apis/dashboard';
  import CreateNewProject from '../projects/CreateNewProject.svelte';
  import ActivityTable from './ActivityTable.svelte';

  export let isLoading = false;
  let value = '';
  let openModal = false;
  let loadProjects = false;
  let loadActivities = false;

  onMount( async () => {
    // Load and update recent projects updated store.
    isLoading = true;
    loadProjects = true;
    loadActivities = true;
    await Dashboard.recentProjectsUpdated( 5 )
      .then( ( data ) => {
        if ( data ) {
          recentProjectsStore.set( data );
        }
      } )
      .finally( () => {
        loadProjects = false;
      } );

    await Dashboard.recentProjectsActivity(5)
      .then( ( data ) => {
        if ( data ) {
          projectsActivitiesStore.set( data );
        }
      } )
      .finally( () => {
        loadActivities = false;
        isLoading = false;
      } );
  } );
</script>

{#if isLoading}
  <LoadingComponent className={'page'} />
{:else}
  <NavBar>
    <NavAction
      slot="action-btn"
      tooltip={'Create new project'}
      onClick={() => {
        openModal = true;
      }}
    />
  </NavBar>
  <div class="container pt-4">
    <Header bind:isLoading />
    <Search
      label={'Search Members'}
      store={recentProjectsStore}
      searchField={'title'}
      bind:value
    />
    <RecentProjectsUpdated bind:loadProjects bind:value />
    <ActivityTable bind:loadActivities />
  </div>
  <CreateNewProject
    bind:openModal
    on:create={() => {
      recentProjectsStore.reload( 4 );
      projectsActivitiesStore.reload();
    }}
  />
{/if}
