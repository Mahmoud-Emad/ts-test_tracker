<script lang="ts">
    import type { TabType } from "../../utils/types";
    import { generateUUID } from "../../utils/helpers";
    export let tabs: TabType[];

    const eleID: string = generateUUID().slice(0,5);
</script>

<ul class="nav nav-tabs mb-5" id="ex1-{eleID}" role="tablist">
    {#each tabs as tab}
        <li class="nav-item nav-style" role="presentation">
            <a
                class="nav-link nav-link-tab {tab.isActive ? 'active' : ''}"
                id="{tab.tabID}"
                data-mdb-toggle="tab"
                href="#{tab.tabID}-tabs"
                role="tab"
                aria-controls="{tab.tabID}-tabs"
                aria-selected="true">
                {tab.tabName}
            </a>
        </li>
    {/each}
</ul>

<div class="tab-content" id="ex1-{eleID}-content">
    {#each tabs as tab}
        <div
            class="tab-pane fade {tab.isActive ? 'show active' : ''}"
            id="{tab.tabID}-tabs"
            role="tabpanel"
            aria-labelledby="{tab.tabID}">
            <svelte:component this={tab.component}/>
        </div>
    {/each}
</div>

<style>
    .nav-style {
        width: 50%;
        text-align: center;
    }
</style>
