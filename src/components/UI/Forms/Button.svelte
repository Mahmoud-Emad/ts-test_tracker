<script lang="ts">
    import Loadingbtn from "../Loadingbtn.svelte";

    export let className: string;
    export let onClick: CallableFunction;
    export let text: string;
    export let disabled: boolean = false;
    export let isLoading: boolean = false;
    export let icon: string = null;

</script>

<button 
    class="btn {className}" 
    disabled={disabled}
    on:click|preventDefault={async () => {
        disabled = true;
        isLoading = true;
        await onClick();
        disabled = false;
        isLoading = false;
    }}
    >
    {#if isLoading}
        <Loadingbtn />
    {:else}
        {#if icon}
            <i class={icon}></i>
            {text}
        {:else}
            {text}
        {/if}
    {/if}
</button>