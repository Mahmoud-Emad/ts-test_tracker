<script lang="ts">
    import { Route, Router } from "svelte-navigator";
    import NotFound from "../pages/NotFound.svelte";
    import Home from "../pages/Home.svelte";
    import Auth from "./Auth.svelte";

    export let isLoading: boolean;

</script>

<Router>
    <Route path="/" primary={false}><Home bind:isLoading/></Route>
    <Auth />
    <!-- <NotFound /> -->
</Router>
