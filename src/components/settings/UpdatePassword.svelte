<script lang="ts">
  import { userStore } from '../../stores/users';
  import { validateEmptyInput } from '../../utils/validators';
  import Input from '../UI/forms/Input.svelte';
</script>

|
<div class="card card-style">
  {#if $userStore.permission !== 'admin'}
    <small class="text-center pt-2 pb-0 mb-0">
      <span class="text-danger"> * Hint - </span>
      Only the host who can set your permission.
    </small>
    <Input
      disabled={true}
      label={'Permission'}
      type={'text'}
      bind:value={$userStore.permission}
      validation={validateEmptyInput}
    />
  {/if}
  <Input
    label={'New Password'}
    type={'password'}
    bind:value={$userStore.password1}
    validation={validateEmptyInput}
  />
  <Input
    label={'Re Type New Password'}
    type={'password'}
    bind:value={$userStore.password2}
    validation={validateEmptyInput}
  />
</div>

<style>
  .card {
    font-size: 16px;
  }
</style>
