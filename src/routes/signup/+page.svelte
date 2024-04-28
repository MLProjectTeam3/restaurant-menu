<script>
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { authHandlers, authStore } from "../../stores/authStore.js";
	let email = "";
	let password = "";
	let confirmPassword = "";
	let error = false;
	let register = false;
	let authenticating = false;

	async function handleSubmit() {
		if (!email || !password || (register && !confirmPassword)) {
			error = true;
			return;
		}

		try {
			if (!register) {
				await authHandlers.login(email, password);
			} else {
				await authHandlers.signup(email, password);
			}
			if ($authStore.user) {
				window.location.href = "/home";
			}
		} catch (err) {
			console.log("There was an auth error", err);
			error = true;
			authenticating = false;
		}
	}
	function handleRegister() {
		register = !register;
	}
</script>

<div class="max-h-full flex justify-center items-center">
	<img
		src="images/landingBg11.jpg"
		class="absolute h-full w-screen blur-lg z-10 opacity-70"
		alt="bgImage"
	/>
	<div class="absolute bg-black h-full w-screen z-0" />
	<Card.Root
		class="z-20 pt-[12vh] md:pt-0 md:mt-24 md:h-[80vh] md:w-1/5 md:border-4 md:shadow-lg border-none rounded-none md:rounded-lg shadow-none w-screen flex flex-col items-center justify-between h-screen"
	>
		<Card.Header
			class="text-6xl md:text-4xl md:pt-16 w-2/3 text-center text-primary"
		>
			<Card.Title
				><h1 class="font-normal">
					{register ? "Signup" : "Login"}
				</h1></Card.Title
			>
		</Card.Header>

		<Card.Content>
			{#if error}
				<p class="error">
					The information you have entered is not correct
				</p>
			{/if}
			<form
				action=""
				class="flex flex-col md:block md:w-full"
			>
				<p class="text-primary text-2xl md:text-base">Email</p>
				<input
					bind:value={email}
					type="email"
					class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10 md:h-8 mb-4"
					placeholder="Email"
				/>
				<!-- <p class="text-primary text-2xl md:text-base">Phone Number</p>
				<input
					type="number"
                    class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10 mb-4 md:h-8"
					placeholder="Number"
				/> -->
				<p class="text-primary text-2xl md:text-base">Password</p>
				<input
					bind:value={password}
					type="password"
					class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10 mb-4 md:h-8"
					placeholder="Password"
				/>
				{#if register}
					<p class="text-primary text-2xl md:text-base">
						Confirm Password
					</p>
					<input
						bind:value={confirmPassword}
						type="password"
						class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10 mb-4 md:h-8"
						placeholder="Password"
					/>

					<Button
						on:click={handleSubmit}
						class="text-2xl p-8 rounded-xl self-center mt-16 md:mt-4 md:p-6 md:text-base md:ml-[70px]"
						>Create Account</Button
					>
				{:else}
					<Button
						on:click={handleSubmit}
						class="text-2xl p-8 rounded-xl self-center mt-16 md:mt-4 md:p-6 md:text-base md:ml-[70px]"
						>Login</Button
					>
				{/if}
			</form>
		</Card.Content>
		<Card.Footer>
			{#if register}
				<div
					class="text-2xl md:text-lg"
					role="button"
					tabindex="0"
					on:click={() => {
						register = false;
					}}
					on:keydown={() => {}}
				>
					Already have an account? Log in
				</div>
			{:else}
				<div
					class="text-2xl md:text-lg"
					role="button"
					tabindex="0"
					on:click={() => {
						register = true;
					}}
					on:keydown={() => {}}
				>
					Don't have an account?
					<p>Sign Up</p>
				</div>
				<!-- <div
					role="button"
					tabindex="0"
					on:click={() => {
						authHandlers.resetPassword(email);
					}}
					on:keydown={() => {}}
				>
					Forgot Password?
				</div> -->
			{/if}
		</Card.Footer>
		<!-- <Card.Footer>
			<p class="text-2xl md:text-lg">Already have an account?</p>
			<a href="/login"><u class="text-2xl md:text-lg">Login</u></a>
		</Card.Footer> -->
	</Card.Root>
</div>
