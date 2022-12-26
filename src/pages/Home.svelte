<script lang="ts">
    import Navbar from "../components/UI/Navbar/Navbar.svelte";
    import LoadingComponent from "../components/UI/LoadingComponent.svelte";
    import HomeComponent from "../components/Home/HomeComponent.svelte";
    import Footer from "../components/UI/Footer/Footer.svelte";
    
    export let isLoading: boolean;
	
</script>

<div class="h-100">
    {#if isLoading}
        <LoadingComponent className="d-flex h-100 justify-content-center align-items-center"/>
    {:else}
        <Navbar />
        <HomeComponent />
        <Footer />
    {/if}
</div>

<svelte:head>
    <title>Test-Tracker | Home</title>
</svelte:head>