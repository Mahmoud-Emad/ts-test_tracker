<script lang="ts">
    export let withFooter: boolean = false;
    export let withHeader: boolean = false;
    export let cardClassName: string = "";
    export let cardClassHeader: string = "";
    export let cardClassBody: string = "";
    export let cardClassFooter: string = "";
</script>

<div class="card {cardClassName}">
    {#if withHeader}
        <div class="card-header {cardClassHeader}">
            <slot name="card-header" />
        </div>
    {/if}
    <div class="card-body {cardClassBody}">
        <slot name="card-body" />
    </div>
    {#if withFooter}
        <div class="card-footer {cardClassFooter}">
            <slot name="card-footer" />
        </div>
    {/if}
</div>

<style>
    .card{
        border-radius: 0px;
        background-color: var(--boxes-bg);
        box-shadow: var(--boxes-shadow);
        border: 0 !important;
    }
</style>