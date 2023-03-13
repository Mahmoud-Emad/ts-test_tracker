<script lang="ts">
  import type { InputValidationsType } from '../../../utils/types';

  export let label: string;
  export let value: string;
  export let className = '';
  export let validation: CallableFunction | undefined = undefined;

  let validateClass: string;
  let validated: InputValidationsType;
  const elmID: string = label.replace( ' ', '-' ).toLocaleLowerCase() + '-id';

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
  <strong>
    <label for={elmID}>{label}</label>
  </strong>
  <textarea
    id={elmID}
    bind:value
    class="form-control mt-2 input {className} {validateClass}"
  />
  {#if validation != undefined && validated && validated.errorMessage}
    <div id={elmID} class="invalid-feedback">
      <span class="alert-link">{validated.errorMessage}</span>
    </div>
  {/if}
</div>

<style>
  textarea {
    height: 150px;
    max-height: 150px;
  }
</style>
