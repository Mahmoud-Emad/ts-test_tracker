<script lang="ts">
    import { onMount } from "svelte";
    import ProjectsComponent from "../components/projects/ProjectsComponent.svelte";
    import { projectsStore } from "../utils/stores";
    export let isLoading: boolean = false;

    onMount(async () => {
        await projectsStore.reload();
    });
</script>

<section>
    <ProjectsComponent bind:isLoading/>
</section>

<svelte:head>
    <title>Test-Tracker | Projects</title>
</svelte:head>