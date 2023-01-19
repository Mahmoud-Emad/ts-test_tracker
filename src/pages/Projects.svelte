<script lang="ts">
    import { onMount } from "svelte";
    import ProjectsComponent from "../components/projects/ProjectsComponent.svelte";
    import { clearAlertMessage, clearNotifacationStore } from "../utils/helpers";
    export let isLoading: boolean = false;

    onMount(() => {
        clearAlertMessage();
		clearNotifacationStore();
    });
</script>

<section>
    <ProjectsComponent bind:isLoading/>
</section>

<svelte:head>
    <title>Test-Tracker | Projects</title>
</svelte:head>