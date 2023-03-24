<script lang="ts">
  import {
    RequestActionEnum,
    type FieldsModalObject,
    ObjectTypeEnum,
  } from '../../../utils/types';
  import Alert from '../Alert.svelte';
  import Button from '../forms/Button.svelte';
  import Modal from './Modal.svelte';
  import { createEventDispatcher, onMount } from 'svelte';
  import { alertStore } from '../../../stores/utils';
  import { clearAlertMessage } from '../../../utils/helpers';

  export let fields: Array<FieldsModalObject>;
  export let openModal = false;
  export let buffer: unknown;
  export let action: RequestActionEnum;
  export let type: ObjectTypeEnum;

  let disabledBtn = false;
  const dispatch = createEventDispatcher();

  onMount( () => {
    clearAlertMessage();
  } );

  const checkValidations = () => {
    const values: Array<boolean> = [];
    fields.forEach( ( field ) => {
      if ( field.validation ) {
        values.push( field.validation( field.fieldValue ).isValid );
      }
    } );
    disabledBtn = !values.includes( false );
  };

  const onUpdate = () => {
    // On update functions used to update fields that exported by the new changes, then dispatch the updated fields.
    console.log(fields);
    console.log(buffer);
    fields.forEach( ( field ) => {
      buffer[field.fieldName] = field.fieldValue;
    } );
    dispatch( action, {
      data: buffer,
    } );
  };

  $: fields, checkValidations();
</script>

<Modal
  bind:openModal
  withFooter={true}
  modalClassFooter={'margin-0-auto w-100'}
>
  <div slot="modal-body">
    {#each fields as field}
      <svelte:component
        this={field.component}
        validation={field.validation}
        bind:value={field.fieldValue}
        label={field.fieldLabel}
        onClick={field.onClick}
      />
    {/each}
    <slot name="modal-hint" />
    {#if $alertStore.isOpen}
      <Alert
        className={$alertStore.className}
        isOpen={$alertStore.isOpen}
        message={$alertStore.message}
        error={$alertStore.error}
      />
    {/if}
  </div>

  <div slot="modal-footer">
    <Button
      className={'btn-primary'}
      onClick={onUpdate}
      text={action === RequestActionEnum.create
        ? `New ${type}`
        : `Update ${type}`}
      disabled={!disabledBtn}
    />
    <Button
      className={'btn-danger'}
      onClick={() => ( openModal = false )}
      text={'Close'}
    />
  </div>
</Modal>
