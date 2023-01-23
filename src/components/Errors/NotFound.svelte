<script>
    import { navigate } from "svelte-navigator";
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
            <div class="links">
                <p class="mb-0">Here are some helpful links instead:</p>
                <a class="text-primary" href="/">Home</a>
                <a class="text-primary" href="/projects">Projects</a>
                <a class="text-primary" href="/members">Members</a>
                <a class="text-primary" href="/settings">Settings</a>
            </div>
        </div>
        <div class="col-6 col-offset-1 text-center">
          <img src="../../error.gif" width="313" height="428" alt="Girl has dropped her ice cream.">
        </div>
    </div>
</div>


<style>
    h1{
        margin-top: 50px;
        font-size: 100px;
        color: rgb(48 48 48);
    }
    .links{
        display: grid;
    }
    .links a:hover{
        text-decoration: underline !important;
        padding-left: 3px;
        transition: .3s;
    }
</style>