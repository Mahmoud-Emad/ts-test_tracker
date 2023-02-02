<script lang="ts">
    import Modal from "../UI/Modals/Modal.svelte";
    import { membersStore } from "../../utils/stores";
    import { onMount } from "svelte";
    import type { MemberType, projectsType } from "../../utils/types";
    import Button from "../UI/Forms/Button.svelte";
    import { fade, fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import Search from "./Search.svelte";
    
    export let openAddNewMemberModal: boolean = false;
    export let project: projectsType;
    
    $:filteredUsers = $membersStore;
    $:membersInProject = [];

    onMount(async() => {
        for (const member of project.teams) {
            membersInProject.push(member.id)
        }
        await membersStore.loadMembers()
    });

    const filterUsers = (e: { detail: any; }) => {
        const searchTerm = e.detail
        if(searchTerm) {
            filteredUsers = $membersStore.filter(user => {
                return user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
                    || user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
                    || user.email.toLowerCase().includes(searchTerm.toLowerCase());
            });
            console.log(filteredUsers);
        }
    }
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
            <Search on:search={filterUsers}/> 
        </div>
        <div class="card bg-light mb-2 card-users"> 
            {#if filteredUsers.length > 0}
                <table class="table users-table m-0">
                    <thead>
                        <tr>
                            <th class="text-right">#</th>
                            <th>Name</th>
                            <th class="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each filteredUsers as user, index (user)}
                            <tr transition:fly="{{x:-100, duration:200}}">
                                <td class="text-right">{index + 1}</td>
                                <td class="d-flex pl-0 pr-0">
                                    <p style="background-color: {user.background_color};" class="user-name-image">    
                                        {user.first_name[0].toLocaleUpperCase()}{user.last_name[0].toLocaleUpperCase()}
                                    </p>
                                    <p class="user-name">{user.first_name} {user.last_name}</p>
                                    <!-- <p class="user-name">{user.permission}</p> -->
                                </td>
                                <td class="text-left">
                                    {#if membersInProject.includes(user.id) }
                                        <button class="btn btn-danger" on:click="{() => {}}">
                                            <i class="fa fa-minus" aria-hidden="true"></i> 
                                        </button>
                                    {:else}
                                        <button class="btn btn-primary" on:click="{() => {}}">
                                            <i class="fa fa-plus" aria-hidden="true"></i> 
                                        </button>
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {:else}
                <p class="text-center text-muted my-3">No members found</p>
            {/if}
        </div>
    </div>
</Modal>

<style>
    .user-name-image{
        height: 40px;
        width: 40px;
        color: rgb(255 255 255);
        font-weight: 700;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .user-name{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 500;
        margin-left: 5px;
    }
    .card-users{
        height: 500px;
        overflow-y: scroll!important;
    }
    .card-header h6 {
        padding: 10px 0;
    }
    
    .users-table th:first-child {
        width: 30px;
    }
    
    .users-table td {
        padding-top: .25rem;
        padding-bottom: .25rem
    }
    .pl-0 {
        padding-left: 0;
    }
    .pr-0{
        padding-right: 0;
    }
</style>