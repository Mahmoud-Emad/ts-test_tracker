<script lang="ts">
    import LoadingComponent from "../ui/LoadingComponent.svelte";
    import NavBar from "../ui/Navbar/Navbar.svelte";
    import { alertStore, notifacationStore, projectsStore } from "../../utils/stores";
    import Alert from "../ui/Alert.svelte";
    import NavAction from "../ui/Navbar/NavAction.svelte";
    import Search from "../ui/Search.svelte";
    import CreateNewProject from "./CreateNewProject.svelte";
    import Greeting from "./Greeting.svelte";
    import Card from "../ui/Card.svelte";
    import { Link } from "svelte-navigator";
    import { clearAlertMessage, clearNotifacationStore } from "../../utils/helpers";

    export let isLoading: boolean = false;
    let openModal: boolean = false;
    let loadProjects: boolean = false;
</script>


{#if isLoading}
    <LoadingComponent className="page" />
{:else}
    <NavBar>
        <NavAction slot="actionBTN" tooltip={"Create New Project"} onClick={() => {
            if($alertStore.isOpen || $notifacationStore.isOpen){
                clearAlertMessage();
                clearNotifacationStore();
            };
            openModal = true;
        }}/>
    </NavBar>
    <div class="container pt-4 pb-4">
        <Greeting />
        <Search 
            label={"Search Projects"}
            searchStore={projectsStore}
            searchMethod={projectsStore.reload}
            searchField={"title"}
            on:Search={
                (event) => {
                    projectsStore.set(event.detail.objects)
                }
            }
        />
        <div class="pt-5">
            <div class="row">
                {#each $projectsStore as project}
                    <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-5 mb-md-2 pb-3">
                        <Card cardClassBody="p-1">
                            <Link to="/projects/{project.id}/" class="text-decoration-none" slot="card-body">
                                <div class="card-body text-primary">
                                    <p class="card-title h5 ">{project.title.length > 25 ? project.title.slice(0,25)+'..' : project.title}</p>
                                    <span>Created at:   </span><span class="card-subtitle mt-2 h6"> {project.created}</span>
                                </div>
                            </Link>
                        </Card>
                    </div>
                {:else}
                    <Alert 
                        close = {$projectsStore.length > 0}
                        isOpen = {true}
                        message = {"There are no projects, try to create new one from the navbar."}
                        className={"light not-available"}
                    />
                {/each}
            </div>
        </div>
    </div>
    <CreateNewProject bind:openModal 
        on:create={() => {
            projectsStore.reload();
        }}
    />
{/if}