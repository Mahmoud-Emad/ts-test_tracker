<script lang="ts">
  import RequirementsDocComponent from '../components/requirements/RequirementsDocComponent.svelte';
  export let isLoading: boolean;
</script>

<RequirementsDocComponent bind:isLoading />

<svelte:head>
  <title>Test-Tracker | Test Requirement Docs</title>
</svelte:head>
