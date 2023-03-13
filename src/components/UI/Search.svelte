<script lang="ts">
  import Input from './forms/Input.svelte';
  import LoadingComponent from './loading/LoadingComponent.svelte';
  import { filterStore } from '../../utils/helpers';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export let store: any;
  export let label: string;
  export let searchField: string; // title, name, etc..
  export let value: string;

  let isLoading: boolean;
  $: value, filterStore( $store, searchField, value );
</script>

<Input bind:value {label} />

{#if isLoading}
  <LoadingComponent className={'component'} />
{/if}
