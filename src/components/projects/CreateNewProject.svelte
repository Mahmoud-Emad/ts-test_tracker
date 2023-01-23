<script lang="ts">
    import Modal from "../UI/Modals/Modal.svelte";
    import Input from "../UI/Forms/Input.svelte";
    import TextArea from "../UI/Forms/TextArea.svelte";
    import type { projectsType } from "../../utils/types";
    import { validateEmptyInput, validateLink, validateProjectName } from "../../utils/validators";
    import Button from "../UI/Forms/Button.svelte";
    import Alert from "../UI/Alert.svelte";
    import { alertStore, projectsStore } from "../../utils/stores";
    import { createEventDispatcher } from 'svelte';
    import CheckBox from "../UI/Forms/CheckBox.svelte";
    import Projects from "../../apis/projects";

    export let openModal: boolean;
    const dispatch = createEventDispatcher();
    
    let projectType: projectsType = {};
    let githubRepoLinkInput: boolean = false;
    let disabledForm: boolean = true;

    $: if(projectType.github_repo){
        disabledForm = !validateProjectName(projectType.title).isValid ||
            !validateEmptyInput(projectType.short_description).isValid ||
            !validateLink(projectType.repo_link).isValid;
    } else {
        disabledForm = !validateProjectName(projectType.title).isValid ||
            !validateEmptyInput(projectType.short_description).isValid;
    };

</script>

<Modal bind:openModal withFooter={true}>
    <h5 slot="modal-header" class="text-muted">Create New Project</h5>
    <div slot="modal-body">
        <Input
            bind:value={projectType.title}
            label={"Title"}
            type={"text"}
            validation={validateProjectName}
        />
        <TextArea 
            bind:value={projectType.short_description}
            label={"Short Description"}
            validation={validateEmptyInput}
        />
        <CheckBox label={"Github repository"} bind:value={projectType.github_repo} onClick={() => {
            githubRepoLinkInput = githubRepoLinkInput ? false : true;
        }}/>
        {#if projectType.github_repo}
            <Input 
                bind:value={projectType.repo_link} 
                label={"Repository Link"} 
                type={"text"}
                validation={validateLink}
            />
        {/if}
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
                    if(!disabledForm){
                        const response = await Projects.new(projectType);
                        if(response != undefined){
                            dispatch('create', {
                                text: 'created!'
                            });
                            openModal = false;
                            projectType.title = "";
                            projectType.short_description = "";
                            projectType.github_repo = false;
                            projectType.repo_link = "";
                            projectsStore.reload();
                        };
                    };
                }
            }
            disabled={disabledForm}
            text={"New Project"}
        />
        <Button 
            className={"btn-danger"}
            onClick={() => {
                openModal = false;
                projectType.title = "";
                projectType.short_description = "";
                projectType.github_repo = false;
                projectType.repo_link = "";
            }}
            disabled={!openModal}
            text={"Close"}
        />
    </div>
</Modal>