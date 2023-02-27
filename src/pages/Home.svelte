<script lang="ts">
    import HomeComponent from "../components/home/HomeComponent.svelte";
    import { onMount } from "svelte";
    import { clearAlertMessage, clearNotifacationStore } from "../utils/helpers";
    
    export let isLoading: boolean;

    onMount(() => {
        // clearAlertMessage();
		// clearNotifacationStore();
    });
	
</script>

<section>
    <HomeComponent bind:isLoading/>
</section>

<svelte:head>
    <title>Test-Tracker | Home</title>
</svelte:head>