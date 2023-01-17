<script lang="ts">
    import LoadingComponent from "../UI/LoadingComponent.svelte";
    import { membersStore } from "../../utils/stores";
    import NavBar from "../UI/Navbar/Navbar.svelte"
    import PersonalInfo from "./sections/PersonalInfo.svelte";
    import LastProjects from "./sections/LastProjects.svelte";
    export let isLoading: boolean = false;

</script>

{#if isLoading}
    <LoadingComponent className={"page"}/>
{:else if $membersStore[0] != undefined}
    <NavBar />
    <div class="container pb-5">
        <div class="row pt-3 pb-2">
            <div class="col-11">
                <p class="h4 mt-2">
                    About | <strong class="h4 text-primary"
                        >{$membersStore[0].full_name}</strong
                    >
                </p>
            </div>
            <!-- {#if user.permission === "admin"}
                <div class="col-1">
                    <button
                        type="button"
                        class="btn plus-background text-white text-decoration-none"
                        on:click={openDeleteModal}
                    >
                        Delete
                    </button>
                </div>
            {/if} -->
        </div>
        <PersonalInfo />
        <LastProjects />
        <!-- 
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
                                        href="/projects/{member
                                            .last_tests_assigned
                                            .project_id}/runs/{member
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
        {/if} -->
    </div>
{/if}