<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type {
    RequirementsDocChart,
    TestPlanChart,
    TestSuiteChart,
  } from '../../../utils/types';

  export let value: TestPlanChart[] | RequirementsDocChart[] | TestSuiteChart[];
  export let label: string;
  export let onClick: CallableFunction;

  let selected: number = value[0].id;
  const elmID = label.replace( ' ', '-' ).toLocaleLowerCase() + '-id';

  onMount( () => {
    onClick( selected );
  } );
</script>

<div class="form-group p-2 mb-2">
  {#if label}
    <strong>
      <label for={elmID}>{label}</label>
    </strong>
  {/if}
  <select
    id={elmID}
    class="form-control mt-2 input is-valid text-success"
    bind:value={selected}
    on:change={() => {
      onClick( selected );
    }}
  >
    {#each value as item}
      <option value={item.id}>
        {item.title}
      </option>
    {/each}
  </select>
</div>
