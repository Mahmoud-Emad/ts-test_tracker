<script lang="ts">
  import { Link } from 'svelte-navigator';
  import type { ProjectsType, TestPlanChart } from '../../utils/types';

  export let plan: TestPlanChart;
  export let project: ProjectsType;
</script>

<div class="card mb-3">
  <Link
    to="/projects/{project.id}/test-plans/{plan.id}"
    class="text-primary d-block text-decoration-none"
  >
    <div class="card-body pb-2">
      <h5 class="card-title text-primary">
        {plan.title}
      </h5>
      <div class="pt-4">
        <div class="row">
          <div class="col-6 col-md-6 col-sm-6 col-xs-8">
            <p class="text-color">
              Created: <strong>{plan.created}</strong>
            </p>
          </div>
          <div class="col-6 col-md-6 col-sm-6 col-xs-8">
            <p class="text-color">
              Updated: <strong>{plan.modified}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Link>
</div>
