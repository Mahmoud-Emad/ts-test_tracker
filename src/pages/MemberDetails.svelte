<script lang="ts">
    import { onMount } from "svelte";
    import MembersDetailsComponent from "../components/Members/MembersDetailsComponent.svelte";
    import { clearAlertMessage, clearNotifacationStore } from "../utils/helpers";
    import { useParams } from 'svelte-navigator';
    import Members from "../apis/users";
    import type { MemberType } from "../utils/types";
    import { isError404, membersStore } from "../utils/stores";

    export let isLoading: boolean = false;

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
            $isError404 = true;
        };
    });
</script>

<section>
    <MembersDetailsComponent bind:isLoading/>
</section>

<svelte:head>
    {#if $membersStore.length > 0}
        <title>Test-Tracker | @{$membersStore[0].full_name}</title>
    {:else}
        <title>Test-Tracker | Members</title>
    {/if}
</svelte:head>