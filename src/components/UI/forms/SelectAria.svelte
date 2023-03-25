<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type {
    RequirementsDocChart,
    TestPlanChart,
    TestSuiteChart,
  } from '../../../utils/types';

  export let items: TestPlanChart[] | RequirementsDocChart[] | TestSuiteChart[];
  const dispatch = createEventDispatcher();

  let selected: TestPlanChart | RequirementsDocChart | TestSuiteChart;
</script>

<h2>Insecurity questions</h2>

<form
  on:submit|preventDefault={() => {
    dispatch( 'select', {
      selected: selected,
    } );
  }}
>
  {#if items}
    <select bind:value={selected}>
      {#each items as item}
        <option value={item.id}>
          {item.title}
        </option>
      {/each}
    </select>
  {/if}
</form>
