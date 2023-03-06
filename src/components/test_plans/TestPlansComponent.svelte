<script lang="ts">
    import { onMount } from "svelte";
    import { alertStore, notifacationStore, projectsStore, testPlansStore } from "../../utils/stores";
    import LoadingComponent from "../ui/loading/LoadingComponent.svelte";
    import NavBar from "../ui/Navbar/Navbar.svelte";
    import NavAction from "../ui/Navbar/NavAction.svelte";
    import { clearAlertMessage, clearNotifacationStore } from "../../utils/helpers";
    import Search from "../ui/Search.svelte";
    import Greeting from "./Greeting.svelte";
    import PlanCard from "./PlanCard.svelte";
    import Alert from "../ui/Alert.svelte";
    import CreatePlanModal from "./CreatePlanModal.svelte";

    export let isLoading: boolean;
    let openModal: boolean;

    onMount(async () => {
        isLoading = true;
        await testPlansStore.all($projectsStore[0].id);
        isLoading = false;
    });
</script>

{#if isLoading}
    <LoadingComponent className="page" />
{:else}
    <NavBar projectView={true}>
        <NavAction slot="actionBTN" tooltip={"Create New Test Plan"} onClick={() => {
            if($alertStore.isOpen || $notifacationStore.isOpen){
                clearAlertMessage();
                clearNotifacationStore();
            };
            openModal = true;
        }}/>
    </NavBar>
    <div class="container pt-4 pb-4">
        <Greeting />
        <Search 
            label={"Search Plans"}
            searchStore={testPlansStore}
            searchMethod={testPlansStore.all}
            searchArgs={$projectsStore[0].id}
            searchField={"title"}
            on:Search={
                (event) => {
                    testPlansStore.set(event.detail.objects)
                }
            }
        />
        <div class="container mt-3">
            {#if $testPlansStore.length > 0}
                {#each $testPlansStore as plan}
                    <PlanCard {plan}/>
                {/each}
            {:else}
                <Alert 
                    className={"light not-available"}
                    isOpen={true}
                    close={$testPlansStore.length > 0}
                    message={"There are no plans inside this project, try to create new one from the navbar."}
                />
            {/if}
        </div>
    </div>
    {#if openModal}
        <CreatePlanModal bind:openModal/>
    {/if}
{/if}