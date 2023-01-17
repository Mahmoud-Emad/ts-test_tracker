<script lang="ts">
    import { onMount } from "svelte";
    import LoadingComponent from "../UI/LoadingComponent.svelte";
    import NavBar from "../UI/Navbar/Navbar.svelte";
    import { membersStore } from "../../utils/stores";
    import Alert from "../UI/Alert.svelte";
    import MemberCard from "./MemberCard.svelte";
    import NavAction from "../UI/Navbar/NavAction.svelte";
    import AddNewMember from "./AddNewMember.svelte";
    import Search from "../UI/Search.svelte";
    import User from "../../apis/users";

    export let isLoading: boolean = false;
    let openModal: boolean = false;
    let loadMembers: boolean = false;

    onMount(async () => {
        loadMembers = true;
        await User.loadMembers().then((members) => {
            if(members){
                membersStore.set(members)
            };
        }).finally(() => {
            loadMembers = false;
        });
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
                <p class="text-muted">
                    -- There are <strong class="text-primary">{$membersStore.length}</strong>
                    {$membersStore.length === 1 ? "member" : "members"} registered
                </p>
            </div>
        </div>
        <Search 
            label={"Search Members"}
            searchStore={membersStore}
            searchMethod={membersStore.loadMembers}
            searchField={"first_name"}
            on:Search={
                (event) => {
                    membersStore.set(event.detail.objects)
                }
            }
        />
        {#if loadMembers}
            <LoadingComponent className="component" />
        {:else}
            <div class="pt-5">
                <div class="row">
                    {#each $membersStore as member}
                        <MemberCard {member}/>
                    {:else}
                        <Alert 
                            close = {$membersStore.length > 0}
                            isOpen = {true}
                            message = {"There are no members, try to invite someone from the navbar."}
                            className={"light not-available"}
                        />
                    {/each}
                </div>
            </div>
        {/if}
    </div>
    <AddNewMember bind:openModal 
        on:create={() => {
            membersStore.loadMembers();
        }}
    />
{/if}