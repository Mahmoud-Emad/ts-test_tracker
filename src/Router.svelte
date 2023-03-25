<script lang="ts">
  import HomeView from './views/HomeView.svelte';
  import MemberDetailsView from './views/MemberDetailsView.svelte';
  import MembersView from './views/MembersView.svelte';
  import ProjectDetailsView from './views/ProjectDetailsView.svelte';
  import ProjectsView from './views/ProjectsView.svelte';
  import { Route, Router } from 'svelte-navigator';
  import NotFound from './components/errors/NotFound.svelte';
  import SettingsView from './views/SettingsView.svelte';
  import LoginView from './views/LoginView.svelte';
  import LogoutView from './views/LogoutView.svelte';
  import RegisterView from './views/RegisterView.svelte';
  import TestPlansView from './views/TestPlansView.svelte';
  import TestPlanDetailsView from './views/TestPlanDetailsView.svelte';
  import RequirementsDocView from './views/RequirementsDocView.svelte';
  import RequirementsDocDetailsView from './views/RequirementsDocDetailsView.svelte';
  import TestSuitesView from './views/TestSuitesView.svelte';

  export let isLoading: boolean;
</script>

<Router>
  <!-- General -->
  <Route path="/" primary={false}>
    <HomeView bind:isLoading />
  </Route>
  <Route path="settings/" primary={false}>
    <SettingsView bind:isLoading />
  </Route>

  <!-- Auth -->
  <Route path="/auth/login/" primary={false}>
    <LoginView bind:isLoading />
  </Route>
  <Route path="/auth/register/" component={RegisterView} primary={false} />
  <Route path="/auth/logout/" component={LogoutView} primary={false} />

  <!-- Projects || Project followers -->
  <Route path="projects/" primary={false}>
    <ProjectsView bind:isLoading />
  </Route>
  <Route path="projects/:projectID/" primary={false}>
    <ProjectDetailsView bind:isLoading />
  </Route>

  <!-- Test Plan -->
  <Route path="projects/:projectID/test-plans/" primary={false}>
    <TestPlansView bind:isLoading />
  </Route>
  <Route path="projects/:projectID/test-plans/:planID/" primary={false}>
    <TestPlanDetailsView bind:isLoading />
  </Route>

  <!-- Test-Suites -->
  <Route path="projects/:projectID/test-suites/" primary={false}>
    <TestSuitesView bind:isLoading />
  </Route>

  <!-- Requirements -->
  <Route path="projects/:projectID/requirements/" primary={false}>
    <RequirementsDocView bind:isLoading />
  </Route>
  <Route path="projects/:projectID/requirements/:documentID" primary={false}>
    <RequirementsDocDetailsView bind:isLoading />
  </Route>

  <!-- Members || Member followers -->
  <Route path="members/" primary={false}>
    <MembersView bind:isLoading />
  </Route>
  <Route path="members/:memberID/" primary={false}>
    <MemberDetailsView bind:isLoading />
  </Route>

  <Route>
    <NotFound />
  </Route>
</Router>
