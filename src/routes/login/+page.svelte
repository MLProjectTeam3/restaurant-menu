<script>
    import { Checkbox } from "$lib/components/ui/checkbox"
    import { Button } from "$lib/components/ui/button"
    
</script>

<div class="mt-[15vh] flex flex-col items-center justify-center">
<h1 class="text-5xl text-primary w-1/2 text-center">CAFE SANMATHI</h1>
<form action="" class="flex flex-col justify-between">
    <p class="text-2xl">Email</p>
    <input type="email" class="border-2 border-accent">
    <p class="text-2xl">Password</p>
    <input type="password" class="border-2 border-accent">
    <div class="flex justify-between">
        <div class="flex gap-2">
            <Checkbox />
            <p>Remember me</p>
        </div>
        <p>Forgot password?
        </p>
    </div>
    <Button>Login</Button>
</form>
</div>