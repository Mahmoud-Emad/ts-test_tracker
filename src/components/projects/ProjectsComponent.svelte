<script lang="ts">
    import { onMount } from "svelte";
    import { alertStore, notifacationStore, projectsStore } from "../../utils/stores";
    import NavBar from "../ui/Navbar/Navbar.svelte";
    import NavAction from "../ui/Navbar/NavAction.svelte";
    import { clearAlertMessage, clearNotifacationStore } from "../../utils/helpers";
    import Search from "../ui/Search.svelte";
    import LoadingComponent from "../ui/loading/LoadingComponent.svelte";
    import Card from "../ui/Card.svelte";
    import { Link } from "svelte-navigator";
    import Loadingbtn from "../ui/loading/Loadingbtn.svelte";

    let isLoading: boolean = false;
    let openModal: boolean = false;

    onMount(async () => {
        isLoading = true;
        if ($projectsStore.length <= 1){
            await projectsStore.reload();
        };
        isLoading = false;
    });

</script>

<section class="projects">
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
        <span class="text-primary h5">
            Projects
        </span> 
        <p class="text-muted">
            There are 
            <strong class="text-primary">
                {#if isLoading}
                    <Loadingbtn />
                {:else}
                    {$projectsStore.length}
                {/if}
            </strong>
            {$projectsStore.length === 1 ? "project" : "projects"} associated.
        </p>
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
            {#if isLoading}
                <LoadingComponent className="component" />
            {:else}
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
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</section>
