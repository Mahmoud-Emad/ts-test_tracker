<script lang="ts">
  import Modal from '../UI/modals/Modal.svelte';
  import Input from '../UI/forms/Input.svelte';
  import { MemberPermissions } from '../../utils/types';
  import type { MemberType } from '../../utils/types';
  import { validateEmail, validateName } from '../../utils/validators';
  import Members from '../../apis/users';
  import Button from '../UI/forms/Button.svelte';
  import Alert from '../UI/Alert.svelte';
  import { alertStore } from '../../stores/utils';
  import { createEventDispatcher } from 'svelte';

  export let openModal: boolean;

  const dispatch = createEventDispatcher();

  const memberType: MemberType = {
    incomplete_test_runs_assigned_to_you: [],
  };

  const onCreateMember = async () => {
    await Members.inviteNewMember( memberType ).then( ( rsp ) => {
      if ( rsp ) {
        dispatch( 'create', {
          text: 'created!',
        } );
        setTimeout( () => {
          openModal = false;
          memberType.last_name = '';
          memberType.first_name = '';
          memberType.email = '';
        }, 3000 );
      }
    } );
  };

  $: disabledForm =
    !validateName( memberType.first_name ).isValid ||
    !validateName( memberType.last_name ).isValid ||
    !validateEmail( memberType.email ).isValid;
</script>

<Modal bind:openModal withFooter={true}>
  <div slot="modal-header" class="text-center">
    <h5 class="text-muted">Invite New Member</h5>
  </div>
  <div slot="modal-body">
    <Input
      bind:value={memberType.first_name}
      label={'First Name'}
      type={'text'}
      validation={validateName}
    />
    <Input
      bind:value={memberType.last_name}
      label={'Last Name'}
      type={'text'}
      validation={validateName}
    />
    <Input
      bind:value={memberType.email}
      label={'Email'}
      type={'email'}
      validation={validateEmail}
    />
    <div class="form-group p-2 mb-3">
      <strong>
        <label for={memberType.permission}>Permission</label>
      </strong>
      <select
        class="form-select mt-2 input"
        aria-label={memberType.permission}
        id={memberType.permission}
        bind:value={memberType.permission}
      >
        {#each Object.entries( MemberPermissions ) as [title, permission]}
          <option class="mt-2 pt-2" value={permission}>{title}</option>
        {/each}
      </select>
    </div>
    {#if $alertStore.isOpen}
      <Alert
        isOpen={$alertStore.isOpen}
        message={$alertStore.message}
        title={$alertStore.title}
        className={$alertStore.className}
        error={$alertStore.error}
      />
    {/if}
  </div>
  <div slot="modal-footer">
    <Button
      className={'btn-primary'}
      onClick={onCreateMember}
      disabled={disabledForm}
      text={'Invite'}
    />
    <Button
      className={'btn-danger'}
      onClick={() => {
        openModal = false;
        memberType.first_name = '';
        memberType.last_name = '';
        memberType.email = '';
      }}
      disabled={!openModal}
      text={'Close'}
    />
  </div>
</Modal>
