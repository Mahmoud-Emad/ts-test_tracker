<script lang="ts">
  import TestPlansComponent from '../components/test_plans/TestPlansComponent.svelte';
  export let isLoading: boolean;
</script>

<TestPlansComponent bind:isLoading />

<svelte:head>
  <title>Test-Tracker | Test Plans</title>
</svelte:head>
