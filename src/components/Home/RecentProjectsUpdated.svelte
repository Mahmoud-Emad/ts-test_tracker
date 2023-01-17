<script lang="ts">
    import { Link } from "svelte-navigator";
    import { recentProjectsStore } from "../../utils/stores";
    import Alert from "../UI/Alert.svelte";
    import Card from "../UI/Card.svelte";
    import LoadingComponent from "../UI/LoadingComponent.svelte";
    export let loadProjects: boolean;
</script>


<div>
    <p class="last-projects">
        Last <strong class="text-primary">{$recentProjectsStore.length}</strong> of
        {$recentProjectsStore.length === 1 ? "Project" : "Projects"} Updated
    </p>
    {#if loadProjects}
        <div class="mt-4 pt-4">
            <LoadingComponent className={"component"}/>
        </div>
    {:else}
        <div class="row p-1">
            {#each $recentProjectsStore as project}
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
                    className={"warning"}
                    isOpen={true}
                    close={$recentProjectsStore.length > 0}
                    message={"There are no projects, try to create new one from the navbar."}
                />
            {/each}
        </div>
    {/if}
</div>
