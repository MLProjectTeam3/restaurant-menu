<script>
	import { cn } from "$lib/utils.js.js";
	let className = undefined;
	export { className as class };
</script>

<p class={cn("text-sm text-muted-foreground", className)} {...$$restProps}>
	<slot />
</p>
