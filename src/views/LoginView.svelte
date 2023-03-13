<script lang="ts">
  import LoginComponent from '../components/auth/signin/LoginComponent.svelte';
  export let isLoading: boolean;
</script>

<LoginComponent bind:isLoading />

<svelte:head>
  <title>Test-Tracker | Login</title>
</svelte:head>
