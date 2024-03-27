<script>

  import { Button } from "./ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
</script>

<div class="invisible md:visible h-[10vh] px-4 w-full bg-background border-b-2 border-primary border-opacity-15 flex items-center justify-between fixed top-0">

    <div class="flex justify-center items-center space-x-2">
        <img src="icons/coffee.svg" alt="Coffee" class="h-8 stroke-primary">
        <h1 class="text-2xl text-primary">CAFE SANMATHI</h1>
    </div>

    <div class="flex text-xl font text-primary justify-between items-center space-x-16" > <!-- Adjust width as needed -->
        <a href="/home" >Home</a>
        <a href="">AboutUs</a>
        <a href="">Contact</a>
        <a href="">Reviews</a>
    </div>

    <div class="flex justify-center items-center space-x-8">
        <a href="">
            <img src="icons/shoppingCart.svg" alt="Shopping Cart" class="h-7">
        </a>
        <Button variant="outline">LOGIN</Button>
    </div>
    
</div>

<div class="md:invisible h-[10vh] px-4 w-full bg-background border-b-2 border-primary border-opacity-15 flex items-center justify-between fixed top-0">

    <div class="flex justify-center items-center space-x-2">
        <img src="icons/coffee.svg" alt="Coffee" class="h-8">
        <h1 class="text-2xl text-primary">CAFE SANMATHI</h1>
    </div>

    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <img src="icons/menu.svg" alt="menu" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="bg-background">
        <DropdownMenu.Group>
          <DropdownMenu.Item class="text-xl"><a href="/home" >Home</a></DropdownMenu.Item><DropdownMenu.Separator />
          <DropdownMenu.Item class="text-xl"><a href="">AboutUs</a></DropdownMenu.Item><DropdownMenu.Separator />
          <DropdownMenu.Item class="text-xl"><a href="">Contact</a></DropdownMenu.Item><DropdownMenu.Separator />
          <DropdownMenu.Item class="text-xl"><a href="">Reviews</a></DropdownMenu.Item><DropdownMenu.Separator />
        </DropdownMenu.Group>
        <DropdownMenu.Group class="p-2 border-t border-primary border-opacity-25">
            <div class="flex justify-between items-center">
                <Button variant="outline">LOGIN</Button>
                <a href=""><img src="icons/shoppingCart.svg" alt="menu" /></a>
            </div>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>




    <!-- <div class="flex justify-center items-center space-x-8">
        <a href="">
            <img src="icons/shoppingCart.svg" alt="Shopping Cart" class="h-7">
        </a>
        <Button variant="outline">LOGIN</Button>
    </div> -->
    
</div>
