<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '../utils/store';

  onMount( () => {
    authStore.removeSession();
    window.location.href = '/';
  } );
</script>

<svelte:head>
  <title>Test-Tracker | Logout</title>
</svelte:head>
