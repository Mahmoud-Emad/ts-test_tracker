<script lang="ts">
  import Router from './Router.svelte';
  import { notifacationStore } from './stores/utils';
  import { userStore } from './stores/users';
  import User from './apis/users';
  import { onMount } from 'svelte';
  import parseJwt from './apis/authentication/JWTPars';
  import { setTheme } from './utils/helpers';
  import NotFound from './components/errors/NotFound.svelte';
  import Toast from './components/UI/Toast.svelte';
  import { NotifacationTypeEnum } from './utils/types';
  import ServerError from './components/errors/ServerError.svelte';
  import NetworkError from './components/errors/NetworkError.svelte';
  import Forbidden from './components/errors/Forbidden.svelte';

  let isLoading = false;
  const mode = localStorage.getItem( 'mode' );

  onMount( async () => {
    setTheme( mode );
    isLoading = true;
    const accessToken = localStorage.getItem( 'accessToken' );
    const blockedRoutes = [ '/auth/login', '/auth/register' ];
    if ( parseJwt( accessToken ) ) {
      try {
        if ( !blockedRoutes.includes( window.location.pathname ) ) {
          await User.profile().then( ( data ) => {
            console.log( 'data', data );
            $userStore = data;
          } );
        }
      } catch ( error ) {
        window.location.href = '/auth/login';
      }
    } else {
      if ( !blockedRoutes.includes( window.location.pathname ) ) {
        window.location.href = '/auth/login';
      }
    }
    isLoading = false;
  } );
</script>

<!-- If there are internal errors e.g. server error -->
{#if $notifacationStore.isOpen}
  <Toast
    className={$notifacationStore.className}
    message={$notifacationStore.message}
    title={$notifacationStore.title}
    timeOut={$notifacationStore.timeOut}
    isOpen={$notifacationStore.isOpen}
  />
{/if}

{#if $notifacationStore.requestType === NotifacationTypeEnum.RequestServerError}
  <ServerError />
{:else if $notifacationStore.requestType === NotifacationTypeEnum.RequestNetworkError}
  <NetworkError />
{:else if $notifacationStore.requestType === NotifacationTypeEnum.RequestNotFound}
  <NotFound />
{:else if $notifacationStore.requestType === NotifacationTypeEnum.RequestForbidden}
  <Forbidden />
{:else}
  <Router bind:isLoading />
{/if}
