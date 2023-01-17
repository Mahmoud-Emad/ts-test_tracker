|<script lang="ts">
    import { userStore } from "../../utils/stores";
    import Input from "../UI/Forms/Input.svelte";
</script>

<div class="card card-style">
    {#if $userStore.permission !== "admin"}
        <small class="text-center pt-2 pb-0 mb-0">
            <span class="text-danger">
                * Hint - 
            </span>
            Only the host who can set your permission.
        </small>
        <Input
            disabled={true}
            label={"Permission"} 
            type={"text"}
            bind:value={$userStore.permission}
            validation={() => {}}
        />
    {/if}
    <Input
        label={"New Password"} 
        type={"password"} 
        bind:value={$userStore.password1}
        validation={() => {}}
    />
    <Input
        label={"Re Type New Password"} 
        type={"password"}
        bind:value={$userStore.password2}
        validation={() => {}}
    />
</div>