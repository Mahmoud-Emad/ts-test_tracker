<script lang="ts">
    import { Alert } from 'sveltestrap';

    export let className: string;
    export let title: string | null = null;
    export let message: string;
    export let isOpen: boolean;
    export let error: {};

    let timeOut: number = 0;

    function handleAlert(){
        if (isOpen && className != "danger"){
            timeOut = 3000;
            setTimeout(()=>{
                isOpen = false;
                timeOut = 0;
            }, timeOut)
        };
    };

    $: isOpen, handleAlert()
</script>

{#if isOpen}
    <Alert class="alert-{className}">
        {#if title}
            <h6 class="alert-heading text-capitalize">{title}</h6>
        {/if}
        {message}
        {#if error}
            <ul>
                {#each Object.entries(error) as [field, message]}
                    <li>
                        <strong>{field}</strong> <span>{message}</span>
                    </li>
                {/each}
            </ul>
        {/if}
    </Alert>
{/if}
