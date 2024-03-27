<script>

    import { Button } from "./ui/button";

</script>

<div class="h-16 px-4 w-full bg-background border-b-2 border-primary border-opacity-15 flex justify-center items-center justify-between fixed top-0">

    <div class="flex justify-center items-center space-x-2">
        <img src="icons/coffee.svg" alt="Coffee" class="h-8 stroke-primary">
        <h1 class="text-2xl text-primary">CAFE SANMATHI</h1>
    </div>

    <div class="flex text-xl font text-primary justify-between items-center space-x-16" > <!-- Adjust width as needed -->
        <a href="/home" >Home</a>
        <a href="/menu">AboutUs</a>
        <a href="#">Contact</a>
        <a href="#">Reviews</a>
    </div>

    <div class="flex justify-center items-center space-x-8">
        <a href="#">
            <img src="icons/shoppingCart.svg" alt="Shopping Cart" class="h-7">
        </a>
        <Button variant="outline">LOGIN</Button>
    </div>
    
</div>
