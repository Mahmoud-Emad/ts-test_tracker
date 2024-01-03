<script lang="ts">
  import Input from '../../UI/forms/Input.svelte';
  import Botton from '../../UI/forms/Button.svelte';
  import {
    validateEmail,
    validateName,
    validateEmptyInput,
  } from '../../../utils/validators';
  import type { registerCredentials, TokensType } from '../../../utils/types';
  import authenticationAPI from '../../../apis/authentication/Authentication';
  import Alert from '../../UI/Alert.svelte';
  import { alertStore } from '../../../stores/utils';
  import { authStore } from '../../../stores/users';
  import { onMount } from 'svelte';
  import {
    clearAlertMessage,
    clearNotifacationStore,
    updateThem,
  } from '../../../utils/helpers';
  import { Link } from 'svelte-navigator';

  const _registerCredentials: registerCredentials = {};

  onMount( () => {
    clearAlertMessage();
    clearNotifacationStore();
  } );

  const requestToRegister = async ( data: registerCredentials ) => {
    await authenticationAPI.register( data ).then( ( data: TokensType ) => {
      if ( data.access_token ) {
        authStore.updateTokens( data.access_token, data.refresh_token );
        updateThem();
        window.location.href = '/';
      }
    } );
  };

  $: disabledForm =
    !validateName( _registerCredentials.first_name ).isValid ||
    !validateName( _registerCredentials.last_name ).isValid ||
    !validateEmptyInput( _registerCredentials.password ).isValid ||
    !validateEmail( _registerCredentials.email ).isValid;
</script>

<Input
  bind:value={_registerCredentials.first_name}
  label={'First Name'}
  validation={validateName}
/>

<Input
  bind:value={_registerCredentials.last_name}
  label={'Last Name'}
  validation={validateName}
/>

<Input
  bind:value={_registerCredentials.email}
  label={'Email'}
  validation={validateEmail}
/>

<Input
  bind:value={_registerCredentials.password}
  label={'Password'}
  type={'password'}
  validation={validateEmptyInput}
/>

{#if $alertStore.isOpen}
  <Alert
    isOpen={$alertStore.isOpen}
    message={$alertStore.message}
    title={$alertStore.title}
    className={$alertStore.className}
    error={$alertStore.error}
  />
{/if}

<div class="d-flex justify-content-srart">
  <Botton
    text={'Register'}
    disabled={disabledForm}
    className={'btn btn-primary'}
    onClick={() => {
      requestToRegister( _registerCredentials );
    }}
  />
</div>
<div class="mt-2">
  <p>
    have an account? <Link to="/auth/login" class="text-primary">login now</Link
    >
  </p>
</div>
