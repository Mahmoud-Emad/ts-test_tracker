<script lang="ts">
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import NavBar from '../UI/navbar/Navbar.svelte';
  import PersonalInfo from './sections/PersonalInfo.svelte';
  import LastProjects from './sections/LastProjects.svelte';
  import LastTestRun from './sections/LastTestRun.svelte';
  import { onMount } from 'svelte';
  import type { MemberType } from '../../utils/types';
  import { useParams } from 'svelte-navigator';
  import user from '../../apis/users';
  export let isLoading = false;

  let member: MemberType = {};
  const params = useParams();

  onMount( async () => {
    user.getMember( +$params.memberID ).then( ( rsp ) => {
      if ( rsp ) {
        member = rsp;
      }
    } );
  } );
</script>

{#if isLoading}
  <LoadingComponent className={'page'} />
{:else if member && member.full_name}
  <NavBar />
  <div class="container pb-5">
    <div class="row pt-3 pb-2">
      <div class="col-11">
        <p class="h4 mt-2">
          About | <strong class="h4 text-primary">{member.full_name}</strong>
        </p>
      </div>
      <!-- {#if user.permission === "admin"}
              <div class="col-1">
                  <button
                      type="button"
                      class="btn plus-background text-white text-decoration-none"
                      on:click={openDeleteModal}
                  >
                      Delete
                  </button>
              </div>
          {/if} -->
    </div>
    <PersonalInfo {member} />
    <LastProjects {member} />
    <LastTestRun {member} />
  </div>
{/if}
