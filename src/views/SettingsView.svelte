<script lang="ts">
  import { onMount } from 'svelte';
  import SettingsComponent from '../components/settings/SettingsComponent.svelte';
  import { clearAlertMessage, clearNotifacationStore } from '../utils/helpers';
  export let isLoading: boolean;

  onMount( () => {
    clearAlertMessage();
    clearNotifacationStore();
  } );
</script>

<section>
  <SettingsComponent bind:isLoading />
</section>

<svelte:head>
  <title>Test-Tracker | Settings</title>
</svelte:head>
