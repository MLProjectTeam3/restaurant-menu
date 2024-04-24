<script>
  import { Cloudinary } from "@cloudinary/url-gen";
  import * as Card from "$lib/components/ui/card";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dxgkiabgb",
      apiKey: "599262657695471",
    },
  });

  import menu_items from "./menu.json";
  import { Button } from "$lib/components/ui/button";

  const imageUrls = menu_items.map((item) =>
    cld
      .image("MENU/" + item.id.toString()) // Replace with your image's public ID
      .format("auto")
      .quality("auto")
      .toURL()
  );

  const categories = [
    "Veg Starters",
    "Non Veg Starters",
    "Roti",
    "Veg Curry",
    "Non Veg Curry",
    "Fried Rice",
    "Rice",
    "Stuff Paratha",
    "Noodles",
    "SPL Chinese Rice  & Noodles (Veg)",
    "SPL Chinese Rice  & Noodles (Non-Veg)",
    "Veg Sandwich",
    "Rools",
    "Burgers",
    "Pizza",
    "Non-Veg Sandwich",
    "Pasta",
    "SPL Omlettes",
    "Maggi",
    "Juice",
    "Fruit Milk Shakes",
    "Ice Cream Milk Shake",
    "Special Milk Shakes",
    "Smoothies",
    "SPL Icecream",
  ];
</script>

<div class="mt-[9vh] flex flex-col items-center">
  <h1 class="text-4xl text-primary">MENU</h1>
  <input
    type="text"
    placeholder="Search here"
    class="w-[80%] h-10 shadow-lg shadow-zinc-400 rounded-full px-4 text-xl mt-6 bg-background text-primary placeholder-primary border border-b-2 border-primary border-opacity-15"
  />
  <DropdownMenu.Root>
    <DropdownMenu.Trigger
      class="text-2xl bg-primary text-primary-foreground w-1/2 mt-4 py-1 rounded-full flex justify-between px-4 items-center"
      ><p class="font-thin">Categories</p>
      <img src="icons/downArrow.png" alt="v" /></DropdownMenu.Trigger
    >
    <DropdownMenu.Content>
      <DropdownMenu.Group class="py-4 max-h-[60vh] overflow-scroll">
        <DropdownMenu.Label class="text-2xl">Select Category</DropdownMenu.Label
        >
        <DropdownMenu.Separator />
        {#each categories as category}
          <a href="#{category}"
            ><DropdownMenu.Item class="text-2xl">{category}</DropdownMenu.Item
            ></a
          >
        {/each}
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
  <div class="mt-8 flex flex-col items-center max-h-[70vh] overflow-scroll">
    {#each categories as category}
      <h1 class="text-4xl pb-4" id={category}>{category}</h1>

      {#each menu_items as item, index}
        {#if item.category === category}
          <Card.Root class="mb-4">
            <Card.Content
              class="w-[90vw] h-[120px] flex justify-between border pt-6 items-center"
            >
              <img
                src={imageUrls[index]}
                alt={item.itemName}
                class="h-24 w-24 object-cover rounded-md"
              />
              <div class="flex flex-col text-2xl">
                <h1>{item.itemName}</h1>
                <h2>&#8377;{item.price}</h2>
              </div>
              <Button
                class=" bg-[#D9D9D9] px-6 h-16 rounded-md flex justify-center items-center text-2xl text-primary"
                >Add</Button
              >
            </Card.Content>
          </Card.Root>
        {/if}
      {/each}
    {/each}
  </div>
  <a href="#Veg%20Starters"><Button class="fixed bottom-6 right-6 rounded-full w-16 h-16 text-2xl font-extrabold bg-primary">&and;</Button></a>

</div>
