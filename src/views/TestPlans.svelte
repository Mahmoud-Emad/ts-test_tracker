<script lang="ts">
    import { onMount } from "svelte";
    import TestPlansComponent from "../components/test_plans/TestPlansComponent.svelte";
    import { useParams } from 'svelte-navigator';
    import type { projectsType } from "../utils/types";
    import { isError404, projectsActivitiesStore, projectsStore } from "../utils/stores";
    import Projects from "../apis/projects";

    export let isLoading: boolean = false;

    const params = useParams();
    let projectID: number = Number($params.id);
    let project: projectsType = {};

    onMount(async () => {
        const response = await Projects.get(projectID)
        if(response){
            project = response
            projectsActivitiesStore.set(project.activity)
            projectsStore.set([project])
        } else{
            $isError404 = true;
        };
    });

</script>

{#if $projectsStore.length > 0}
    <section>
        <TestPlansComponent bind:isLoading />
    </section>
{/if}

<svelte:head>
    <title>Test-Tracker | Test Plans</title>
</svelte:head>