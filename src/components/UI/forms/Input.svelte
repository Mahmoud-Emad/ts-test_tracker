<script lang="ts">
  import type { InputValidationsType } from '../../../utils/types';

  export let value: string | undefined = undefined;
  export let label = '';
  export let type = 'text';
  export let disabled = false;
  export let className = '';
  export let validation: CallableFunction | undefined = undefined;

  let validateClass: string;
  let elmID: string;
  let validated: InputValidationsType;

  function typeAction( node: HTMLInputElement ) {
    node.type = type;
    elmID = label.replace( ' ', '-' ).toLocaleLowerCase() + '-id';
  }

  const validate = () => {
    if ( validation != undefined ) {
      validated = validation( value );
      if ( validated && validated.isValid ) {
        validateClass = 'is-valid text-success';
      } else if ( value === undefined ) {
        validateClass = '';
      } else if ( validated.isValid === false ) {
        validateClass = 'is-invalid error-border text-danger';
      }
    }
  };

  $: value, validate();
</script>

<div class="form-group p-2 mb-2">
  {#if label}
    <strong>
      <label for={elmID}>{label}</label>
    </strong>
  {/if}
  <input
    bind:value
    use:typeAction
    {disabled}
    class="form-control mt-2 input {className} {validateClass}"
    style={type === 'password' ? 'display: inline;' : ''}
    id={elmID}
  />
  {#if type === 'password'}
    <!-- Eye icon to show password -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <i
      class="fa-solid fa-eye fa-eye-custom"
      id="eye"
      on:click={() => {
        const passwordInput = document.querySelector( `#${elmID}` );
        const type =
          passwordInput.getAttribute( 'type' ) === 'password'
            ? 'text'
            : 'password';
        passwordInput.setAttribute( 'type', type );
      }}
    />
  {/if}

  {#if validation != undefined && validated && validated.errorMessage}
    <div id={elmID} class="invalid-feedback">
      <span class="alert-link">{validated.errorMessage}</span>
    </div>
  {/if}
</div>

<svelte:head>
  <style>
    .input:focus {
      transition: all 0.1s linear;
      border: 0.5px solid rgb(255 0 30);
    }
    .error-validation {
      transition: all 0.1s linear;
      box-shadow: none;
      border: 1px solid rgb(255 0 30);
    }
    .success-validation {
      transition: all 0.1s linear;
      box-shadow: none;
      border: 1px solid rgb(255 0 30);
    }
    .form-control.is-invalid:focus,
    .was-validated .form-control:invalid:focus {
      box-shadow: none;
      border-color: rgb(249 49 84) !important;
    }
    .form-control.is-valid:focus,
    .was-validated .form-control:valid:focus {
      box-shadow: none;
      border-color: rgb(0 183 74) !important;
    }
    .fa-eye-custom {
      margin-left: -30px;
      cursor: pointer;
      color: var(--text-primary);
    }
  </style>
</svelte:head>
