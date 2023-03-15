<script lang="ts">
  import { onMount } from 'svelte';
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import NavBar from '../UI/navbar/Navbar.svelte';
  import { membersStore } from '../../stores/users';
  import Alert from '../UI/Alert.svelte';
  import MemberCard from './MemberCard.svelte';
  import NavAction from '../UI/navbar/NavAction.svelte';
  import AddNewMember from './AddNewMember.svelte';
  import Search from '../UI/Search.svelte';
  import User from '../../apis/users';
  import { filterStore } from '../../utils/helpers';

  export let isLoading = false;
  let openModal = false;
  let loadMembers = false;
  let value = '';

  onMount( async () => {
    loadMembers = true;
    await User.loadMembers()
      .then( ( members ) => {
        if ( members ) {
          membersStore.set( members );
        }
      } )
      .finally( () => {
        loadMembers = false;
      } );
  } );
</script>

{#if isLoading}
  <LoadingComponent className="page" />
{:else}
  <NavBar>
    <NavAction
      slot="action-btn"
      tooltip={'Invite new member.'}
      onClick={() => {
        openModal = true;
      }}
    />
  </NavBar>
  <div class="container pt-4 pb-4">
    <div class="row">
      <div class="col-10">
        <p class="h4 mb-2">
          <strong class="h4 text-primary">All Members</strong>
        </p>
        <p class="text-color">
          -- There are <strong class="text-primary"
            >{$membersStore.length}</strong
          >
          {$membersStore.length === 1 ? 'member' : 'members'} registered
        </p>
      </div>
    </div>
    <Search
      label={'Search Members'}
      store={membersStore}
      searchField={'first_name'}
      bind:value
    />
    {#if loadMembers}
      <LoadingComponent className="component" />
    {:else}
      <div class="pt-5">
        <div class="row">
          {#each filterStore( $membersStore, 'first_name', value ) as member}
            <MemberCard {member} />
          {:else}
            <Alert
              close={false}
              isOpen={true}
              message={'There are no members, try to invite someone from the navbar.'}
              className={'light not-available'}
            />
          {/each}
        </div>
      </div>
    {/if}
  </div>
  <AddNewMember
    bind:openModal
    on:create={() => {
      membersStore.loadMembers();
      // filterStore( membersStore, 'first_name', value );
    }}
  />
{/if}
