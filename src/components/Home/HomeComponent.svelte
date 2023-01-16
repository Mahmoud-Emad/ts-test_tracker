<script lang="ts">
    import { onMount } from "svelte";
    import Greeting from "./Greeting.svelte";
    import RecentProjectsUpdated from "./RecentProjectsUpdated.svelte";
    import Search from "../UI/Search.svelte";
    import { recentProjectsStore } from "../../utils/stores";

    let isLoading: boolean = false;

    onMount(() => {
        // Load and update recent projects updated store.
        isLoading = true;
        recentProjectsStore.reload(4)
        isLoading = false;
    });
</script>



<div class="container pt-4">
    <Greeting />
    <Search 
        label={"Search Members"}
        searchStore={recentProjectsStore}
        searchMethod={recentProjectsStore.reload}
        searchArgs={4}
        searchField={"title"}
        on:Search={
            (event) => {
                recentProjectsStore.set(event.detail.objects)
            }
        }
    />
    <RecentProjectsUpdated bind:isLoading/>
</div>