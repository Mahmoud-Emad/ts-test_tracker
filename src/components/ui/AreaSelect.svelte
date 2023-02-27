<script lang="ts">
    export let value;
    export let objects;
    export let objectTitle;
</script>



<select
    bind:value={value}
    class="form-select"
    aria-label="select-status"
    id="select-status"
>
    {#each objects as obj}
        {obj}
        <option value={obj.id}>
            {obj[objectTitle]}
        </option>
    {/each}
</select>