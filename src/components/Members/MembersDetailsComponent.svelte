<script lang="ts">
    import LoadingComponent from "../UI/LoadingComponent.svelte";
    import { membersStore } from "../../utils/stores";
    import NavBar from "../UI/Navbar/Navbar.svelte"
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
        <div class="card mt-2 p-4">
            <div class="pt-4">
                <p class="h5 text-muted">Personal Information</p>
                <hr />
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <th scope="row" class="text-muted">Full Name</th
                            >
                            <td class="text-primary">{$membersStore[0].full_name}</td>
                            <th scope="row" class="text-muted">Email</th>
                            <td class="text-primary">{$membersStore[0].email}</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-muted"
                                >Phone Number</th
                            >
                            {#if $membersStore[0].phone.length === 0}
                                <td class="text-muted">Not set yet</td>
                            {:else}
                                <td class="text-primary">{$membersStore[0].phone}</td>
                            {/if}
                            <th scope="row" class="text-muted"
                                >Joined date</th
                            >
                            <td class="text-primary">{$membersStore[0].created}</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-muted"
                                >Permission</th
                            >
                            {#if $membersStore[0].permission == "full_access"}
                                <td class="text-primary">Full Access</td>
                            {:else}
                                <td class="text-primary">Admin</td>
                            {/if}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- {#if $membersStore[0].last_project_working_on}
            <div class="card mt-4 p-4">
                <div class="pt-4">
                    <p class="h5 text-muted">Last Project Worked on</p>
                    <hr />
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <th scope="row" class="text-muted">Name</th>
                                <td class="text-primary">
                                    <a class="text-primary" href="/projects/{$membersStore[0].last_project_working_on.id}">
                                        {$membersStore[0].last_project_working_on.title.slice(
                                            0,
                                            50
                                        )}
                                    </a>
                                </td>
                                <th scope="row" class="text-muted"
                                    >Updated date</th
                                >
                                <td class="text-primary"
                                    >{$membersStore[0].last_project_working_on
                                        .modified}</td
                                >
                            </tr>
                            <tr>
                                <th scope="row" class="text-muted"
                                    >Pinding tasks</th
                                >
                                {#if $membersStore[0].incomplete_test_runs_assigned_to_you}
                                    <td class="text-primary"
                                        >{$membersStore[0].incomplete_test_runs_assigned_to_you}</td
                                    >
                                {:else}
                                    <td class="text-muted"
                                        >There are no pinding tasks.</td
                                    >
                                {/if}
                                <th scope="row" class="text-muted"
                                    >Created date</th
                                >
                                <td class="text-primary"
                                    >{$membersStore[0].last_project_working_on
                                        .created}</td
                                >
                            </tr>
                        </tbody>
                    </table>
                    <strong class="pl-3 text-muted">Team</strong>
                    <br />
                    <hr />
                    <div class="row">
                        {#if $membersStore[0].last_project_working_on.teams.length === 0}
                            <div class="col-12 text-muted">
                                <p class="text-center">
                                    There are no teams yet, only you.
                                </p>
                            </div>
                        {:else}
                            {#each $membersStore[0].last_project_working_on.teams as person}
                                {#if person.id != $membersStore[0].id}
                                    <div class="col-2">
                                        <span class="ml-3">
                                            <a
                                                class="link-color"
                                                href="/members/{person.id}"
                                                >@{person.first_name}</a
                                            >
                                        </span>
                                    </div>
                                {:else}
                                    <div class="col-12 text-muted">
                                        <p class="text-center">
                                            There are no teams yet, only
                                            you.
                                        </p>
                                    </div>
                                {/if}
                            {/each}
                        {/if}
                    </div>
                </div>
            </div>
        {/if}
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