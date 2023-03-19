<script lang="ts">
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import { projectsActivitiesStore } from '../../stores/projects';
  import Alert from '../UI/Alert.svelte';
  import type { ProjectActivity } from '../../utils/types';

  export let loadActivities: boolean;

  const getDate = ( action: ProjectActivity ): string => {
    const updatedDay: number = +action.date.split( '-' )[2];
    const today: number = new Date().getDate();
    if ( updatedDay === today ) {
      return 'Today';
    } else if ( updatedDay === today - 1 ) {
      return 'Yesterday';
    } else {
      return action.date;
    }
  };
</script>

<section class="activity mb-4 pb-4">
  {#if $projectsActivitiesStore.length}
    <div class="mt-2">
      <Alert
        isOpen={true}
        message={`Last ${$projectsActivitiesStore.length} ${
          $projectsActivitiesStore.length > 1 ? 'Activities' : 'Activity'
        }`}
        className={'light not-available mt-2 mb-5'}
        close={false}
      />
    </div>
  {/if}
  {#if loadActivities}
    <div class="mt-4">
      <LoadingComponent className={'component'} />
    </div>
  {:else}
    <div class="table">
      {#each $projectsActivitiesStore as action}
        {#if action.date && action.action}
          <table class="table align-middle mb-3">
            <thead class="table-bg">
              <tr>
                <th>
                  <span class="badge badge-success rounded-pill d-inline">
                    {getDate( action )}</span
                  >
                  <span class="badge rounded-pill d-inline text-color"
                    >Action Date</span
                  >
                </th>
              </tr>
            </thead>
            <thead class="table-bg">
              <tr>
                <td>
                  <div class="d-inline b-0">
                    <div class="ms-3">
                      <p class="text-color mb-0">
                        {action.action}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </thead>
          </table>
        {/if}
      {:else}
          <h6 class="text-color mb-3">Activities section.</h6>
        <Alert
          close={false}
          message={'Seems to be no activities available'}
          className={'light not-available'}
          isOpen={true}
        />
      {/each}
    </div>
  {/if}
</section>
