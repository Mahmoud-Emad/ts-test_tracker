<script lang="ts">
    import { generateUUID } from "../../../utils/helpers";
    import type { InputValidationsType } from "../../../utils/types";


    export let value    : string | undefined = undefined;
    export let label    : string = "";
    export let type     : string = "text";
    export let disabled : boolean = false;
    export let className: string = '';
    export let validation: InputValidationsType = {};

    let validateClass: string;    
    let elmID: string;

    function typeAction(node: HTMLInputElement) {
		node.type = type;
        elmID = label.replace(" ", "-").toLocaleLowerCase() + "-id"
	};

    const validate = () => {
        if(validation.isValid){
            validateClass = "is-valid text-success";
        }else if(value === undefined){
            validateClass = ""
        } else if (validation.isValid === false){
            validateClass = "is-invalid error-border text-danger";
        };
    };

    $: value, validate();
</script>


<div class="form-group p-2 mb-2">
    {#if label}
        <strong>
            <label for={elmID}>{label}</label>
        </strong>
    {/if}
    <input bind:value use:typeAction disabled={disabled}
        class = "form-control mt-2 input {className} {validateClass}"
        style = "{type === 'password' ? 'display: inline;' : ''}"
        id={elmID}
    >
    {#if type === "password"}
        <!-- Eye icon to show password -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <i class="fa-solid fa-eye" id="eye" on:click={() => {
            const passwordInput = document.querySelector(`#${elmID}`);
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
        }}></i>
    {/if}
    
    {#if validation.errorMessage}
        <div id={elmID} class="invalid-feedback">
            <span class="alert-link">{validation.errorMessage}</span>
        </div>
    {/if}
</div>

<style>
    .input:focus{
        transition: all .1s linear;
        border-color: rgb(255 0 30 / 0%);
        box-shadow: inset 0 0 0 1px #cbb5b5;
    }
    .error-validation{
        transition: all .1s linear;
        border-color: rgb(255 0 30);
        box-shadow: inset 0 0 0 1px #ffffff;
    }
    .success-validation{
        transition: all .1s linear;
        border-color: rgb(255 0 30);
        box-shadow: inset 0 0 0 1px #ffffff;
    }
    .fa-eye{
        margin-left: -30px;
        cursor: pointer;
        color: var(--text-primary)
    }
</style>