<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    const onInput = e => {
        dispatch('search', e.target.value)
    }
</script>

<div class="search p-2 mb-3">
    <input class="form-control tags" type="text" placeholder="Search..." on:input={onInput}>
</div>

<style>
    .tags{
        color: var(--text-color) !important;
        background-color: var(--boxes-bg);
    }
</style>