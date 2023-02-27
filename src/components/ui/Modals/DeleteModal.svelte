<script lang="ts">
    import { alertStore, userStore } from "../../../utils/stores";
    import type { DeleteType, InputValidationsType } from "../../../utils/types";
    import Alert from "../Alert.svelte";
    import Button from "../Forms/Button.svelte";
    import Input from "../Forms/Input.svelte";
    import Modal from "./Modal.svelte";

    export let bindTitle: string;
    export let type: DeleteType; // Member, Project, 
    export let openModal: boolean = false;
    export let callableFunction: CallableFunction;

    let inputValue: string = "";
    bindTitle = bindTitle.replace(/\s+/g, '-').toLowerCase();

    const validateDeletion = (value: string) => {
        let validated: InputValidationsType = {};
        if (value == "" || value == undefined || value == null){
            validated.isValid = false;
            validated.errorMessage = "This field is required";
            return validated;   
        };
        if (value != `${$userStore.full_name}/${bindTitle}`){
            validated.isValid = false;
            validated.errorMessage = `Should be: ${$userStore.full_name}/${bindTitle}`;
            return validated;
        };
        validated.isValid = true;
        delete validated.errorMessage;
        return validated;
    };

    $: disabledBTN = !validateDeletion(inputValue).isValid;
</script>

<Modal bind:openModal withFooter={true} modalClassFooter={"margin-0-auto w-100"}>
    <div slot="modal-body">
        <Alert 
            message={"Unexpected bad things will happen if you don’t read this!"}
            className={"alert mt-2 alert-warning alert-delete"}
            isOpen={true}
            close={false}
        />

        <div class="p-2 text-center m-0-auto">
            This action <strong>cannot</strong> be undone. 
            This will permanently delete the <strong>{$userStore.full_name}/{bindTitle}</strong> 
            {type} and remove all its associations.
            <br>
            Please type <strong>{$userStore.full_name}/{bindTitle}</strong> to confirm.
        </div>

        <Input validation={validateDeletion} bind:value={inputValue}/>
        {#if $alertStore.isOpen}
            <Alert 
                isOpen={$alertStore.isOpen} 
                className={$alertStore.className + " mb-4 p-3 d-flex justify-content-center"} 
                message={$alertStore.message}
                close={false}
            />
        {/if}

    </div>
    <Button 
        slot="modal-footer"
        className={"btn-danger delete-btn"}
        onClick={() => {callableFunction()}}
        text={`I understand the consequences, delete this ${type}`}
        disabled={disabledBTN}
    />
</Modal>
