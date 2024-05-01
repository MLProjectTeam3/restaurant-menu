<script>
  import { Button } from "$lib/components/ui/button";
</script>

<div class="h-screen w-full flex flex-col items-center justify-center">
  <h1 class="font-bold text-7xl">404</h1>
  <p class="text-xl pb-10">Page not found</p>
  <p class="text-xl pb-4">
    Oops, looks like you've gone astray. The page you're looking for isn't here.
  </p>
  <Button>Back Home</Button>
</div>

<style>
  .button {
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
</style>
