<script lang="ts">
  import { onMount } from 'svelte';
  import { alertStore, notifacationStore } from '../../stores/utils';
  import { projectsStore } from '../../stores/projects';
  import NavBar from '../UI/navbar/Navbar.svelte';
  import NavAction from '../UI/navbar/NavAction.svelte';
  import {
    clearAlertMessage,
    clearNotifacationStore,
    filterStore,
  } from '../../utils/helpers';
  import Search from '../UI/Search.svelte';
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import Card from '../UI/cards/Card.svelte';
  import Alert from '../UI/Alert.svelte';
  import { Link } from 'svelte-navigator';
  import Loadingbtn from '../UI/loading/Loadingbtn.svelte';

  export let isLoading: boolean;

  let openModal = false;
  let value = '';

  onMount( async () => {
    isLoading = true;
    await projectsStore.reload();
    isLoading = false;
  } );
</script>

<section class="projects">
  <NavBar>
    <NavAction
      slot="action-btn"
      tooltip={'Create New Project'}
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
    <span class="text-primary h5"> Projects </span>
    <p class="text-color">
      There are
      <strong class="text-primary">
        {#if isLoading}
          <Loadingbtn />
        {:else}
          {$projectsStore.length}
        {/if}
      </strong>
      {$projectsStore.length === 1 ? 'project' : 'projects'} associated.
    </p>
    <Search
      label={'Search Project\'s'}
      store={projectsStore}
      bind:value
      searchField={'title'}
    />
    <div class="pt-5">
      {#if isLoading}
        <LoadingComponent className="component" />
      {:else}
        <div class="row">
          {#each filterStore( $projectsStore, 'title', value ) as project}
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-5 mb-md-2 pb-3">
              <Card cardClassBody="p-1">
                <Link
                  to="/projects/{project.id}/"
                  class="text-decoration-none"
                  slot="card-body"
                >
                  <div class="card-body text-primary">
                    <p class="card-title h5 ">
                      {project.title.length > 25
                        ? project.title.slice( 0, 25 ) + '..'
                        : project.title}
                    </p>
                    <span>Created at: </span><span
                      class="card-subtitle mt-2 h6"
                    >
                      {project.created}</span
                    >
                  </div>
                </Link>
              </Card>
            </div>
          {:else}
            <Alert
              className={'light not-available'}
              isOpen={true}
              close={false}
              message={'There are no projects, try to create new one from the navbar.'}
            />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
