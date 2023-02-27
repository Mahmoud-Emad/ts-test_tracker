<script lang="ts">
    import { projectsStore, testPlansStore } from "../../utils/stores";
</script>

<div class="pt-0">
    <p class="h5">
        <span class="text-primary">
            {$projectsStore[0].title}
        </span> 
        | Test-Plans
    </p>
    <p class="text-muted">
        There {$testPlansStore.length <= 1 ? "is" : "are"} 
        <strong class="text-primary">{$testPlansStore.length}</strong>
        {$testPlansStore.length <= 1 ? "plan" : "plans"}
        associated.
    </p>
</div>