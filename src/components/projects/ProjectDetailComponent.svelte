<script lang="ts">
    import LoadingComponent from "../ui/LoadingComponent.svelte";
    import NavBar from "../ui/Navbar/Navbar.svelte";
    import { alertStore, notifacationStore, projectsStore, userStore } from "../../utils/stores";
    import Dropdown from "../ui/Dropdown.svelte";
    import { Link, navigate, Router } from "svelte-navigator";
    import Alert from "../ui/Alert.svelte";
    import ActivityTable from "../home/ActivityTable.svelte";
    import DeleteModal from "../ui/Modals/DeleteModal.svelte";
    import { DeleteType } from "../../utils/types";
    import Projects from "../../apis/projects";
    import { clearAlertMessage, clearNotifacationStore } from "../../utils/helpers";
    import AddMemberToProject from "./AddMemberToProject.svelte";
    import { onMount } from "svelte";
    import UpdateProject from "./UpdateProject.svelte";

    export let isLoading: boolean;
    export let loadActivities: boolean;

    let openDeleteModal: boolean;
    let openAddNewMemberModal: boolean;
    let openUpdateProjectModal: boolean;
    let membersInProject: Array<Number> = [];

    onMount(() => {
        for (const member of $projectsStore[0].teams) {
            membersInProject.push(member.id);
        }
    });

</script>

{#if isLoading}
    <LoadingComponent className="page" />
{:else if $projectsStore.length > 0}
    <NavBar projectView={true}>
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
                                to=""
                                on:click={() => {
                                    openUpdateProjectModal = true;
                                }}
                                class="dropdown-item drop-size text-primary"
                            >
                                Update project
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=""
                                on:click={() => {
                                    openAddNewMemberModal = true;
                                }}
                                class="dropdown-item drop-size text-primary"
                            >
                                Add member
                            </Link>
                        </li>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li class="dropdown-item drop-size plus-hover text-primary --pointer delete-li-a"
                            on:click={() => {
                                if($alertStore.isOpen || $notifacationStore.isOpen){
                                    clearAlertMessage();
                                    clearNotifacationStore();
                                };
                                openDeleteModal = true;
                            }}
                            >
                            Delete Project
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
                        <p class="h5 text-color">Project Statistics</p>
                    </div>
                    <hr />
                </div>
                <table class="table table-borderless box-shadow-none">
                    <tbody>
                        <tr>
                            <th scope="row" class="text-color">Total test plans</th>
                            <td class="text-primary"
                                >{$projectsStore[0].total_test_plan.length}</td
                            >
                        </tr>
                        <tr>
                            <th scope="row" class="text-color"
                                >Total Requirements Docs</th
                            >
                            <td class="text-primary"
                                >{$projectsStore[0].total_requirements_docs
                                    .length}</td
                            >
                        </tr>
                        <tr>
                            <th scope="row" class="text-color">Total Test Suites</th
                            >
                            <td class="text-primary"
                                >{$projectsStore[0].total_suites.length}</td
                            >
                        </tr>
                        <tr>
                            <th scope="row" class="text-color">Total Test Runs</th>
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
                        <p class="h5 text-color">Project Team</p>
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
                        <p class="text-color">There are no members.</p>
                    {/each}
                </div>
            </div>
            <div class="card mt-4 p-4">
                <div class="pt-4">
                    <div class="row">
                        <div class="col-6">
                            <p class="h5 text-color">
                                Incomplete test runs assigned to you
                            </p>
                        </div>
                        <div class="col-6 text-color">
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
                                            <td class="text-color"
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
                                                    <strong class="text-color"
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
                                                    <strong class="text-color"
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
                                            <td class="text-color">--There are no pinding tasks</td>
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
    <DeleteModal 
        type={DeleteType.project}
        bindTitle={$projectsStore[0].title}
        bind:openModal={openDeleteModal}
        callableFunction={async () => {
            const deleted = await Projects.delete($projectsStore[0], $userStore);
            if(deleted && deleted.status === 204){
                projectsStore.reload()
                return navigate("/");
            };
        }}
    />
    {#if openAddNewMemberModal}
        <AddMemberToProject bind:openAddNewMemberModal project={$projectsStore[0]} bind:membersInProject/>
    {/if}
    {#if openUpdateProjectModal}
        <UpdateProject bind:openUpdateProjectModal project={$projectsStore[0]}/>
    {/if}
{/if}
