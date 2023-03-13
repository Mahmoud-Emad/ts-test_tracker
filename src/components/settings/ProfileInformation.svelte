<script lang="ts">
  import { userStore } from '../../utils/store';
  import {
    validateEmail,
    validateName,
    validatePhone,
  } from '../../utils/validators';
  import Input from '../UI/forms/Input.svelte';
</script>

|
<div class="card card-style">
  <small class="text-center pt-2 pb-0 mb-0">
    <span class="text-danger"> * Hint - </span>
    you are not allowed to change your email.
  </small>
  <Input
    disabled={true}
    label={'Email.'}
    type={'email'}
    bind:value={$userStore.email}
    validation={validateEmail}
  />
  <Input
    label={'First Name.'}
    type={'text'}
    bind:value={$userStore.first_name}
    validation={validateName}
  />
  <Input
    label={'Last Name.'}
    type={'text'}
    bind:value={$userStore.last_name}
    validation={validateName}
  />
  <Input
    label={'Phone Number.'}
    type={'text'}
    bind:value={$userStore.phone}
    validation={validatePhone}
  />
</div>

<style>
  .card {
    font-size: 16px;
  }
</style>
