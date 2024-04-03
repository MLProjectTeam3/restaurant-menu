<script>
  import { Cloudinary } from "@cloudinary/url-gen";
  import * as Card from "$lib/components/ui/card"
  

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


</script>

<div class="mt-[9vh] flex  flex-col items-center">
  <h1 class="text-4xl text-primary">MENU</h1>
  <input type="text" placeholder="Search here" class="w-[80%] h-10 shadow-lg shadow-zinc-400 rounded-full px-4 text-xl mt-6 bg-background text-primary placeholder-primary border border-b-2 border-primary border-opacity-15">
  <div class="h-16" />

  {#each menu_items as item, index}
  <Card.Root>
    <Card.Content class="w-[90vw] h-[120px] flex justify-between border pt-6 items-center mb-4">
        <img src="{imageUrls[index]}" alt="{item.itemName}" class="h-24 w-24 object-cover rounded-md">
        <div class="flex flex-col text-2xl">
          <h1>{item.itemName}</h1>
          <h2>${item.price}</h2>
        </div>
        <Button class=" bg-[#D9D9D9] px-6 h-16 rounded-md flex justify-center items-center text-2xl text-primary">Add</Button>
    </Card.Content>
  </Card.Root>
  {/each}
</div>