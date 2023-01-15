<script lang="ts">
    export let isLoading: boolean;
    import Tabs from "../UI/Tabs.svelte";
    import type { TabType } from "../../utils/types";
    import Navbar from "../UI/Navbar/Navbar.svelte";
    import { userStore } from "../../utils/stores";
    import LoadingComponent from "../UI/LoadingComponent.svelte";

    const tabs: TabType[] = [
        {
            tabID: "tab1",
            tabName: "Information",
            component: false,
            isActive: false,
        },
        {
            tabID: "tab2",
            tabName: "Main",
            component: true,
            isActive: true,
        },
    ];
</script>

<Navbar darkModeOption={true}/>
{#if isLoading}
    <LoadingComponent className={"page"}/>
{:else}
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
{/if}
