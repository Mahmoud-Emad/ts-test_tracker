<script lang="ts">
    import { onMount } from "svelte";
    import SettingsComponent from "../components/Settings/SettingsComponent.svelte";
    import { clearAlertMessage, clearNotifacationStore } from "../utils/helpers";
    export let isLoading: boolean = false;

    // onMount(() => {
    //     clearAlertMessage();
	// 	clearNotifacationStore();
    // });
</script>

<section>
    <SettingsComponent bind:isLoading/>
</section>

<svelte:head>
    <title>Test-Tracker | Settings</title>
</svelte:head>