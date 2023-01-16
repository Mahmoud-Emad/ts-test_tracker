<script>
    import { navigate } from "svelte-navigator";

    function homePage() {
        navigate("/")
    }

</script>

<svelte:head>
    <title>Test-Tracker | NotFound</title>
</svelte:head>

<div class="container mt-4 mb-4">
    <div class="row pt-4 mt-4">
        <div class="col-6 col-offset-1">
          <h1 class="text-primary">Oops!</h1>
          <h2>We can't seem to find the page you're looking for.</h2>
          <h6>Error code: 404</h6>
          <button type="button" class="btn btn-primary mt-4" 
            on:click={homePage}>
            Back to Home
        </button>
        </div>
        <div class="col-6 col-offset-1 text-center">
          <img src="../../500.gif" width="313" height="428" alt="Girl has dropped her ice cream.">
        </div>
    </div>
</div>


<style>
    h1{
        margin-top: 50px;
        font-size: 100px;
        color: rgb(48 48 48);
    }
</style>