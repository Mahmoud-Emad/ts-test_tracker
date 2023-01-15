<script lang="ts">
    export let withFooter: boolean = false;
    export let withHeader: boolean = false;
    export let modalClassName: string = "";
    export let modalClassHeader: string = "";
    export let cardClassBody: string = "";
    export let modalClassFooter: string = "";
    export let openModal: boolean = false;
</script>

<div class="modal {modalClassName}" tabindex="-1" style="display:{openModal ? "block" : "none"}">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="close">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <i class="fa fa-close" on:click={() => {
                    openModal = false;
                }}></i>
            </div>
            {#if withHeader}
                <div class="modal-header {modalClassHeader}">
                    <slot name="card-header" />
                </div>
            {/if}
            <div class="modal-body {cardClassBody}">
                <slot name="modal-body" />
            </div>
            {#if withFooter}
                <div class="modal-footer {modalClassFooter}">
                    <slot name="card-footer" />
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .modal{
        background: var(--modal-background);
    }
    .modal-content{
        background: var(--boxes-bg);
    }
    .close{
        display: flex;
        justify-content: end;
        margin-top: 5px;
        margin-right: 5px;
    }
    .close i{
        padding: 5px;
        cursor: pointer;
    }
</style>

