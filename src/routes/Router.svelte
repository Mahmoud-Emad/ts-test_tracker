<script lang="ts">
    import { Route, Router } from "svelte-navigator";
    import Home from "../pages/Home.svelte";
    import Settings from "../pages/Settings.svelte";
    import Auth from "./Auth.svelte";

    export let isLoading: boolean;

</script>

<Router>
    <Route path="/" primary={false}><Home bind:isLoading/></Route>
    <Route path="settings/" primary={false}><Settings bind:isLoading/></Route>
    <Auth />
    <!-- <NotFound /> -->
</Router>
