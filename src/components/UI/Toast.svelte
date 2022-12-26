<script lang="ts">
    import { Toast, ToastBody, ToastHeader } from 'sveltestrap';
    import type { ToastEnum } from "../../utils/types";

    export let className: ToastEnum | string;
    export let timeOut: number;
    export let title: string;
    export let message: string;
    export let hint: string | null = null;
    export let isOpen: boolean = false;

    function toggle() {
        isOpen = !isOpen;
        timeOut = 0;
    };

    function setTimeOut(){
        if(timeOut !== 0){
            setTimeout(() => {
                isOpen = false;
                timeOut = 0;
            }, timeOut);
        };
    }
    $:timeOut, setTimeOut()
    
</script>
  
<Toast {isOpen} class="notifacation">
    <ToastHeader {toggle} class="notifacation-header notifacation-header-{className}">{title}</ToastHeader>
    <ToastBody class="notifacation-body notifacation-body-{className}">
        {message}
    </ToastBody>
    {#if hint}
        <span class="{className.toString()}">{hint}</span>
    {/if}
</Toast>
