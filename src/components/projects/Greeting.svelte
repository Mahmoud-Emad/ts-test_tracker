<script lang="ts">
    import { onMount } from "svelte";
    import { userStore, projectsStore } from "../../utils/stores";
</script>

<div class="pt-0">
    {#if $userStore.permission === "admin"}
        <p class="h5">
            <span class="text-primary">
                Projects
            </span> 
        </p>
        <p class="text-muted">
            There are <strong class="text-primary">{$projectsStore.length}</strong>
            {$projectsStore.length === 1 ? "project" : "projects"}
        </p>
    {:else if $projectsStore && $userStore.permission !== "admin"}
        <p class="h5">
            <span class="text-primary">
                Member
            </span> 
            Dashboard
        </p>
        <p class="text-muted">
            You are <strong class="text-primary">{$userStore.permission}</strong> of <strong>{$projectsStore.length}</strong>
            {$projectsStore.length === 1 ? "project" : "projects"}
        </p>
    {/if}
</div>