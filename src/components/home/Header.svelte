<script lang="ts">
  import { userStore } from '../../stores/users';
  import { recentProjectsStore } from '../../stores/projects';
  import Loadingbtn from '../UI/loading/Loadingbtn.svelte';

  export let isLoading: boolean;
</script>

<div class="pt-0">
  {#if $userStore.permission === 'admin'}
    <p class="h5">
      <span class="text-primary"> Admin </span>
      Dashboard
    </p>
    <p class="text-color">
      Last
      <strong class="text-primary">
        {#if isLoading}
          <Loadingbtn />
        {:else}
          {$recentProjectsStore.length}
        {/if}
      </strong>
      {$recentProjectsStore.length <= 1 ? 'project' : 'projects'}
      updated.
    </p>
  {:else if $recentProjectsStore && $userStore.permission !== 'admin'}
    <p class="h5">
      <span class="text-primary"> Member </span>
      Dashboard
    </p>
    <p class="text-muted">
      You are <strong class="text-primary">{$userStore.permission}</strong> of
      <strong>{$recentProjectsStore.length}</strong>
      {$recentProjectsStore.length === 1 ? 'project' : 'projects'}
    </p>
  {/if}
</div>
