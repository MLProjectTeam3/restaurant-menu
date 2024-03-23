<script>
    import logoImage from "../../assets/icons/logo.png"
    import cartImage from "../../assets/icons/cart.png"
</script>
<div class="h-12 p-2 w-full bg-background border-b-2 border-primary border-opacity-50 flex flex-wrap items-start">
    <!--<p class="text-red-600 font-bold">This is the navbar. Edit your code here.</p>-->
    <div class="basis-2/12 flex flex-wrap gap-3 ">
        <img class="logo-icon" src={logoImage} alt="Logo"/>
        <p class="align-middle items-baseline">CAFE SANMATHI</p>
    </div>
    <div class="basis-9/12 justify-center align-middle content-center" >
        <div class="flex gap-32 items-center">
            <p></p>
            <p>Home</p>
            <p>About Us</p>
            <p>Contact</p>
            <p>Reviews</p>
        </div>
    </div>
    <div class="basis-1/12 justify-end flex flex-wrap gap-4" >
        <img class="logo-icon" src={cartImage} alt="Cart"/>
        <p>MENU</p>
    </div>
</div>

<style>
    .logo-icon{
        height: 38px;
        width: 38px;
    }
</style>