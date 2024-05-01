<script>
  import * as Card from "$lib/components/ui/card";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Switch } from "$lib/components/ui/switch";
  import cld from "$lib/cloudinary/cloudinary.config";
  import orderStore from "$lib/stores/ordersStore";
  import { FlatToast, ToastContainer, toasts } from "svelte-toasts";
  import menu_items from "./menu.json";
  import { Button } from "$lib/components/ui/button";
  import { goto } from "$app/navigation";
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "$lib/firebase/firebase.config";
  import { Icon } from "svelte-icons-pack";
  import { FaSolidAngleUp } from "svelte-icons-pack/fa";

  let vegOnly = false;
  const categories = [
    ["Veg Starters", "veg"],
    ["Non Veg Starters", "non-veg"],
    ["Roti", "veg"],
    ["Veg Curry", "veg"],
    ["Non Veg Curry", "non-veg"],
    ["Fried Rice", "veg"],
    ["Rice", "veg"],
    ["Stuff Paratha", "veg"],
    ["Noodles", "veg"],
    ["SPL Chinese Rice  & Noodles (Veg)", "veg"],
    ["SPL Chinese Rice  & Noodles (Non-Veg)", "non-veg"],
    ["Veg Sandwich", "veg"],
    ["Rools", "veg"],
    ["Burgers", "veg"],
    ["Pizza", "veg"],
    ["Non-Veg Sandwich", "non-veg"],
    ["Pasta", "veg"],
    ["SPL Omlettes", "veg"],
    ["Maggi", "veg"],
    ["Juice", "veg"],
    ["Fruit Milk Shakes", "veg"],
    ["Ice Cream Milk Shake", "veg"],
    ["Special Milk Shakes", "veg"],
    ["Smoothies", "veg"],
    ["SPL Icecream", "veg"],
  ];
  let searchTerm = "";
  let matchingCategories = categories; // State variable to store matching categories

  function buildMatchingCategories() {
    matchingCategories = [];
    if (searchTerm === "") {
      matchingCategories = categories;
      return;
    }
    for (const category of categories) {
      for (const item of menu_items) {
        if (
          item.category === category[0] &&
          item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          matchingCategories.push(category);
          break;
        }
      }
    }
  }

  const imageUrls = menu_items.map((item) =>
    cld
      .image("MENU/" + item.id.toString())
      .format("auto")
      .quality("auto")
      .toURL()
  );

  let my_orders = [];
  orderStore.subscribe((orders) => {
    my_orders = orders;
  });

  let current_user;
  onAuthStateChanged(auth, (user) => {
    current_user = user;
  });

  const addOrder = (item) => {
    if (!current_user) {
      goto("/login");
      return;
    }
    try {
      //check if item exists and if so increment count, else add item with count as 1
      let existing = false;

      for (const existing_item of my_orders) {
        if (existing_item.id === item.id) {
          existing_item.count += 1;
          existing_item.displayPrice += existing_item.price;
          existing = true;
        }
      }

      if (!existing)
        my_orders.push({ ...item, count: 1, displayPrice: item.price });
      orderStore.set(my_orders);

      toasts.success("Item added succesfully!");
    } catch (error) {
      console.log(error.message);
    }
  };
</script>

<div class="max-h-[89vh] mt-[11vh] flex flex-col items-center">
  <h1 class="text-4xl text-primary">MENU</h1>
  <input
    type="text"
    placeholder="Search here"
    class="w-[80%] mb-4 shadow-lg shadow-zinc-400 rounded-full p-1 px-4 lg:w-[50%] text-xl mt-6 bg-background text-primary placeholder-primary border border-b-2 border-primary border-opacity-15"
    bind:value={searchTerm}
    on:input={buildMatchingCategories}
  />
  <div class="flex w-[80%] lg:w-[45%] py-4 justify-between items-center">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        class="text-2xl bg-primary text-primary-foreground w-1/2 py-1 rounded-full flex justify-between px-4 items-center"
        ><p class="font-thin text-lg">Categories</p>
        <img src="icons/downArrow.png" alt="v" /></DropdownMenu.Trigger
      >
      <DropdownMenu.Content>
        <DropdownMenu.Group class="py-4 max-h-[60vh] overflow-scroll">
          <DropdownMenu.Label class="text-2xl"
            >Select Category</DropdownMenu.Label
          >
          <DropdownMenu.Separator />
          {#each categories as category}
            <a href="#{category[0]}"
              ><DropdownMenu.Item class="text-2xl"
                >{category[0]}</DropdownMenu.Item
              ></a
            >
          {/each}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    <div class="flex flex-col items-center">
      <Switch
        class="border-2 border-green-700 border-opacity-20"
        bind:checked={vegOnly}
        on:click={() => {
          console.log(vegOnly);
        }}
      />
      <p class="text-green-600">VEG ONLY</p>
    </div>
  </div>
  <div
    class="mt-8 flex lg:w-[90%] flex-col items-center max-h-[70vh] overflow-scroll"
    style="scrollbar-width: none;"
  >
    <div id="start" />
    {#each matchingCategories as category}
      {#if !vegOnly || (vegOnly && category[1] === "veg")}
        <h1 class="text-4xl pb-4" id={category[0]}>{category[0]}</h1>
        <div
          class="sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 sm:w-full sm:px-10"
        >
          {#each menu_items as item, index}
            {#if item.category === category[0] && item.itemName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())}
              {#if !vegOnly || (vegOnly && item.type === "Veg")}
                <Card.Root
                  class="mb-4 border-2 border-primary border-opacity-20 shadow-md"
                >
                  <Card.Content
                    class="w-full h-[120px] flex justify-between pt-6 items-center"
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
                      class=" bg-[#D9D9D9] px-6 h-16 rounded-md flex justify-center items-center text-2xl text-primary hover:text-white"
                      on:click={() => {
                        addOrder(item);
                      }}>Add</Button
                    >
                  </Card.Content>
                </Card.Root>
              {/if}
            {/if}
          {/each}
        </div>
      {/if}
    {/each}
  </div>
  <a href="#start"
    ><Button
      class="fixed bottom-6 right-6 rounded-full w-16 h-16 text-2xl font-extrabold bg-primary"
    >
      <Icon src={FaSolidAngleUp} className="" />
    </Button></a
  >
  <ToastContainer placement="top-left" theme="dark" duration="500" let:data>
    <FlatToast {data} />
    <!-- Provider template for your toasts -->
  </ToastContainer>
</div>
