<script lang="ts">
    export let withFooter: boolean;
    export let withHeader: boolean;
    export let cardClassName: string;
    export let cardClassHeader: string;
    export let cardClassBody: string;
    export let cardClassFooter: string;
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