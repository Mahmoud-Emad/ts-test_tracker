<!-- TestPlanDetailsComponent.svelte -->
<script lang="ts">
  import RequirementDetailsComponent from '../components/requirements/RequirementDetailsComponent.svelte';
  import { requirementsDocStore } from '../stores/requirements';

  export let isLoading: boolean;
</script>

<section>
  <RequirementDetailsComponent bind:isLoading />
</section>

<svelte:head>
  {#if $requirementsDocStore.length}
    <title>Test-Tracker | {$requirementsDocStore[0].title}</title>
  {:else}
    <title>Test-Tracker | Requirement Document Details</title>
  {/if}
</svelte:head>
