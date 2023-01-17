<script lang="ts">
    import { validateEmptyInput } from "../../utils/validators";
    import { createEventDispatcher } from 'svelte';
    import Input from "./Forms/Input.svelte";
    export let searchMethod: CallableFunction;
    export let searchField: string; // title, name, etc..
    export let searchArgs: any = null;
    export let searchStore: any;
    export let label: string

    const dispatch = createEventDispatcher();
    let value: string;
    let objects: []; // Add more objects to search on it.
    
    const search = () => {
        const storeObjects = $searchStore
        if (validateEmptyInput(value).isValid) {            
            // store.reload(4)
            const filtered = storeObjects.filter(
                ( obj: { [x: string]: string; } ) => obj[searchField].toLocaleLowerCase().includes(
                    value.toLocaleLowerCase()
                )
            )            
            dispatch('Search', {
                objects: filtered
            });
        } else {
            if(searchArgs){
                searchMethod(searchArgs)
            } else {
                searchMethod()
            }
        };
    };

    $: value, search()
</script>

<Input bind:value label={label} validation={() => {}}/>