<script lang="ts">
    import { Route } from "svelte-navigator";
    import Login from "../pages/Login.svelte";
    import Logout from "../pages/Logout.svelte";
    import Register from "../pages/Register.svelte";

</script>

<Route path="auth/login/" primary={false}><Login/></Route>
<Route path="auth/register/" primary={false}><Register/></Route>
<Route path="auth/logout/" primary={false}><Logout/></Route>
