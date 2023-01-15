<script lang="ts">
    import { validateEmptyInput } from "../../utils/validators";
    import { createEventDispatcher } from 'svelte';
    import Input from "./Forms/Input.svelte";

    let objects: []; // Add more objects to search on it.
    export let name: string;
    export let store;

    const dispatch = createEventDispatcher();
    let value: string;
    
    const search = () => {
        const storeObjects = $store
        if (validateEmptyInput(value).isValid) {            
            // store.reload(4)
            const filtered = storeObjects.filter(
                ( obj: { title: string; }) => obj.title.toLocaleLowerCase().includes(
                    value.toLocaleLowerCase()
                )
            )
            console.log(filtered);
            
            dispatch('Search', {
                objects: filtered
            });
        } else {
            store.reload(4);
        };
    };

    $: value, search()
</script>

<Input bind:value label={`Search ${name}`}/>