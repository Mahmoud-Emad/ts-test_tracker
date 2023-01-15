|<script lang="ts">
    import { userStore } from "../../utils/stores";
    import { validateName, validatePhone } from "../../utils/validators";
    import Input from "../UI/Forms/Input.svelte";
</script>

<div class="card card-style">
    <small class="text-center pt-2 pb-0 mb-0">
        <span class="text-danger">
            * Hint - 
        </span>
        you are not allowed to change your email.
    </small>
    <Input
        disabled={true} 
        label={"Email."} 
        type={"email"} 
        bind:value={$userStore.email}
    />
    <Input
        label={"First Name."}
        type={"text"}
        bind:value={$userStore.first_name}
        validation={validateName($userStore.first_name)}
        />
    <Input
        label={"Last Name."} 
        type={"text"} 
        bind:value={$userStore.last_name}
        validation={validateName($userStore.last_name)}
    />
    <Input
        label={"Phone Number."} 
        type={"text"} 
        bind:value={$userStore.phone}
        validation={validatePhone($userStore.phone)}
    />
</div>