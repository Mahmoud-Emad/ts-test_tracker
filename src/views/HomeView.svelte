<script lang="ts">
  import HomeComponent from '../components/home/HomeComponent.svelte';
  export let isLoading: boolean;
</script>

<HomeComponent bind:isLoading />

<svelte:head>
  <title>Test-Tracker | Home</title>
</svelte:head>
