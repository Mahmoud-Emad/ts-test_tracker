<script lang="ts">
    export let tooltip: string // prevent blank tooltips
    export let onClick: CallableFunction;

</script>
<div class="nav-action">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span data-tooltip={tooltip} class="user_photo_nav c-pinter" on:click|preventDefault={async () => {
        await onClick();
    }}>
    <i class="fa fa-plus" aria-hidden="true"></i>
    </span>
</div>

<style>
    .c-pinter{
        cursor: pointer;
        font-size: 21px;
    }
    [data-tooltip] {
        position: relative;
        z-index: 2;
    }

    [data-tooltip]:before,
    [data-tooltip]:after {
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
            transition: .2s ease-out;
            transform: translate(-50%, 5px)
    }

    [data-tooltip]:before {
        position: absolute;
        top: 130%;
        left: 50%;
        margin-bottom: 5px;
        padding: 7px;
        width: 150px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        background-color: #000;
        background-color: hsla(0, 0%, 20%, 0.9);
        color: #fff;
        content: attr(data-tooltip);
        text-align: center;
        font-size: 14px;
        line-height: 1.2;
        transition: .2s ease-out
    }

    [data-tooltip]:after {
        position: absolute;
        top: 110%;
        left: 50%;
        width: 0;
        border-top: 5px solid #000;
        border-top: 5px solid hsla(0, 0%, 20%, 0.9);
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        content: " ";
        font-size: 0;
        line-height: 0;
    }

    [data-tooltip]:hover:before,
    [data-tooltip]:hover:after {
        visibility: visible;
        opacity: 1;
        transform: translate(-50%, 0)
    }
    [data-tooltip=false]:hover:before,
    [data-tooltip=false]:hover:after {
        visibility: hidden;
        opacity: 0;
    }
</style>