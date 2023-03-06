<script lang="ts">
    import LoadingComponent from "../ui/loading/LoadingComponent.svelte";
    import { projectsActivitiesStore } from "../../utils/stores";
    import Alert from "../ui/Alert.svelte";

    export let loadActivities: boolean;
</script>

<section class="activity mb-4 pb-4">
    <div class="mt-2">
        <p>Recent Activity</p>
    </div>
    {#if loadActivities}
        <div class="mt-4">
            <LoadingComponent className={"component"} />
        </div>
    {:else}
        <div class="table">
            {#each $projectsActivitiesStore as action}
                {#if action.date && action.action}
                    <table class="table align-middle mb-3">
                        <thead class="table-bg">
                            <tr>
                                <th>
                                    <span class="badge badge-success rounded-pill d-inline">{action.date}</span>
                                    <span class="badge rounded-pill d-inline text-color">Action Date</span>
                                </th>
                            </tr>
                        </thead>
                        <thead class="table-bg">
                            <tr>
                                <td>
                                    <div class="d-inline b-0">
                                        <div class="ms-3">
                                            <p class="text-color mb-0">
                                                {action.action}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </thead>
                    </table>
                {/if}
            {:else}
                <Alert
                    close={false}
                    message={"Seems to be no activities available"}
                    className={"light not-available"}
                    isOpen={true}
                />
            {/each}
        </div>
    {/if}
</section>
