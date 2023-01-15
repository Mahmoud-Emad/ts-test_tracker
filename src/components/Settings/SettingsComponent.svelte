<script lang="ts">
    export let isLoading: boolean;
    import Tabs from "../UI/Tabs.svelte";
    import type { TabType } from "../../utils/types";
    import Navbar from "../UI/Navbar/Navbar.svelte";
    import { alertStore, userStore } from "../../utils/stores";
    import LoadingComponent from "../UI/LoadingComponent.svelte";
    import ProfileInformation from "./ProfileInformation.svelte";
    import UpdatePassword from "./UpdatePassword.svelte";
    import SettingsService from "../../apis/settings";
    import Alert from "../UI/Alert.svelte";
    import Button from "../UI/Forms/Button.svelte";
    import { validateName, validatePhone } from "../../utils/validators";

    const tabs: TabType[] = [
        {
            tabID: "tab1",
            tabName: "Information",
            component: ProfileInformation,
            isActive: true,
        },
        {
            tabID: "tab2",
            tabName: "Main",
            component: UpdatePassword,
            isActive: false,
        },
    ];

    const updateSettings = async () => {
        return await SettingsService.update($userStore)
    };

    $: disabledForm = 
        !validateName($userStore.first_name).isValid ||
        !validateName($userStore.last_name).isValid ||
        !validatePhone($userStore.phone).isValid;

</script>

<Navbar darkModeOption={true}/>
{#if isLoading}
    <LoadingComponent className={"page"}/>
{:else}
    <div class="container">
        <div class="mt-3">
            <div class="header">
                <strong class="h4">Settings | 
                    <strong class="text-primary">{$userStore.first_name} {$userStore.last_name}</strong>
                </strong>
            </div>
            <div class="mt-3">
                <Tabs {tabs}/>
            </div>
        </div>

        <div class="mt-3">
            {#if $alertStore.isOpen}
                <Alert 
                    isOpen={$alertStore.isOpen} 
                    message={$alertStore.message} 
                    title={$alertStore.title}
                    className={$alertStore.className}
                    error={$alertStore.error}
                />
            {/if}
        </div>

        <div class="mt-3 d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <Button 
                className = {"btn btn-primary btn-lg"}
                onClick = {updateSettings}
                disabled = {disabledForm}
                text = {"Save"}
            />
        </div>
    </div>
{/if}
