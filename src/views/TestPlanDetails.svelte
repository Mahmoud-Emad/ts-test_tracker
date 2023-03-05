<!-- TestPlanDetailsComponent.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import TestPlanDetailsComponent from "../components/test_plans/TestPlanDetailsComponent.svelte";
    import type { projectsType, TestPlanChart } from "../utils/types";
    import { isError404, projectsActivitiesStore, projectsStore, testPlansStore } from "../utils/stores";
    import Projects from "../apis/projects";
    import testPlans from "../apis/testPlan";

    export let isLoading: boolean = false;

    const currentRoute: string = window.location.pathname
    const projectID = +currentRoute.split("/")[2];
    const testPlanID = +currentRoute.split("/")[4];

    let project: projectsType = {};
    let testPlan: TestPlanChart = {};

    onMount(async () => {        
        if (projectID && testPlanID){
            const projectResponse = await Projects.get(projectID);
            const testPlanResponse = await testPlans.get(projectID, testPlanID);
            if (projectResponse && testPlanResponse){
                project = projectResponse;
                testPlan = testPlanResponse
                projectsActivitiesStore.set(project.activity);
                projectsStore.set([project]);
                testPlansStore.set([testPlan])
            } else {
                $isError404 = true;
            };
        } else {
            $isError404 = true;
        };
    });

</script>

{#if $projectsStore.length > 0}
    <section>
        <TestPlanDetailsComponent bind:isLoading />
    </section>
{/if}

<svelte:head>
    {#if $testPlansStore.length}
        <title>Test-Tracker | {testPlan.title}</title>
    {:else}
        <title>Test-Tracker | Test Plan Details</title>
    {/if}
</svelte:head>