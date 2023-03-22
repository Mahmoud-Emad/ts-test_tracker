<script lang="ts">
  import Projects from '../../apis/projects';
  import type {
    ProjectsType,
    UpdateFieldsModalobject,
  } from '../../utils/types';
  import {
    validateProjectDescription,
    validateProjectName,
  } from '../../utils/validators';
  import Input from '../UI/forms/Input.svelte';
  import TextArea from '../UI/forms/TextArea.svelte';
  import InputsModal from '../UI/modals/InputsModal.svelte';

  export let openUpdateProjectModal = false;
  export let project: ProjectsType;

  const onUpdateProject = async ( data: ProjectsType ) => {
    return Projects.update( data );
  };

  let fields: Array<UpdateFieldsModalobject> = [
    {
      fieldName: 'title',
      fieldLabel: 'Project Name',
      fieldValue: project.title,
      component: Input,
      validation: validateProjectName,
    },
    {
      fieldName: 'short_description',
      fieldLabel: 'Short Description',
      fieldValue: project.short_description,
      component: TextArea,
      validation: validateProjectDescription,
    },
  ];
</script>

<InputsModal
  bind:fields
  bind:openModal={openUpdateProjectModal}
  buffer={project}
  on:update={async ( event ) => {
    await onUpdateProject( event.detail.data );
  }}
/>
