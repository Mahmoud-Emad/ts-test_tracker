<script lang="ts">
  import type { Requirements, TestPlanChart } from "../../../utils/types";
  import Card from "./Card.svelte";


    export let obj: Requirements | TestPlanChart 
</script>

<div class="row mt-4">
    <div class="col-6">
      <Card
        cardClassBody={'pb-2'}
        cardClassName={'mb-3 text-center text-content-card'}
      >
        <div slot="card-body">
          <p>Created : {obj.created}</p>
        </div>
      </Card>
    </div>
    <div class="col-6">
      <Card
        cardClassBody={'pb-2'}
        cardClassName={'mb-3 text-center text-content-card'}
      >
        <div slot="card-body">
          <p>Updated : {obj.updated}</p>
        </div>
      </Card>
    </div>
  </div>