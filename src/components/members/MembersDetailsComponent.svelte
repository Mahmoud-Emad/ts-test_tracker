<script lang="ts">
    import LoadingComponent from "../ui/LoadingComponent.svelte";
    import { membersStore } from "../../utils/stores";
    import NavBar from "../ui/Navbar/Navbar.svelte"
    import PersonalInfo from "./sections/PersonalInfo.svelte";
    import LastProjects from "./sections/LastProjects.svelte";
    import LastTestRun from "./sections/LastTestRun.svelte";
    export let isLoading: boolean = false;

</script>

{#if isLoading}
    <LoadingComponent className={"page"}/>
{:else if $membersStore[0] != undefined}
    <NavBar />
    <div class="container pb-5">
        <div class="row pt-3 pb-2">
            <div class="col-11">
                <p class="h4 mt-2">
                    About | <strong class="h4 text-primary"
                        >{$membersStore[0].full_name}</strong
                    >
                </p>
            </div>
            <!-- {#if user.permission === "admin"}
                <div class="col-1">
                    <button
                        type="button"
                        class="btn plus-background text-white text-decoration-none"
                        on:click={openDeleteModal}
                    >
                        Delete
                    </button>
                </div>
            {/if} -->
        </div>
        <PersonalInfo />
        <LastProjects />
        <LastTestRun />
    </div>
{/if}