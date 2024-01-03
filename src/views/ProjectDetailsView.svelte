<script lang="ts">
  import ProjectDetailComponent from '../components/projects/ProjectsDetailsComponent.svelte';
  import { projectsStore } from '../stores/projects';

  export let isLoading: boolean;
</script>

<ProjectDetailComponent bind:isLoading />

<svelte:head>
  {#if $projectsStore.length}
    <title>Test-Tracker | {$projectsStore[0].title}</title>
  {:else}
    <title>Test-Tracker | Projects</title>
  {/if}
</svelte:head>
