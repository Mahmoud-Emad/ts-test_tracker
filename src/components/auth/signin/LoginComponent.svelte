<script lang="ts">
  import LoginForm from './LoginForm.svelte';
  export let isLoading: boolean;
</script>

<section class="container">
  <div class="vh-100 py-5">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="img-fluid"
          alt="Phoneimage"
        />
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <LoginForm bind:isLoading />
      </div>
    </div>
  </div>
</section>
