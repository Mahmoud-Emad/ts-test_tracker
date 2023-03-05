<script lang="ts">
    import HomeComponent from "../components/home/HomeComponent.svelte";    
    export let isLoading: boolean;
</script>

<section>
    <HomeComponent bind:isLoading/>
</section>

<svelte:head>
    <title>Test-Tracker | Home</title>
</svelte:head>