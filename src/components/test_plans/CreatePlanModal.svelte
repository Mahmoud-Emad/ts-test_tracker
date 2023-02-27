<script lang="ts">
    import Modal from "../ui/Modals/Modal.svelte";
    import Input from "../ui/Forms/Input.svelte";
    import type { TestPlanChart } from "../../utils/types";
    import {  validateProjectName } from "../../utils/validators";
    import Button from "../ui/Forms/Button.svelte";
    import Alert from "../ui/Alert.svelte";
    import { alertStore, projectsStore, testPlansStore } from "../../utils/stores";
    import CheckBox from "../ui/Forms/CheckBox.svelte";

    export let openModal: boolean;

    let planType: TestPlanChart = {};
    let withTemplate: boolean = false;

    const setTestPlanType = () => {
        if(withTemplate){
            planType.type = "template"
        } else {
            planType.type = "blank"
        }
        return withTemplate;
    };
    
    let disabledForm: boolean = true;

    $: disabledForm = !validateProjectName(planType.title).isValid;

</script>

<Modal bind:openModal withFooter={true}>
    <h5 slot="modal-header" class="text-muted">Create New Test Plan</h5>
    <div slot="modal-body">
        <Input
            bind:value={planType.title}
            label={"Title"}
            type={"text"}
            validation={validateProjectName}
        />
        <CheckBox 
            label={"With Template"}
            bind:value={withTemplate}
            onClick={setTestPlanType}
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
    </div>
    <div slot="modal-footer">
        <Button 
            className={"btn-primary"}
            onClick={
                async () => {
                    await testPlansStore.create(planType, $projectsStore[0].id)
                }
            }
            disabled={disabledForm}
            text={"New Test Plan"}
        />
        <Button 
            className={"btn-danger"}
            onClick={() => {
                openModal = false;
            }}
            disabled={!openModal}
            text={"Close"}
        />
    </div>
</Modal>