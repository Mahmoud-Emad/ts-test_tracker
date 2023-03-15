<script lang="ts">
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import NavBar from '../UI/navbar/Navbar.svelte';
  import { alertStore, notifacationStore } from '../../stores/utils';
  import { userStore } from '../../stores/users';
  import {
    projectsActivitiesStore,
    projectsStore,
  } from '../../stores/projects';
  import Dropdown from '../UI/Dropdown.svelte';
  import { Link, navigate, Router, useParams } from 'svelte-navigator';
  import Alert from '../UI/Alert.svelte';
  import ActivityTable from '../home/ActivityTable.svelte';
  import DeleteModal from '../UI/modals/DeleteModal.svelte';
  import { DeleteType } from '../../utils/types';
  import type { ProjectsType } from '../../utils/types';
  import Projects from '../../apis/projects';
  import {
    clearAlertMessage,
    clearNotifacationStore,
  } from '../../utils/helpers';
  import AddMemberToProject from './AddMemberToProject.svelte';
  import { onMount } from 'svelte';
  import UpdateProject from './UpdateProject.svelte';
  import projects from '../../apis/projects';

  export let isLoading: boolean;

  let loadActivities: boolean;
  let openDeleteModal: boolean;
  let openAddNewMemberModal: boolean;
  let openUpdateProjectModal: boolean;
  let membersInProject: Array<number> = [];

  const params = useParams();
  let project: ProjectsType = {};

  onMount( () => {
    isLoading = true;
    loadActivities = true;
    projects.get( +$params.projectID ).then( ( rsp ) => {
      if ( rsp ) {
        project = rsp;
        projectsStore.set( [ project ] );
        projectsActivitiesStore.set( project.activity.slice( 0, 10 ) );
        for ( const member of project.teams ) {
          membersInProject.push( member.id );
        }
      }
    } );
    isLoading = false;
    loadActivities = false;
  } );
</script>

{#if isLoading}
  <LoadingComponent className="page" />
{:else if project && project.title}
  <NavBar projectView={true}>
    <span slot="action-btn">
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
            <li
              class="dropdown-item drop-size plus-hover text-primary --pointer delete-li-a"
              on:click={() => {
                if ( $alertStore.isOpen || $notifacationStore.isOpen ) {
                  clearAlertMessage();
                  clearNotifacationStore();
                }
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
          `{project.title.toLocaleUpperCase()}`
        </strong>
      </p>
      <span>Project Description</span>
      <Alert
        isOpen={true}
        message={project.short_description}
        className={'light not-available mt-2 mb-3 '}
        close={false}
      />
    </div>
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
            <td class="text-primary">{project.test_plans.length}</td>
          </tr>
          <tr>
            <th scope="row" class="text-color">Total Requirements Docs</th>
            <td class="text-primary">{project.requirements_docs.length}</td>
          </tr>
          <tr>
            <th scope="row" class="text-color">Total Test Suites</th>
            <td class="text-primary">{project.total_suites.length}</td>
          </tr>
          <tr>
            <th scope="row" class="text-color">Total Test Runs</th>
            <td class="text-primary">{project.total_test_runs.length}</td>
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
        {#each project.teams as member}
          <div class="col team-col">
            <span
              style="background-color: {member.background_color};"
              class="team-image-span"
              data-tooltip={member.full_name}
            >
              <Link to="/members/{member.id}" class="team-image-span-a">
                {member.first_name[0]}{member.last_name[0]}
              </Link>
            </span>
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
            <p class="h5 text-color">Incomplete test runs assigned to you</p>
          </div>
          <div class="col-6 text-color">
            <p class="h5">People with the most incomplete test runs</p>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-6">
            <table class="table table-borderless">
              {#if project.incomplete_test_runs_assigned_to_you}
                <tbody>
                  <tr>
                    <th scope="row"
                      >{project.incomplete_test_runs_assigned_to_you.title}</th
                    >
                    <td class="text-primary"
                      >{project.incomplete_test_runs_assigned_to_you
                        .created}</td
                    >
                  </tr>
                </tbody>
              {:else}
                <tbody>
                  <tr>
                    <td class="text-color"
                      >--There are no incompleted task for you</td
                    >
                  </tr>
                </tbody>
              {/if}
            </table>
          </div>
          <div class="col-6">
            <table class="table table-borderless">
              {#if project.people_with_the_most_incomplete_test_runs && project.people_with_the_most_incomplete_test_runs.length > 0}
                {#each project.people_with_the_most_incomplete_test_runs as task}
                  <tbody>
                    <tr>
                      <td class="text-primary">
                        <strong class="text-color">TestRun |</strong>
                        <Link
                          to="/projects/{project.id}/runs/{task.id}"
                          class="text-center">{task.title}</Link
                        >
                      </td>
                      <td class="text-primary">
                        <strong class="text-color">User |</strong>
                        <Link to="/members/{task.assigned_user.id}"
                          >@{task.assigned_user.first_name}</Link
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
  </div>
  <DeleteModal
    type={DeleteType.project}
    bindTitle={project.title}
    bind:openModal={openDeleteModal}
    callableFunction={async () => {
      const deleted = await Projects.delete( project, $userStore );
      if ( deleted && deleted.status === 204 ) {
        projectsStore.reload();
        return navigate( '/' );
      }
    }}
  />
  {#if openAddNewMemberModal}
    <AddMemberToProject
      bind:openAddNewMemberModal
      {project}
      bind:membersInProject
      on:update={( e ) => {
        project = e.detail.project;
      }}
    />
  {/if}
  {#if openUpdateProjectModal}
    <UpdateProject bind:openUpdateProjectModal {project} />
  {/if}
{/if}
