<script lang="ts">
    import Projects from "../../apis/projects";
    import type { projectsType, UpdateFieldsModalObject } from "../../utils/types";
    import { validateProjectDescription, validateProjectName } from "../../utils/validators";
    import Input from "../UI/Forms/Input.svelte";
    import TextArea from "../UI/Forms/TextArea.svelte";
    import UpdateModal from "../UI/Modals/UpdateModal.svelte";

    export let openUpdateProjectModal: boolean = false;
    export let project: projectsType;

    const onUpdateProject = async (data: projectsType) => {
        return Projects.update(data)
    };

    let fields: Array<UpdateFieldsModalObject> = [
        {
            fieldName: 'title',
            fieldLabel: "Project Name",
            fieldValue: project.title,
            component: Input,
            validation: validateProjectName,
        },
        {
            fieldName: 'short_description',
            fieldLabel: "Short Description",
            fieldValue: project.short_description,
            component: TextArea,
            validation: validateProjectDescription,
        },
    ];
</script>

<UpdateModal 
    bind:fields
    bind:openModal={openUpdateProjectModal}
    buffer={project}
    on:update={ 
        async (event) => {
            await onUpdateProject(event.detail.data)            
        }
    }
/>