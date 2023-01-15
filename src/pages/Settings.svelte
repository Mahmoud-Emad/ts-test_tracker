<script lang="ts">
    import SettingsComponent from "../components/Settings/SettingsComponent.svelte";
    export let isLoading: boolean = false;
</script>

<section class="container-fluid">
    <SettingsComponent bind:isLoading/>
</section>

<svelte:head>
    <title>Test-Tracker | Settings</title>
</svelte:head>