<script lang="ts">
    import Modal from "../UI/Modals/Modal.svelte";
    export let openModal: boolean;

</script>

<Modal bind:openModal>
    <div slot="modal-body">
        Hello
    </div>
</Modal>