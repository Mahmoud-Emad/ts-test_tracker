<script lang="ts">
  import Modal from '../UI/modals/Modal.svelte';
  import Input from '../UI/forms/Input.svelte';
  import TextArea from '../UI/forms/TextArea.svelte';
  import type { ProjectsType } from '../../utils/types';
  import {
    validateEmptyInput,
    validateLink,
    validateProjectDescription,
    validateProjectName,
  } from '../../utils/validators';
  import Button from '../UI/forms/Button.svelte';
  import Alert from '../UI/Alert.svelte';
  import { alertStore } from '../../stores/utils';
  import { projectsStore } from '../../stores/projects';
  import { createEventDispatcher } from 'svelte';
  import CheckBox from '../UI/forms/CheckBox.svelte';
  import Projects from '../../apis/projects';
  import { clearAlertMessage } from '../../utils/helpers';

  export let openModal: boolean;
  const dispatch = createEventDispatcher();

  const projectType: ProjectsType = {};
  let githubRepoLinkInput = false;
  let disabledForm = true;

  $: if ( projectType.github_repo ) {
    disabledForm =
      !validateProjectName( projectType.title ).isValid ||
      !validateEmptyInput( projectType.short_description ).isValid ||
      !validateLink( projectType.repo_link ).isValid;
  } else {
    disabledForm =
      !validateProjectName( projectType.title ).isValid ||
      !validateEmptyInput( projectType.short_description ).isValid;
  }

  const handleClear = () => {
    openModal = false;
    projectType.title = '';
    projectType.short_description = '';
    projectType.github_repo = false;
    projectType.repo_link = '';
    clearAlertMessage();
  };

  const handleClick = async () => {
    if ( !disabledForm ) {
      const response = await Projects.new( projectType );
      if ( response != undefined ) {
        dispatch( 'create', {
          text: 'created!',
        } );
        openModal = false;
        projectType.title = '';
        projectType.short_description = '';
        projectType.github_repo = false;
        projectType.repo_link = '';
        projectsStore.reload();
      }
      clearAlertMessage();
    }
  };
</script>

<Modal bind:openModal withFooter={true}>
  <h5 slot="modal-header" class="text-color">Create New Project</h5>
  <div slot="modal-body">
    <Input
      bind:value={projectType.title}
      label={'Title'}
      type={'text'}
      validation={validateProjectName}
    />

    <TextArea
      bind:value={projectType.short_description}
      label={'Short Description'}
      validation={validateProjectDescription}
    />

    <CheckBox
      label={'Github repository'}
      bind:value={projectType.github_repo}
      onClick={() => {
        githubRepoLinkInput = githubRepoLinkInput ? false : true;
      }}
    />

    {#if projectType.github_repo}
      <Input
        bind:value={projectType.repo_link}
        label={'Repository Link'}
        type={'text'}
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
      className={'btn-primary'}
      onClick={async () => {
        await handleClick();
      }}
      text={'New Project'}
      disabled={disabledForm}
    />
    <Button
      className={'btn-danger'}
      onClick={handleClear}
      disabled={!openModal}
      text={'Close'}
    />
  </div>
</Modal>
