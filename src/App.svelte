<script lang="ts">
	// Routers
	import Router from "./routes/Router.svelte";
	import { notifacationStore, userStore } from "./utils/stores";
	import Toast from "./components/UI/Toast.svelte";
	import User from "./apis/users";
    import { onMount } from "svelte";
    import { navigate } from "svelte-navigator";
    import parseJwt from "./apis/authentication/JWTPars";
    import { setTheme } from "./utils/helpers";
	import ServerError from "./components/Errors/ServerError.svelte";
	import NotFound from "./components/Errors/NotFound.svelte";
    import NetworkError from "./components/Errors/NetworkError.svelte";


	let isLoading: boolean = false;
	let isError404: boolean = false;
	const mode = localStorage.getItem("mode")

	onMount(async () => {
		setTheme(mode)
		isLoading = true;
		const accessToken = localStorage.getItem("accessToken");
		const blockedRoutes = ["/auth/login", "/auth/register"]
        if(parseJwt(accessToken)){
			try {
				if(!blockedRoutes.includes(window.location.pathname)){
					await User.profile().then(
						(data) => {$userStore = data}
					);
				}
			} catch (error) {
				window.location.href = '/auth/login';		
			};
        } else {
			if(!blockedRoutes.includes(window.location.pathname)){
				window.location.href = '/auth/login';
			}
		}
		isLoading = false;
    });
</script>

<!-- If there are internal errors e.g. server error -->
{#if $notifacationStore.statusCode === 500}
	<ServerError />
{:else if isError404 || $notifacationStore.statusCode === 404}
	<NotFound />
{:else if $notifacationStore.push }
	<NetworkError />
	<Toast 
		className={$notifacationStore.className}
		message={$notifacationStore.message}
		title={$notifacationStore.title}
		hint={$notifacationStore.hint}
		timeOut={$notifacationStore.timeOut}
		isOpen={$notifacationStore.push}
	/>
{:else}
	<Router bind:isLoading bind:isError404/>
{/if}
