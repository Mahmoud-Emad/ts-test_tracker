<script lang="ts">
    import LoadingComponent from "../UI/LoadingComponent.svelte";
    import { membersStore } from "../../utils/stores";
    import NavBar from "../UI/Navbar/Navbar.svelte"
    export let isLoading: boolean = false;

</script>

{#if isLoading}
    <LoadingComponent className={"page"}/>
{:else}
    <NavBar />
{/if}