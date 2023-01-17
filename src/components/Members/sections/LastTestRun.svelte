<script lang="ts">
    import { membersStore } from "../../../utils/stores";
</script>


{#if $membersStore[0].last_tests_assigned}
<div class="card mt-4 p-4">
    <div class="pt-4">
        <p class="h5 text-muted">Last Test Run Assigned</p>
        <hr />
        <table class="table table-borderless">
            <tbody>
                <tr>
                    <th scope="row" class="text-muted">Name</th>
                    <td
                        ><a
                            href="/projects/{$membersStore[0]
                                .last_tests_assigned.project_id}/runs/{$membersStore[0]
                                .last_tests_assigned.id}"
                            class="text-primary"
                            >{$membersStore[0].last_tests_assigned.title.slice(
                                0,
                                50
                            )}</a
                        ></td
                    >
                    <th scope="row" class="text-muted">Date</th>
                    <td class="text-primary"
                        >{$membersStore[0].last_tests_assigned
                            .created}</td
                    >
                </tr>
            </tbody>
        </table>
    </div>
</div>
{/if}