<script lang="ts">
    export let label: string;
    export let value: string;
</script>


<div class="form-group p-2 mb-2">
    <strong>
        <label for="content-body">{label}</label>
    </strong>
    <textarea bind:value={value} class="form-control mt-2 input"></textarea>
</div>