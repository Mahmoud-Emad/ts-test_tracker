<script lang="ts">
    import { onMount } from "svelte";
    import MembersComponent from "../components/Members/MembersComponent.svelte";
    import { clearAlertMessage, clearNotifacationStore } from "../utils/helpers";
    export let isLoading: boolean = false;

    onMount(() => {
        // clearAlertMessage();
		// clearNotifacationStore();
    });
</script>

<section>
    <MembersComponent bind:isLoading/>
</section>

<svelte:head>
    <title>Test-Tracker | Members</title>
</svelte:head>