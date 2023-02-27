<script lang="ts">
    import { Route, Router } from "svelte-navigator";
    import Home from "../pages/Home.svelte";
    import Settings from "../pages/Settings.svelte";
    import Projects from "../pages/Projects.svelte";
    import TestPlan from "../pages/TestPlan.svelte";
    import ProjectDetail from "../pages/ProjectDetail.svelte";
    import Members from "../pages/Members.svelte";
    import MemberDetails from "../pages/MemberDetails.svelte";
    import Login from "../pages/Login.svelte";
    import Logout from "../pages/Logout.svelte";
    import Register from "../pages/Register.svelte";
    import type { RouteType } from "../utils/types";
    import { getRoute } from "../utils/helpers";
    import { isError404 } from "../utils/stores";

    export let isLoading: boolean;
    
    const routes: RouteType[] = [
        {path: "/", component: Home},
        {path: "/settings/", component: Settings},
        {path: "/members/", component: Members},
        {path: "/members/:id/", component: MemberDetails},
        
        {path: "/projects/", component: Projects},
        {path: "/projects/:id/test-plans/", component: TestPlan},
        {path: "/projects/:id/", component: ProjectDetail},
        
        {path: "/auth/login/", component: Login},
        {path: "/auth/register/", component: Register},
        {path: "/auth/logout/", component: Logout},
    ];
    const currentRoute: string = window.location.pathname;
    $isError404 = getRoute(routes, currentRoute);
</script>

<Router>
    {#each routes as route }
        <Route path={route.path} primary={false}>
            <svelte:component this={route.component} bind:isLoading/>
        </Route>
    {/each}
</Router>
