<script lang="ts">
  import { onMount } from 'svelte';
  import { userStore, projectsStore } from '../../utils/store';
  import Loadingbtn from '../UI/loading/Loadingbtn.svelte';

  export let isLoading: boolean;

  onMount( async () => {
    if ( !$projectsStore.length ) {
      isLoading = true;
      await projectsStore.reload();
      isLoading = false;
    }
  } );
</script>

<div class="pt-0">
  {#if $userStore.permission === 'admin'}
    <p class="h5">
      <span class="text-primary"> Admin </span>
      Dashboard
    </p>
    <p class="text-muted">
      There {$projectsStore.length <= 1 ? 'is' : 'are'}
      <strong class="text-primary">
        {#if isLoading}
          <Loadingbtn />
        {:else}
          {$projectsStore.length}
        {/if}
      </strong>
      {$projectsStore.length <= 1 ? 'project' : 'projects'}
      associated.
    </p>
  {:else if $projectsStore && $userStore.permission !== 'admin'}
    <p class="h5">
      <span class="text-primary"> Member </span>
      Dashboard
    </p>
    <p class="text-muted">
      You are <strong class="text-primary">{$userStore.permission}</strong> of
      <strong>{$projectsStore.length}</strong>
      {$projectsStore.length === 1 ? 'project' : 'projects'}
    </p>
  {/if}
</div>
