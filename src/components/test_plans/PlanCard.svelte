<script lang="ts">
    import { Link } from "svelte-navigator";
    import type { TestPlanChart } from "../../utils/types";
    import { projectsStore } from "../../utils/stores";

    export let plan: TestPlanChart;
</script>

<div class="card mb-3">
    <Link
        to="/projects/{$projectsStore[0].id}/test-plans/{plan.id}"
        class="text-primary d-block text-decoration-none"
    >
        <div class="card-body pb-2">
            <h5 class="card-title text-primary">
                {plan.title}
            </h5>
            <div class="pt-4">
                <div class="row">
                    <div class="col-6 col-md-6 col-sm-6 col-xs-8">
                        <p class="text-muted">
                            Created: <strong>{plan.created}</strong>
                        </p>
                    </div>
                    <div class="col-6 col-md-6 col-sm-6 col-xs-8">
                        <p class="text-muted">
                            Updated: <strong>{plan.modified}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Link>
</div>