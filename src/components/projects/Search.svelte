<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    const onInput = e => {
        dispatch('search', e.target.value)
    }
</script>

<div class="search p-2">
    <input class="form-control" type="text" placeholder="Search..." on:input={onInput}>
</div>