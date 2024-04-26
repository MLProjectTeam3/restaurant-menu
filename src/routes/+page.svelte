<script>
	import { goto } from "$app/navigation";
	import Auth from "$lib/components/Auth.svelte";
	import { onMount } from "svelte";
	onMount(() => {
		goto("/home");
	});
</script>
