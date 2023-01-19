<script lang="ts">
    import LoadingComponent from "../UI/LoadingComponent.svelte";
    import NavBar from "../UI/Navbar/Navbar.svelte";
    import { projectsStore } from "../../utils/stores";
    import CreateNewProject from "./CreateNewProject.svelte";
    import Dropdown from "../UI/Dropdown.svelte";
    import { Link, Router } from "svelte-navigator";
    import Alert from "../UI/Alert.svelte";
    import ActivityTable from "../Home/ActivityTable.svelte";

    export let isLoading: boolean;
    export let loadActivities: boolean;
    let openModal: boolean;
</script>

{#if isLoading}
    <LoadingComponent className="page" />
{:else if $projectsStore.length > 0}
    <NavBar>
        <span slot="actionBTN">
            <Dropdown>
                <span slot="dropdown-toggle">
                    <span class="user_photo_nav c-pinter">
                        <i class="fa fa-exchange" />
                    </span>
                </span>
                <!-- {#if $userStore.permission === "admin"}
                {/if} -->
                <span slot="dropdown-li">
                    <Router>
                        <li>
                            <Link
                                class="dropdown-item drop-size"
                                to={`/projects/${$projectsStore[0].id}/update/`}
                            >
                                Update project
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=""
                                on:click={() => {}}
                                class="dropdown-item drop-size"
                            >
                                Add member
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=""
                                class="dropdown-item drop-size plus-hover"
                                on:click={() => {}}
                            >
                                Delete Project
                            </Link>
                        </li>
                    </Router>
                </span>
            </Dropdown>
        </span>
    </NavBar>
    <div class="container pt-3">
        <div class="header">
            <p class="h4">
                Overview & Activity of
                <strong class="h4 text-primary">
                    `{$projectsStore[0].title.toLocaleUpperCase()}`
                </strong>
            </p>
            <span>Project Description</span>
            <Alert
                isOpen={true}
                message={$projectsStore[0].short_description}
                className={"light not-available mt-2 mb-3 "}
                close={false}
            />
        </div>
        {#if $projectsStore.length > 0}
            <div class="card mt-4 p-4">
                <div class="pt-4">
                    <div class="col-6">
                        <p class="h5 text-muted">Project Statistics</p>
                    </div>
                    <hr />
                </div>
                <table class="table table-borderless box-shadow-none">
                    <tbody>
                        <tr>
                            <th scope="row" class="text-muted">Total test plans</th>
                            <td class="text-primary"
                                >{$projectsStore[0].total_test_plan.length}</td
                            >
                        </tr>
                        <tr>
                            <th scope="row" class="text-muted"
                                >Total Requirements Docs</th
                            >
                            <td class="text-primary"
                                >{$projectsStore[0].total_requirements_docs
                                    .length}</td
                            >
                        </tr>
                        <tr>
                            <th scope="row" class="text-muted">Total Test Suites</th
                            >
                            <td class="text-primary"
                                >{$projectsStore[0].total_suites.length}</td
                            >
                        </tr>
                        <tr>
                            <th scope="row" class="text-muted">Total Test Runs</th>
                            <td class="text-primary"
                                >{$projectsStore[0].total_test_runs.length}</td
                            >
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card mt-4 p-4">
                <div class="pt-4">
                    <div class="col-6">
                        <p class="h5 text-muted">Project Team</p>
                    </div>
                    <hr />
                </div>
                <div class="row">
                    {#each $projectsStore[0].teams as member}
                        <div class="col-2">
                            <a class="text-primary" href="/members/{member.id}"
                                >@{member.first_name}</a
                            >
                        </div>
                    {:else}
                        <p class="text-muted">There are no members.</p>
                    {/each}
                </div>
            </div>
            <div class="card mt-4 p-4">
                <div class="pt-4">
                    <div class="row">
                        <div class="col-6">
                            <p class="h5 text-muted">
                                Incomplete test runs assigned to you
                            </p>
                        </div>
                        <div class="col-6 text-muted">
                            <p class="h5">
                                People with the most incomplete test runs
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-6">
                            <table class="table table-borderless">
                                {#if $projectsStore[0].incomplete_test_runs_assigned_to_you}
                                    <tbody>
                                        <tr>
                                            <th scope="row"
                                                >{$projectsStore[0]
                                                    .incomplete_test_runs_assigned_to_you
                                                    .title}</th
                                            >
                                            <td class="text-primary"
                                                >{$projectsStore[0]
                                                    .incomplete_test_runs_assigned_to_you
                                                    .created}</td
                                            >
                                        </tr>
                                    </tbody>
                                {:else}
                                    <tbody>
                                        <tr>
                                            <td class="text-muted"
                                                >--There are no incompleted task for
                                                you</td
                                            >
                                        </tr>
                                    </tbody>
                                {/if}
                            </table>
                        </div>
                        <div class="col-6">
                            <table class="table table-borderless">
                                {#if $projectsStore[0].people_with_the_most_incomplete_test_runs && $projectsStore[0].people_with_the_most_incomplete_test_runs.length > 0}
                                    {#each $projectsStore[0].people_with_the_most_incomplete_test_runs as task}
                                        <tbody>
                                            <tr>
                                                <td class="text-primary">
                                                    <strong class="text-muted"
                                                        >TestRun |</strong
                                                    >
                                                    <Link
                                                        to="/projects/{$projectsStore[0]
                                                            .id}/runs/{task.id}"
                                                        class="text-center"
                                                        >{task.title}</Link
                                                    >
                                                </td>
                                                <td class="text-primary">
                                                    <strong class="text-muted"
                                                        >User |</strong
                                                    >
                                                    <Link
                                                        to="/members/{task.assigned_user
                                                            .id}"
                                                        >@{task.assigned_user
                                                            .first_name}</Link
                                                    >
                                                </td>
                                            </tr>
                                        </tbody>
                                    {/each}
                                {:else}
                                    <tbody>
                                        <tr>
                                            <td class="text-muted">--There are no pinding tasks</td>
                                        </tr>
                                    </tbody>
                                {/if}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <ActivityTable bind:loadActivities />
            </div>
        {/if}
    </div>
    <CreateNewProject
        bind:openModal
        on:create={() => {
            projectsStore.reload();
        }}
    />
{/if}
