<script lang="ts">
    import { onMount } from "svelte";
    import MembersDetailsComponent from "../components/Members/MembersDetailsComponent.svelte";
    import { clearAlertMessage, clearNotifacationStore } from "../utils/helpers";
    import { useParams } from 'svelte-navigator';
    import Members from "../apis/users";
    import type { MemberType } from "../utils/types";
    import { membersStore, notifacationStore } from "../utils/stores";

    export let isLoading: boolean = false;
    export let isError404: boolean = false;

    const params = useParams();
    let memberID: number = Number($params.id);
    let member: MemberType = {
        incomplete_test_runs_assigned_to_you: []
    };

    onMount(async () => {
        clearAlertMessage();
		clearNotifacationStore();
        member = await Members.getMember(memberID)
        if(member){
            return membersStore.set([member])
        } else{
            isError404 = true;
            return isError404 = true;
        };
    });
</script>

{#if !isError404 && !$notifacationStore.push}
    <section>
        <MembersDetailsComponent bind:isLoading/>
    </section>
{/if}

<svelte:head>
    {#if !isError404 && !$notifacationStore.push && $membersStore.length > 1}
        <title>Test-Tracker | @{$membersStore[0].full_name}</title>
    {:else}
        <title>Test-Tracker | Members</title>
    {/if}
</svelte:head>