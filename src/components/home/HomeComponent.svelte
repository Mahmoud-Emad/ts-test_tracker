<script lang="ts">
    import { onMount } from "svelte";
    import Greeting from "./Greeting.svelte";
    import RecentProjectsUpdated from "./RecentProjectsUpdated.svelte";
    import Search from "../ui/Search.svelte";
    import {
        projectsActivitiesStore,
        recentProjectsStore,
    } from "../../utils/stores";
    import LoadingComponent from "../ui/LoadingComponent.svelte";
    import NavBar from "../ui/Navbar/Navbar.svelte";
    import NavAction from "../ui/Navbar/NavAction.svelte";
    import Dashboard from "../../apis/dashboard";
    import CreateNewProject from "../projects/CreateNewProject.svelte";
    import ActivityTable from "./ActivityTable.svelte";

    export let isLoading: boolean = false;
    let openModal: boolean = false;
    let loadProjects: boolean = false;
    let loadActivities: boolean = false;

    onMount(async () => {
        // Load and update recent projects updated store.
        loadProjects = true;
        loadActivities = true;
        await Dashboard.recentProjectsUpdated(4)
            .then((data) => {
                if (data) {
                    recentProjectsStore.set(data);
                }
            })
            .finally(() => {
                loadProjects = false;
            });

        await Dashboard.loadLast5ProjectsActivity()
            .then((data) => {
                if (data) {
                    projectsActivitiesStore.set(data);
                }
            })
            .finally(() => {
                loadActivities = false;
            });
    });
</script>

{#if isLoading}
    <LoadingComponent className={"page"} />
{:else}
    <NavBar>
        <NavAction
            slot="actionBTN"
            tooltip={"Create new project"}
            onClick={() => {
                openModal = true;
            }}
        />
    </NavBar>
    <div class="container pt-4">
        <Greeting bind:isLoading />
        <Search
            label={"Search Members"}
            searchStore={recentProjectsStore}
            searchMethod={recentProjectsStore.reload}
            searchArgs={4}
            searchField={"title"}
            on:Search={(event) => {
                recentProjectsStore.set(event.detail.objects);
            }}
        />
        <RecentProjectsUpdated bind:loadProjects />
        <ActivityTable bind:loadActivities />
    </div>
    <CreateNewProject
        bind:openModal
        on:create={() => {
            recentProjectsStore.reload(4);
            projectsActivitiesStore.reload();
        }}
    />
{/if}
