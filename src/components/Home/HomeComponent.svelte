<script lang="ts">
    import { onMount } from "svelte";
    import Greeting from "./Greeting.svelte";
    import Dashboard from "../../apis/dashboard";
    import RecentProjectsUpdated from "./RecentProjectsUpdated.svelte";

    let isLoading: boolean = false;

    onMount(() => {
        // Load and update recent projects updated store.
        isLoading = true;
        Dashboard.recentProjectsUpdated(4);
        isLoading = false;
    });
</script>



<div class="container pt-4">
    <Greeting />
    <RecentProjectsUpdated bind:isLoading/>
</div>