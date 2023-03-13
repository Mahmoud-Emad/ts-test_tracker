<script lang="ts">
  import MemberDetailsComponent from '../components/members/MemberDetailsComponent.svelte';
  import { membersStore } from '../utils/store';

  export let isLoading: boolean;
</script>

<section>
  <MemberDetailsComponent bind:isLoading />
</section>

<svelte:head>
  {#if $membersStore.length}
    <title>Test-Tracker | {$membersStore[0].full_name}</title>
  {:else}
    <title>Test-Tracker | Members</title>
  {/if}
</svelte:head>
