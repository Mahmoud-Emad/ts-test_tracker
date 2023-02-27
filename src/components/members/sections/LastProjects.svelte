<script lang="ts">
    import { membersStore } from "../../../utils/stores";
    import Alert from "../../ui/Alert.svelte";
</script>

{#if $membersStore[0].last_project_working_on}
    <div class="card mt-4 p-4">
        <div class="pt-4">
            <p class="h5 text-color">Last Project Worked on</p>
            <hr />
        </div>
        <table class="table table-borderless">
            <tbody>
                <tr>
                    <th scope="row" class="text-color">Name</th>
                    <td class="text-primary">
                        <a class="text-primary" href="/projects/{$membersStore[0].last_project_working_on.id}">
                            {$membersStore[0].last_project_working_on.title.slice(0, 50)}
                        </a>
                    </td>
                    <th scope="row" class="text-color">
                        Updated date
                    </th>
                    <td class="text-primary">
                        {$membersStore[0].last_project_working_on.modified}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-color">
                        Pinding tasks
                    </th>
                    {#if $membersStore[0].incomplete_test_runs_assigned_to_you.length > 0}
                        <td class="text-primary">
                            <a class="text-primary" 
                                href="/projects/{$membersStore[0].incomplete_test_runs_assigned_to_you[0].project_id}/runs/{$membersStore[0].incomplete_test_runs_assigned_to_you[0].id}">
                                {$membersStore[0].incomplete_test_runs_assigned_to_you[0].title}
                            </a>
                        </td>
                    {:else}
                        <td class="text-color">
                            There are no pinding tasks.
                        </td>
                    {/if}
                    <th scope="row" class="text-color">
                        Created date
                    </th>
                    <td class="text-primary">
                        {$membersStore[0].last_project_working_on.created}
                    </td>
                </tr>
            </tbody>
        </table>
        <strong class="pl-3 text-color">Team</strong>
        <hr />
        <div class="row">
            {#if $membersStore[0].last_project_working_on.teams.length === 0}
                <div class="col-12 text-color">
                    <Alert 
                        className={"info"}
                        isOpen={true}
                        close={false}
                        message={"There are no teams yet, only you."}
                    />
                </div>
            {:else}
                {#each $membersStore[0].last_project_working_on.teams as person}
                    {#if person.id != $membersStore[0].id}
                        <div class="col-2">
                            <span class="ml-3">
                                <a
                                    class="text-primary"
                                    href="/members/{person.id}"
                                    >@{person.first_name}</a
                                >
                            </span>
                        </div>
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
{/if}