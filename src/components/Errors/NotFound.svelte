<script>
    import { navigate } from "svelte-navigator";


    function homePage() {
        navigate("/")
    }

</script>

<svelte:head>
 <title>Not Found</title>
</svelte:head>

<div class="d-flex h-100 justify-content-center align-items-center">
    <div class="col-md-12 text-center">
        <span class="display-1 d-block">404</span>
        <div class="mb-4 lead">The page you are looking for was not found.</div>
        <button type="button" class="btn btn-primary " 
            on:click={homePage}>
            Back to Home
        </button>
    </div>
</div>
