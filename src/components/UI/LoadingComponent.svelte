<script lang="ts">
    export let className: string = "";
</script>

<div class="{className == 'page' ? 'pageLoading' : className}">
    <div class="spinner-grow" role="status">
        <span class="visually-hidden"></span>
    </div>
</div>

<style>
    .pageLoading{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>