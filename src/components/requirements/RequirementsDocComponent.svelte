<script lang="ts">
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import projects from '../../apis/projects';
  import { alertStore, notifacationStore } from '../../stores/utils';
  import { requirementsDocStore } from '../../stores/requirements';
  import {
    ObjectTypeEnum,
    type FieldsModalObject,
    type ProjectsType,
    type RequirementsDocChart,
  } from '../../utils/types';
  import LoadingComponent from '../UI/loading/LoadingComponent.svelte';
  import NavBar from '../UI/navbar/Navbar.svelte';
  import NavAction from '../UI/navbar/NavAction.svelte';
  import {
    clearAlertMessage,
    clearNotifacationStore,
    filterStore,
  } from '../../utils/helpers';
  import Search from '../UI/Search.svelte';
  import Alert from '../UI/Alert.svelte';
  import CreateRequirementDocModal from './CreateRequirementDocModal.svelte';
  import ListCard from '../UI/cards/ListCard.svelte';
  import Input from '../UI/forms/Input.svelte';
  import { validateProjectName } from '../../utils/validators';
  import requirements from '../../apis/requirements';

  export let isLoading: boolean;

  const params = useParams();
  let project: ProjectsType = {};
  let openModal: boolean;
  let openEditModal: boolean;
  let openDeleteModal: boolean;
  let value = '';

  onMount( async () => {
    isLoading = true;
    await projects.get( +$params.projectID ).then( ( resp ) => {
      if ( resp ) {
        project = resp;
        requirementsDocStore.set( project.total_requirements_docs );
      }
    } );
    isLoading = false;
  } );

  const getFields = (
    document: RequirementsDocChart,
  ): Array<FieldsModalObject> => {
    return [
      {
        component: Input,
        fieldLabel: 'Requirement Document Tilte',
        fieldName: 'title',
        fieldValue: document.title,
        validation: validateProjectName,
      },
    ];
  };

  const onDelete = async ( document: RequirementsDocChart ) => {
    await requirements.deleteDocument( project.id, document.id ).then( () => {
      const docs: RequirementsDocChart[] = project.total_requirements_docs;
      const indx = project.total_requirements_docs.findIndex(
        ( doc ) => document.id === doc.id,
      );
      docs.splice( indx, 1 );
      project.total_requirements_docs = docs;
      requirementsDocStore.set( project.total_requirements_docs );
      alertStore.set( {
        className: 'danger',
        close: true,
        message: 'Requirement Document Deleted Successfully!',
        isOpen: openDeleteModal,
        title: 'Requirement Document Deleted Successfully!',
      } );
      setTimeout( () => {
        openDeleteModal = false;
      }, 3000 );
    } );
  };

  const onUpdate = async (
    actualDocument: RequirementsDocChart,
    updatedDocument: RequirementsDocChart,
  ) => {
    await requirements
      .updateDocument( project.id, actualDocument.id, updatedDocument )
      .then( () => {
        const docs: RequirementsDocChart[] = project.total_requirements_docs;
        const indx = project.total_requirements_docs.findIndex(
          ( doc ) => actualDocument.id === doc.id,
        );
        docs[indx] = updatedDocument;
        project.total_requirements_docs = docs;
        requirementsDocStore.set( project.total_requirements_docs );
        setTimeout( () => {
          openEditModal = false;
        }, 3000 );
      } );
  };
</script>

{#if isLoading}
  <LoadingComponent className="page" />
{:else if project && project.title}
  <NavBar projectView={true}>
    <NavAction
      slot="action-btn"
      tooltip={'Create New Test Plan'}
      onClick={() => {
        if ( $alertStore.isOpen || $notifacationStore.isOpen ) {
          clearAlertMessage();
          clearNotifacationStore();
        }
        openModal = true;
      }}
    />
  </NavBar>
  <div class="container pt-4 pb-4">
    <div class="pt-0">
      <p class="h5">
        <span class="text-primary">
          {project.title}
        </span>
        | Requirements Document
      </p>
      <p class="text-color">
        There {$requirementsDocStore.length <= 1 ? 'is' : 'are'}
        <strong class="text-primary">{$requirementsDocStore.length}</strong>
        {$requirementsDocStore.length <= 1 ? 'document' : 'documents'}
        associated.
      </p>
    </div>
    <Search
      label={'Search Document\'s'}
      store={requirementsDocStore}
      bind:value
      searchField={'title'}
    />
    <div class="container mt-3">
      {#each filterStore( $requirementsDocStore, 'title', value ) as document}
        <ListCard
          {project}
          item={document}
          type={ObjectTypeEnum.testSuite}
          to="/projects/{project.id}/requirements/{document.id}"
          {openEditModal}
          {openDeleteModal}
          updateFields={getFields( document )}
          on:delete={() => {
            return onDelete( document );
          }}
          on:update={( e ) => {
            return onUpdate( document, e.detail.updatedItem );
          }}
        />
      {:else}
        <Alert
          className={'light not-available'}
          isOpen={true}
          close={false}
          message={'There are no requirement documents inside this project, try to create new one from the navbar.'}
        />
      {/each}
    </div>
  </div>
  {#if openModal}
    <CreateRequirementDocModal bind:openModal {project} />
  {/if}
{/if}
