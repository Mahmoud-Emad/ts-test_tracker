<script lang="ts">
  import Modal from '../UI/modals/Modal.svelte';
  import { membersStore } from '../../stores/users';
  import { onMount } from 'svelte';
  import type { ProjectsType } from '../../utils/types';
  import Button from '../UI/forms/Button.svelte';
  import { fly } from 'svelte/transition';
  import Search from './Search.svelte';
  import Projects from '../../apis/projects';
  import { createEventDispatcher } from 'svelte';

  export let openAddNewMemberModal = false;
  export let project: ProjectsType;
  export let membersInProject: Array<number>;

  $: filteredUsers = $membersStore;

  onMount( async () => {
    await membersStore.loadMembers();
  } );

  const dispatch = createEventDispatcher();

  const updateProjectMembers = ( memberID: number ) => {
    membersInProject = membersInProject;
    if ( membersInProject.includes( memberID ) ) {
      const index = membersInProject.indexOf( memberID );
      membersInProject.splice( index, 1 );
    } else {
      membersInProject.push( memberID );
    }

    return membersInProject;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterUsers = ( e: { detail: any } ) => {
    const searchTerm = e.detail;
    if ( searchTerm ) {
      filteredUsers = $membersStore.filter( ( user ) => {
        return (
          user.first_name.toLowerCase().includes( searchTerm.toLowerCase() ) ||
          user.last_name.toLowerCase().includes( searchTerm.toLowerCase() ) ||
          user.email.toLowerCase().includes( searchTerm.toLowerCase() )
        );
      } );
    }
  };
</script>

<Modal bind:openModal={openAddNewMemberModal} withFooter={true}>
  <div slot="modal-body" class="add-member">
    <div class="card search-box">
      <div class="alert alert-light not-available">
        <p>
          Select Member to add <strong>him/her</strong> to
          <strong>
            {project.title}
          </strong>
        </p>
      </div>
      <Search on:search={filterUsers} />
    </div>
    <div class="mt-3 card mb-2 card-users">
      {#if filteredUsers.length > 0}
        <table class="table users-table m-0">
          <thead>
            <tr>
              <th class="text-right tags">#</th>
              <th class="tags">Name</th>
              <th class="text-right tags">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredUsers as user, index (user)}
              <tr transition:fly={{ x: -100, duration: 200 }}>
                <td class="text-right">{index + 1}</td>
                <td class="d-flex pl-0 pr-0">
                  <p
                    style="background-color: {user.background_color};"
                    class="user-name-image"
                  >
                    {user.first_name[0].toLocaleUpperCase()}{user.last_name[0].toLocaleUpperCase()}
                  </p>
                  <p class="user-name">{user.first_name} {user.last_name}</p>
                  <!-- <p class="user-name">{user.permission}</p> -->
                </td>
                <td class="text-left">
                  <Button
                    className={membersInProject &&
                    membersInProject.includes( user.id )
                      ? 'btn-danger'
                      : 'btn-primary'}
                    onClick={async () => {
                      await Projects.addORRemoveMember(
                        project.id,
                        user.id,
                      ).then( ( rsp ) => {
                        if ( rsp ) {
                          project = rsp;
                          dispatch( 'update', {
                            project: project,
                          } );
                        }
                      } );
                      updateProjectMembers( user.id );
                    }}
                    icon={membersInProject && membersInProject.includes( user.id )
                      ? 'fa fa-minus'
                      : 'fa fa-plus'}
                    text={''}
                  />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <p class="text-center tags my-3">No members found</p>
      {/if}
    </div>
  </div>
  <div slot="modal-footer">
    <Button
      className={'btn-danger'}
      onClick={() => ( openAddNewMemberModal = false )}
      text={'Close'}
    />
  </div>
</Modal>

<style>
  .user-name-image {
    height: 40px;
    width: 40px;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff !important;
  }
  .tags {
    color: var(--text-color) !important;
  }
  .user-name {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    font-size: 16px;
    font-weight: 500;
    margin-left: 5px;
  }
  .card-users {
    height: 500px;
    overflow-y: scroll !important;
  }
  .users-table th:first-child {
    width: 30px;
  }

  .users-table td {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
  .pl-0 {
    padding-left: 0;
  }
  .pr-0 {
    padding-right: 0;
  }
</style>
