<script lang="ts">
    import { Router, Link } from "svelte-navigator";
    import { userStore } from '../../../utils/stores';
    import { useParams } from 'svelte-navigator';
    import Dropdown from '../Dropdown.svelte'

    export let projectView: boolean = false;
    const params = useParams();
    let projectID: number = Number($params.id);
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
        <i class="fas fa-bars"></i>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <Router>
                    <li class="nav-item">
                        <Link to="/" class="nav-link">Dashboard</Link>
                    </li>
                    {#if $userStore && $userStore.permission == "admin"}
                        <li class="nav-item">
                            <Link to="/members/" class="nav-link">Members</Link>
                        </li>
                    {/if}
                    {#if projectView && projectID}
                        <li class="nav-item">
                            <Link to="/projects" class="nav-link">Projects</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/projects/{projectID}/test-plans/" class="nav-link">Test Plans</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/projects/{projectID}/requirements/" class="nav-link">Requirements</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/projects/{projectID}/test-suites/" class="nav-link">Test Suites</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/projects/{projectID}/runs/" class="nav-link">Test Runs</Link>
                        </li>
                    {:else}
                        <li class="nav-item">
                            <Link to="/projects" class="nav-link">Projects</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/settings/" class="nav-link">Settings</Link>
                        </li>
                    {/if}
                </Router>
            </ul>
        </div>
        <Dropdown>
            <span slot="dropdown-toggle" 
            class="user_photo_nav">
                {#if $userStore}
                    {#if $userStore.first_name && $userStore.last_name != ""}
                        {$userStore.first_name[0].toLocaleUpperCase()}{$userStore.last_name[0].toLocaleUpperCase()}
                    {:else if $userStore.first_name && $userStore.last_name == ""}
                        {$userStore.first_name[0].toLocaleUpperCase()}{$userStore.first_name[1].toLocaleUpperCase()}
                    {:else if $userStore.email}
                        {$userStore.email[0].toLocaleUpperCase()}
                    {/if}
                {/if}
            </span>
            <span slot="dropdown-li">
                <li>
                    <Link to="/settings/" class="dropdown-item setting-drop">Settings</Link>
                </li>
                <li>
                    <Link to="/auth/logout/" class="dropdown-item setting-drop">Logout</Link>
                </li>
            </span>
        </Dropdown>
        <slot name="actionBTN" />
    </div>
</nav>
