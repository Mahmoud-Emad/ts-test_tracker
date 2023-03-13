<script lang="ts">
  import Loadingbtn from '../loading/Loadingbtn.svelte';

  export let className: string;
  export let onClick: CallableFunction;
  export let text: string;
  export let disabled = false;
  export let isLoading = false;
  export let icon: string = null;
  export let tooltip = ''; // prevent blank tooltips
</script>

<button
  class="btn {className}"
  style={icon && text.length < 1 ? 'width:60px' : ''}
  data-tooltip={tooltip.length > 0 ? tooltip : null}
  {disabled}
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
  {:else if icon}
    <i class={icon} aria-hidden="true" />
    {text}
  {:else}
    {text}
  {/if}
</button>

<style>
  .delete-btn {
    color: var(--text-color);
    background: rgb(0 0 0 / 0%);
    border-color: rgb(249 49 84);
    border: 1px solid rgb(249 49 84);
    width: 100%;
  }
  .delete-btn:focus {
    color: #fff;
    background: rgb(249 49 84);
    border-color: rgb(249 49 84);
    border: 1px solid var(--text-color);
    width: 100%;
  }
</style>
