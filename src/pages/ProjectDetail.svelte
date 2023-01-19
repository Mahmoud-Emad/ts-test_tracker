<script lang="ts">
    import { onMount } from "svelte";
    import ProjectDetailComponent from "../components/projects/ProjectDetailComponent.svelte";
    import { clearAlertMessage, clearNotifacationStore } from "../utils/helpers";
    import { useParams } from 'svelte-navigator';
    import Projects from "../apis/projects";
    import type { projectsType } from "../utils/types";
    import { isError404, projectsActivitiesStore, projectsStore } from "../utils/stores";

    export let isLoading: boolean = false;
    let loadActivities: boolean = false;

    const params = useParams();
    let projectID: number = Number($params.id);
    let project: projectsType = {};

    onMount(async () => {
        loadActivities = true;
        clearAlertMessage();
		clearNotifacationStore();
        const response = await Projects.get(projectID)
        if(response){
            project = response
            projectsActivitiesStore.set(project.activity)
            projectsStore.set([project])
        } else{
            $isError404 = true;
        };
        loadActivities = false;
    });
</script>

<section>
    <ProjectDetailComponent bind:isLoading bind:loadActivities/>
</section>

<svelte:head>
    {#if $projectsStore.length > 0}
        <title>Test-Tracker | {$projectsStore[0].title}</title>
    {:else}
        <title>Test-Tracker | Projects</title>
    {/if}
</svelte:head>