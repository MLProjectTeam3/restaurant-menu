<script>
	import { Button } from "./ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { auth } from "../../lib/firebase/firebase.client";
	import { authHandlers, authStore } from "../../stores/authStore";
	let email;
	authStore.subscribe((curr) => {
		console.log("CURR", curr);
		email = curr?.currentUser?.email;
	});
</script>

<div
	class="navbar invisible md:visible z-50 p-4 w-full bg-background border-b-2 border-primary border-opacity-15 flex items-center justify-between fixed top-0"
>
	<a
		href="/home"
		class="flex justify-center items-center space-x-2"
	>
		<img
			src="icons/coffee.svg"
			alt="Coffee"
			class="h-8 stroke-primary"
		/>
		<h1 class="text-2xl text-primary">CAFE SANMATHI</h1>
	</a>

	<div
		class="flex text-xl font text-primary justify-between items-center space-x-16"
	>
		<a href="/home">Home</a>
		<a href="/menu">Menu</a>
		<a href="/home#about">AboutUs</a>
		<a href="/home#contact">Contact</a>
		<a href="/home#reviews">Reviews</a>
	</div>

	<div class="flex justify-center items-center space-x-8">
		<a href="/cart">
			<img
				src="icons/shoppingCart.svg"
				alt="Shopping Cart"
				class="h-7"
			/>
		</a>
		<a href="/signup"><Button variant="outline">login</Button></a>
	</div>
</div>

<div
	class="navbar md:invisible z-50 p-4 w-full bg-background border-b-2 border-primary border-opacity-15 flex items-center justify-between fixed top-0"
>
	<a
		href="/home"
		class="flex justify-center items-center space-x-2"
	>
		<img
			src="icons/coffee.svg"
			alt="Coffee"
			class="h-8"
		/>
		<h1 class="text-2xl text-primary">CAFE SANMATHI</h1>
	</a>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<img
				src="icons/menu.svg"
				alt="menu"
			/>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-1/2 bg-background">
			<DropdownMenu.Group>
				<a href="/home">
					<DropdownMenu.Item class="text-xl">Home</DropdownMenu.Item>
				</a>
				<DropdownMenu.Separator />
				<a href="/menu">
					<DropdownMenu.Item class="text-xl">Menu</DropdownMenu.Item
					><DropdownMenu.Separator />
				</a>
				<a href="/home#about">
					<DropdownMenu.Item class="text-xl"
						>AboutUs</DropdownMenu.Item
					><DropdownMenu.Separator />
				</a>
				<a href="/home#contact">
					<DropdownMenu.Item class="text-xl"
						>Contact</DropdownMenu.Item
					><DropdownMenu.Separator />
				</a>
				<a href="/home#reviews">
					<DropdownMenu.Item class="text-xl"
						>Reviews</DropdownMenu.Item
					><DropdownMenu.Separator />
				</a>
			</DropdownMenu.Group>
			<DropdownMenu.Group
				class="p-2 border-t border-primary border-opacity-25"
			>
				{#if $authStore.currentUser}
					<div class="flex justify-between items-center">
						<h1>{email}</h1>
						<button on:click={authHandlers.logout}>Logout</button>
						<a href="/cart"
							><img
								src="icons/shoppingCart.svg"
								alt="menu"
							/></a
						>
					</div>
				{:else}
					<div class="flex justify-between items-center">
						<a href="/signup"
							><Button variant="outline">LOGIN</Button></a
						>

						<a href="/cart"
							><img
								src="icons/shoppingCart.svg"
								alt="menu"
							/></a
						>
					</div>
				{/if}
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
