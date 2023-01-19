<script lang="ts">
    import { Route, Router } from "svelte-navigator";
    import Home from "../pages/Home.svelte";
    import Settings from "../pages/Settings.svelte";
    import Projects from "../pages/Projects.svelte";
    import Members from "../pages/Members.svelte";
    import MemberDetails from "../pages/MemberDetails.svelte";
    import Login from "../pages/Login.svelte";
    import Logout from "../pages/Logout.svelte";
    import Register from "../pages/Register.svelte";
    import type { RouteType } from "../utils/types";
    import { getRoute } from "../utils/helpers";

    export let isLoading: boolean;
    export let isError404: boolean;
    
    const routes: RouteType[] = [
        {path: "/", component: Home},
        {path: "settings/", component: Settings},
        {path: "members/", component: Members},
        {path: "members/:id", component: MemberDetails},
        
        {path: "projects/", component: Projects},
        
        {path: "auth/login/", component: Login},
        {path: "auth/register/", component: Register},
        {path: "auth/logout/", component: Logout},
    ];
    const currentRoute: string = window.location.pathname;
    isError404 = getRoute(routes, currentRoute);

</script>

<Router>
    {#each routes as route }
        <Route path={route.path} primary={false}>
            <svelte:component this={route.component} bind:isLoading bind:isError404 />
        </Route>
    {/each}
</Router>
