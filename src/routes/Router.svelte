<script lang="ts">
    import { Route, Router } from "svelte-navigator";
    import Home from "../pages/Home.svelte";
    import Settings from "../pages/Settings.svelte";
    import Members from "../pages/Members.svelte";
    import MemberDetails from "../pages/MemberDetails.svelte";
    import Auth from "./Auth.svelte";

    export let isLoading: boolean;
    export let isError404: boolean;

</script>

<Router>
    <Route path="/" primary={false}><Home bind:isLoading/></Route>
    <Route path="settings/" primary={false}><Settings bind:isLoading/></Route>
    <Route path="members/" primary={false}><Members bind:isLoading/></Route>
    <Route path="members/:id" primary={false}><MemberDetails bind:isLoading bind:isError404/></Route>
    <Auth />
</Router>
