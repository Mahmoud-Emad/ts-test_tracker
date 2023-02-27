<script lang="ts">
    import { onMount } from "svelte";
    import TestPlanComponent from "../components/test_plans/TestPlanComponent.svelte";
    import { useParams } from 'svelte-navigator';
    import type { projectsType } from "../utils/types";
    import { projectsStore } from "../utils/stores";

    export let isLoading: boolean = false;

    const params = useParams();
    let projectID: number = Number($params.id);
    let project: projectsType = {};

    onMount(async () => {

    });

</script>

{#if $projectsStore.length > 0}
    <section>
        <TestPlanComponent bind:isLoading />
    </section>
{/if}

<svelte:head>
    {#if $projectsStore.length > 0}
        <title>Test-Tracker | {$projectsStore[0].title}</title>
    {:else}
        <title>Test-Tracker | Projects</title>
    {/if}
</svelte:head>