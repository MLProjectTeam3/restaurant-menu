<script>
  import Navbar from "$lib/components/navbar.svelte";
  import { error } from "@sveltejs/kit";
  import "../lib/app.css";
</script>

<Navbar />
<slot />
