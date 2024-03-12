<script>
    import user from '../user';
    import Login from '../lib/Login.svelte';

    $: isLoggedin = $user === null? false : true;

    const logout = () => {
        user.update(val => val = null);
    }
    import { Button } from "$lib/components/ui/button";
</script>
<style>
	:global(body) {
		background-color: #f2eee2;
		color: #0084f6;
		transition: background-color 0.3s
	}
	:global(body.dark-mode) {
		background-color: #1d3040;
		color: #bfc2c7;
	}
</style>
<h1 class="text-3xl font-bold text-blue-900">Welcome to our ML team</h1>
{#if isLoggedin}
<h2>Thank You for loggin in!</h2>
<Button href = "https://monkeytype.com/">Logout!</Button>
<!--<input type="button" value="Logout!" on:click={logout}/>-->
{:else}
<br>
<h2>Would you like to log in?</h2>
<Login/>
{/if}
