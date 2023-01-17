<script lang="ts">
    import { onMount } from "svelte";
    import Greeting from "./Greeting.svelte";
    import RecentProjectsUpdated from "./RecentProjectsUpdated.svelte";
    import Search from "../UI/Search.svelte";
    import { recentProjectsStore } from "../../utils/stores";
    import LoadingComponent from "../UI/LoadingComponent.svelte";
    import NavBar from "../UI/Navbar/Navbar.svelte";
    import NavAction from "../UI/Navbar/NavAction.svelte";
    import Dashboard from "../../apis/dashboard";
    import CreateNewProject from "../projects/CreateNewProject.svelte";

    export let isLoading: boolean = false;
    let openModal: boolean = false;
    let loadProjects: boolean = false;

    onMount(async () => {
        // Load and update recent projects updated store.
        loadProjects = true;
        await Dashboard.recentProjectsUpdated(4).then((data) => {
            if(data){
                recentProjectsStore.set(data)
            };
        }).finally(() => {
            loadProjects = false;
        })
    });
</script>

{#if isLoading}
    <LoadingComponent className={"page"} />
{:else}
    <NavBar>
        <NavAction slot="actionBTN" tooltip={"Create new project"} onClick={() => {
            openModal = true
        }}/>
    </NavBar>
    <div class="container pt-4">
        <Greeting />
        <Search 
            label={"Search Members"}
            searchStore={recentProjectsStore}
            searchMethod={recentProjectsStore.reload}
            searchArgs={4}
            searchField={"title"}
            on:Search={
                (event) => {
                    recentProjectsStore.set(event.detail.objects)
                }
            }
        />
        <RecentProjectsUpdated bind:loadProjects/>
    </div>
    <CreateNewProject bind:openModal 
        on:create={() => {
            recentProjectsStore.reload(4);
        }}
    />
{/if}