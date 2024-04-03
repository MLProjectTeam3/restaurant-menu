<script>
  import Navbar from "$lib/components/navbar.svelte";
  import "../lib/app.css";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  onMount(() => {
    goto('');
});
</script>

<Navbar />
<slot />
