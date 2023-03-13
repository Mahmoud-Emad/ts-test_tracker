<script lang="ts">
  import ProjectsComponent from '../components/projects/ProjectsComponent.svelte';
  export let isLoading: boolean;
</script>

<section>
  <ProjectsComponent bind:isLoading />
</section>

<svelte:head>
  <title>Test-Tracker | Projects</title>
</svelte:head>
