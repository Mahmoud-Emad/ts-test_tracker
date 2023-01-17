<script lang="ts">
    import Input from "../../UI/Forms/Input.svelte";
    import Botton from "../../UI/Forms/Button.svelte"
    import { validateEmail, validateEmptyInput } from "../../../utils/validators"
    import { loginCredentials, ToastEnum, TokensType } from "../../../utils/types";
    import authenticationAPI from "../../../apis/authentication/Authentication";
    import GitHubAPI from "../../../apis/authentication/GitHub";
    import Alert from "../../UI/Alert.svelte";
    import { alertStore, authStore } from "../../../utils/stores";
    import { createNewNotifacation, updateThem } from "../../../utils/helpers"
    import { Link, navigate } from "svelte-navigator";
    import { onMount } from "svelte";
    import parseJwt from "../../../apis/authentication/JWTPars";
    import { clearAlertMessage, clearNotifacationStore } from "../../../utils/helpers";
    import GithubLogin from "svelte-github-login";

    let loginCredentials: loginCredentials = {};

    onMount(() => {
        clearAlertMessage();
		clearNotifacationStore();
        const accessToken = localStorage.getItem("accessToken");
        if(parseJwt(accessToken)){
            navigate("/");
        };
    });

    const requestToLogin = async (data: loginCredentials) => {
        await authenticationAPI.login(
            data
        ).then((data: TokensType) => {
            if(data.access_token){
                authStore.updateTokens(data.access_token, data.refresh_token);
                updateThem();
                window.location.href = "/";
            };
        });
    };

    async function loginViaGitHub(code: string){
        disabledForm = true;
        if(code) {
            await GitHubAPI.gitHubToken(code).then(
                async (access_token: string) => {
                    await GitHubAPI.getUser(access_token).then(
                        (data: TokensType) => {
                            if(access_token){
                                authStore.updateTokens(data.access_token, data.refresh_token);
                                disabledForm = false;
                                updateThem();
                                window.location.href = "/";
                            };
                        }
                    );
                }
            );
        }else{
            createNewNotifacation(
                ToastEnum.danger.toString(),
                "",
                "GitHub code must be string not undefined",
                "GitHub Code Is Required!",
                0
            );
        };
    };

    $: disabledForm = 
        !validateEmptyInput(loginCredentials.password).isValid ||
        !validateEmail(loginCredentials.email).isValid;
</script>

<div class="card">

    <div class="card-header">
        <strong>
            We were missing you!
        </strong>
    </div>

    <div class="card-body">
        <Input 
            bind:value={loginCredentials.email} 
            label={"Email"}
            validation = {validateEmail}
        />
        <Input 
            bind:value={loginCredentials.password} 
            label={"Password"} 
            type={"password"}
            validation = {validateEmptyInput}
        />
        {#if $alertStore.isOpen}
            <Alert 
                isOpen={$alertStore.isOpen} 
                message={$alertStore.message} 
                title={$alertStore.title}
                className={$alertStore.className}
                error={$alertStore.error}
                close={false}
            />
        {/if}
    </div>

    <div class="card-footer">
        <div class="d-flex justify-content-end">
            <Botton 
                text={"Login"}
                disabled={disabledForm}
                className={"btn btn-primary"}
                onClick={() => {
                    requestToLogin(loginCredentials)
                }}
            />
        </div>
        <div class="mt-2">
            <p>
                Don't have an account? <Link to="/auth/register" class="text-primary">Sign up</Link> 
            </p>
        </div>
        <div class="uomiauth">
            <span>OR</span>
        </div>
        <div class="d-flex mt-3 justify-content-center">
            <GithubLogin
                clientId="cbe847a6d887c0ed34a2"
                scope="user:email,read:org"
                redirectUri="http://localhost:8080/auth/login"
                on:success={params => {
                    loginViaGitHub(params.detail.code)
                }}
                on:error={error => console.log(error)}
                let:onLogin
                >
                <Botton 
                    text={"Login Via GitHub"}
                    className={"github-btn-style"}
                    onClick={() => {onLogin()}}
                    icon={'fa-brands github-icon-style fa-github'}
                />
            </GithubLogin>
        </div>
    </div>
</div>
