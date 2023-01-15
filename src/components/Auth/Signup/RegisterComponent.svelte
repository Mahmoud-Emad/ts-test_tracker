<script lang="ts">
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import Authentication from "../../../apis/authentication/Authentication";
    import parseJwt from "../../../apis/authentication/JWTPars";
    import RegisterForm from "./RegisterForm.svelte";

    let CredentialsFoundTimer: number = 10;
    let CredentialsFound: boolean = false;
    const urlParams = new URLSearchParams(window.location.search);
    const signatureParam = urlParams.has('signature');
    let signature = urlParams.get('signature');

    function credentialsFound(){
        if(CredentialsFoundTimer > 0){
            setTimeout(() => {
                CredentialsFoundTimer -= 1
                credentialsFound();
            }, 1000)
            CredentialsFound = true;
        } else {
            window.location.href = "/";
        };
    };

    onMount(() => {
        if (signatureParam){
            const invitationData = Authentication.invitation(signature)
            console.log(invitationData);
        } else {
            const accessToken: string = localStorage.getItem("accessToken");
            if(accessToken){
                if (parseJwt(accessToken)){
                    credentialsFound();
                };
            };
        }
    });
    
</script>
<div class="vh-100 py-5">
    {#if CredentialsFound}
        <div class="counter-container">
            <div class="register-counter">
                <p class="counter">{CredentialsFoundTimer}</p>
                <p class="mt-4">Credentials Found, Will redirect you to the <Link to="/">home page</Link> after</p>
            </div>
        </div>
    {:else}
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
                <div class="card" style="border-radius: 25px;">
                    <div class="card-body p-md-5">
                        <div class="row justify-content-center">
                            <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                <RegisterForm />
                            </div>
                            <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                <img src="../../register.webp" class="img-fluid" alt="Registerimage" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
