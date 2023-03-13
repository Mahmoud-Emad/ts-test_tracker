<script lang="ts">
  import MembersComponent from '../components/members/MembersComponent.svelte';
  export let isLoading: boolean;
</script>

<section>
  <MembersComponent bind:isLoading />
</section>

<svelte:head>
  <title>Test-Tracker | Members</title>
</svelte:head>
