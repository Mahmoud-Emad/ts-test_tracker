<script lang="ts">
  import TestSuiteComponent from '../components/test_suites/TestSuiteComponent.svelte';
  export let isLoading: boolean;
</script>

<TestSuiteComponent bind:isLoading />

<svelte:head>
  <title>Test-Tracker | Test Suites</title>
</svelte:head>
