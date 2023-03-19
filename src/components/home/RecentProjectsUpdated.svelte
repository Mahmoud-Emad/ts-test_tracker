<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { filterStore } from '../../utils/helpers';
  import { recentProjectsStore } from '../../stores/projects';
  import Alert from '../UI/Alert.svelte';
  import Card from '../UI/Card.svelte';
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  export let loadProjects: boolean;
  export let value: string;
</script>

<section class="projects mb-4">
  {#if $recentProjectsStore.length}
    <div class="mt-2">
      <Alert
        isOpen={true}
        message={`Last ${$recentProjectsStore.length} ${
          $recentProjectsStore.length > 1 ? 'Projects' : 'Project'
        } Updated`}
        className={'light not-available mt-2 mb-5'}
        close={false}
      />
    </div>
  {/if}
  {#if loadProjects}
    <div class="mt-4 pt-4">
      <LoadingComponent className={'component'} />
    </div>
  {:else}
    <div class="row p-1">
      {#each filterStore( $recentProjectsStore, 'title', value ) as project}
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
                <span>Created at: </span><span class="card-subtitle mt-2 h6">
                  {project.created}</span
                >
              </div>
            </Link>
          </Card>
        </div>
      {:else}
        <h6 class="text-color mb-3 mt-3">Last projects updated section.</h6>
        <Alert
          className={'light not-available'}
          isOpen={true}
          close={false}
          message={'There are no projects, try to create new one from the navbar.'}
        />
      {/each}
    </div>
  {/if}
</section>

<style>
  .projects {
    overflow: hidden;
  }
</style>
