<!-- TestPlanDetailsComponent.svelte -->
<script lang="ts">
  import TestPlanDetailsComponent from '../components/test_plans/TestPlanDetailsComponent.svelte';
  import { testPlansStore } from '../utils/store';

  export let isLoading: boolean;
</script>

<section>
  <TestPlanDetailsComponent bind:isLoading />
</section>

<svelte:head>
  {#if $testPlansStore.length}
    <title>Test-Tracker | {$testPlansStore[0].title}</title>
  {:else}
    <title>Test-Tracker | Test Plan Details</title>
  {/if}
</svelte:head>
