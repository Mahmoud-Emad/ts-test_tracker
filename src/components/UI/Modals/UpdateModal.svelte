<script lang="ts">
    import type { UpdateFieldsModalObject } from "../../../utils/types";
    import Alert from "../Alert.svelte";
    import Button from "../Forms/Button.svelte";
    import Modal from "./Modal.svelte";
    import { createEventDispatcher, onMount } from 'svelte';
    import { alertStore } from "../../../utils/stores";
    import { clearAlertMessage } from "../../../utils/helpers";

    export let fields: Array<UpdateFieldsModalObject>;
    export let openModal: boolean = false;
    export let buffer: any;
    
    let disabledBTN: boolean = false;
    const dispatch = createEventDispatcher();

    onMount(() => {
        clearAlertMessage();
    })

    const checkValidations = () => {        
        fields.forEach(field => {
            if (field.validation(field.fieldValue).isValid){
                disabledBTN = true;
            } else {
                disabledBTN = false;
            };
        });
        return disabledBTN;
    };

    const onUpdate = () => {
        // On update functions used to update fields that exported by the new changes, then dispatch the updated fields.
        fields.forEach(field => {
            buffer[field.fieldName] = field.fieldValue
        });
        dispatch('update', {
            data: buffer
        });
    };

    $: fields, checkValidations();

</script>

<Modal bind:openModal withFooter={true} modalClassFooter={"margin-0-auto w-100"}>
    <div slot="modal-body">
        {#each fields as field}
            <svelte:component 
                this={field.component}
                validation={field.validation}
                bind:value={field.fieldValue}
                label={field.fieldLabel}
                onClick={field.validation}
            />
        {/each}
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
            className={"btn-primary"}
            onClick={onUpdate}
            text={`Update`}
            disabled={!disabledBTN}
        />
        <Button 
            className={"btn-danger"}
            onClick={() => (openModal = false)}
            text={`Close`}
        />
    </div>

</Modal>
