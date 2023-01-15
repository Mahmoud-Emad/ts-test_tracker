<script lang="ts">
    import { onMount } from "svelte";
    import LoadingComponent from "../UI/LoadingComponent.svelte";
    import NavBar from "../UI/Navbar/Navbar.svelte";
    import { membersStore } from "../../utils/stores";
    import Alert from "../UI/Alert.svelte";
    import MemberCard from "./MemberCard.svelte";
    import NavAction from "../UI/Navbar/NavAction.svelte";
    import Modal from "../UI/Modals/Modal.svelte";

    export let isLoading: boolean = false;
    let openModal: boolean = false;

    onMount(async () => {
        membersStore.loadMembers()
    });

</script>

{#if isLoading}
    <LoadingComponent className="page" />
{:else}
    <NavBar>
        <NavAction slot="actionBTN" tooltip={"Invite new member."} onClick={() => {
            openModal = true
        }}/>
    </NavBar>
    <div class="container pt-4 pb-4">
        <div class="row">
            <div class="col-10">
                <p class="h4 mb-2">
                    <strong class="h4 text-primary">All Members</strong>
                </p>
                {#if $membersStore && $membersStore.length > 0}
                    <p class="text-muted">
                        -- There are <strong class="text-primary">{$membersStore.length}</strong>
                        {$membersStore.length === 1 ? "member" : "members"} registered
                    </p>
                {/if}
            </div>
        </div>
        {#if $membersStore && $membersStore.length > 0}
            <div class="pt-4">
                <p>Search Members</p>
            </div>
            <div class="pt-5">
                <div class="row">
                    {#each $membersStore as member}
                        <MemberCard {member}/>
                    {/each}
                </div>
            </div>
        {:else}
            <Alert 
                isOpen = {true} 
                message = {"There are no members, try to invite someone"} 
                className = {"info"}
            />
        {/if}
    </div>

    <Modal bind:openModal>
        <div slot="modal-body">
            Hello
        </div>
    </Modal>

{/if}
