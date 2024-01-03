<script lang="ts">
  import {
    ObjectTypeEnum,
    RequestActionEnum,
    type FieldsModalObject,
    type ProjectsType,
  } from '../../utils/types';
  import Input from '../UI/forms/Input.svelte';
  import TextArea from '../UI/forms/TextArea.svelte';
  import CheckBox from '../UI/forms/CheckBox.svelte';
  import { projectsStore } from '../../stores/projects';
  import {
    validateLink,
    validateProjectDescription,
    validateProjectName,
  } from '../../utils/validators';
  import InputsModal from '../UI/modals/InputsModal.svelte';
  import { clearFields } from '../../utils/helpers';

  export let openModal: boolean;

  let githubRepoLinkInput = false;
  const projectBuffer: ProjectsType = {};

  let fields: Array<FieldsModalObject> = [
    {
      fieldName: 'title',
      fieldLabel: 'Project Name',
      fieldValue: '',
      component: Input,
      validation: validateProjectName,
    },
    {
      fieldName: 'short_description',
      fieldLabel: 'Short Description',
      fieldValue: '',
      component: TextArea,
      validation: validateProjectDescription,
    },
    {
      fieldLabel: 'Github repository',
      fieldName: 'github_repo',
      onClick: () => {
        githubRepoLinkInput = githubRepoLinkInput ? false : true;
        if ( githubRepoLinkInput ) {
          fields.push( {
            fieldLabel: 'Repository Link',
            fieldName: 'repo_link',
            validation: validateLink,
            component: Input,
            fieldValue: '',
          } );
        } else {
          fields.splice( fields.length - 1, 1 );
        }
      },
      component: CheckBox,
      fieldValue: false,
    },
  ];
  const onCreateProject = async () => {
    if (
      !githubRepoLinkInput &&
      projectBuffer.repo_link &&
      projectBuffer.repo_link.length
    ) {
      delete projectBuffer.repo_link;
    }
    await projectsStore.create( projectBuffer );
    fields = clearFields( fields );
  };

  const checkIfHasRepo = () => {
    // When clear the fields and the checkbox of the repo = ture,
    // we should remove the created input for the link of the repo.
    for ( const field of fields ) {
      if (
        field.fieldName == 'github_repo' &&
        field.fieldValue === false &&
        fields.length > 3
      ) {
        fields.splice( fields.length - 1, 1 );
        githubRepoLinkInput = false;
      }
    }
  };
  $: fields, checkIfHasRepo();
</script>

<InputsModal
  action={RequestActionEnum.create}
  type={ObjectTypeEnum.project}
  bind:fields
  bind:openModal
  buffer={projectBuffer}
  on:create={onCreateProject}
/>
