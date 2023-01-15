<script lang="ts">
    import { Link } from "svelte-navigator";
    import { recentProjectsStore } from "../../utils/stores";
    import Card from "../UI/Card.svelte";
    import LoadingComponent from "../UI/LoadingComponent.svelte";

    export let isLoading: boolean;
</script>

{#if isLoading}
    <LoadingComponent className="d-flex h-100 justify-content-center align-items-center"/>
{:else}
    <div>
        <p class="last-projects">
            Last <strong class="text-primary">{$recentProjectsStore.length}</strong> of
            {$recentProjectsStore.length === 1 ? "Project" : "Projects"} Updated
        </p>
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
            {/each}
        </div>
    </div>
{/if}