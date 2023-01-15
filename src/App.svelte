<script lang="ts">
	// Routers
	import Router from "./routes/Router.svelte";
	import { notifacationStore, userStore } from "./utils/stores";
	import Toast from "./components/UI/Toast.svelte";
	import User from "./apis/users";
    import { onMount } from "svelte";
    import { navigate } from "svelte-navigator";
    import parseJwt from "./apis/authentication/JWTPars";


	let isLoading: boolean = false;

	onMount(async () => {
		isLoading = true;
		const accessToken = localStorage.getItem("accessToken");
		console.log();
		const blockedRoutes = ["/auth/login", "/auth/register"]
        if(parseJwt(accessToken)){
			try {
				if(!blockedRoutes.includes(window.location.pathname)){
					console.log(window.location.pathname);
					await User.profile().then(
						(data) => {$userStore = data}
					);
				}
			} catch (error) {				
				return navigate('/auth/login');
			};
        } else {
			return navigate('/auth/login');
		}
		isLoading = false;
    });
</script>

{#if $notifacationStore.push}
	<Toast 
		className={$notifacationStore.className}
		message={$notifacationStore.message}
		title={$notifacationStore.title}
		hint={$notifacationStore.hint}
		timeOut={$notifacationStore.timeOut}
		isOpen={$notifacationStore.push}
	/>
{/if}

<Router bind:isLoading/>
