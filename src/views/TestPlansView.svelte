<script lang="ts">
  import TestPlansComponent from '../components/test_plans/TestPlansComponent.svelte';
  export let isLoading: boolean;
</script>

<section>
  <TestPlansComponent bind:isLoading />
</section>

<svelte:head>
  <title>Test-Tracker | Test Plans</title>
</svelte:head>
