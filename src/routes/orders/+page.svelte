<script>
  // @ts-nocheck

  import orderStore from "$lib/stores/ordersStore";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { goto } from "$app/navigation";
  import * as Dialog from "$lib/components/ui/dialog";
  import { FlatToast, ToastContainer, toasts } from "svelte-toasts";

  let my_orders = [];
  let totalPrice = 0;
  orderStore.subscribe((orders) => {
    my_orders = orders;
    totalPrice = 0;
    for (const item of my_orders) {
      totalPrice += item.displayPrice;
    }
  });

  const handleDecrement = (index) => {
    if (my_orders[index].count - 1 === 0) {
      my_orders.splice(index, 1);
    } else {
      my_orders[index].count -= 1;
      my_orders[index].displayPrice -= my_orders[index].price;
    }
    orderStore.set(my_orders);
  };

  const handleIncrement = (index) => {
    my_orders[index].count += 1;
    my_orders[index].displayPrice += my_orders[index].price;
    s;
    orderStore.set(my_orders);
  };

  const handleOrderPlaced = () => {
    goto("/menu");
    orderStore.set([]);

    toasts.success("Order Placed Successfully!");
  };
</script>

<div
  class="mt-[7.2dvh] md:mt-[9.5dvh] h-[92.8dvh] md:h-[90.5dvh] bg-[#FFECD1] flex flex-col justify-between pt-12"
>
  <h1 class="text-3xl w-full text-center">My Orders</h1>
  <div class="lg:flex lg:flex-col lg:items-center">
    <!-- List of Orders -->
    <div
      class="h-[68dvh] lg:h-[65dvh] lg:w-[60%] mx-4 overflow-scroll"
      style="scrollbar-width: none;"
    >
      {#if my_orders.length === 0}
        <div class="h-full w-full flex items-center justify-center">
          <div
            class="p-4 px-8 flex flex-col items-center justify-center gap-2 bg-transparent border-[3.5px] border-primary rounded-sm border-opacity-20"
          >
            <h2 class="text-2xl text-primary opacity-30">
              There's Nothing Here
            </h2>
            <Button
              class="opacity-50 text-xl"
              on:click={() => {
                goto("/menu");
              }}>Open Menu</Button
            >
          </div>
        </div>
      {/if}
      {#each my_orders as item, index}
        <Card.Root
          class="mb-4 h-24 w-full justify-between px-4 flex items-center"
        >
          <div class="flex gap-4 lg:gap-6 items-center">
            <img
              src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload/f_auto/q_auto/v1/MENU/${item.id}?_a=DATAdtAAZAA0`}
              alt={item.itemName}
              class="h-20 w-20 object-cover rounded-md"
            />
            <h1 class="text-xl lg:text-2xl">{item.itemName}</h1>
          </div>
          <div class="flex flex-col text-3xl justify-evenly items-center">
            <h2>&#8377;{item.displayPrice}</h2>
            <div
              class="flex items-center justify-center border border-primary rounded-md bg-[#FFECD1]"
            >
              <button
                class="border border-r-primary px-2"
                on:click={() => {
                  handleDecrement(index);
                }}>-</button
              >
              <h2 class="px-2">{item.count}</h2>
              <button
                class="border border-l-primary h-full px-2"
                on:click={() => {
                  handleIncrement(index);
                }}>+</button
              >
            </div>
          </div></Card.Root
        >
      {/each}
    </div>
    <!-- Bottom Total price and place order button -->
    <div
      class="bg-background border-2 border-accent border-opacity-30 lg:w-full lg:px-96 h-[12dvh] flex items-center justify-between px-10"
    >
      <h1 class="text-3xl">TOTAL - &#8377;{totalPrice}</h1>

      {#if my_orders.length === 0}
        <div
          class="text-3xl border-4 border-black opacity-15 py-2 px-4 rounded-md"
        >
          Order Now
        </div>
      {:else}
        <Dialog.Root>
          <Dialog.Trigger
            ><Button
              variant="outline"
              class="text-3xl border-4 border-accent text-accent py-6"
              on:click={() => {
                setTimeout(handleOrderPlaced, 2000);
              }}>Order Now</Button
            ></Dialog.Trigger
          >
          <Dialog.Content
            class="py-16 w-2/3 border-2 border-accent rounded-md border-opacity-75 text-center  "
          >
            <h1 class="text-primary text-xl">
              Redirecting to Payment Gateway...
            </h1>
          </Dialog.Content>
        </Dialog.Root>
      {/if}
    </div>
  </div>
  <ToastContainer
    placement="bottom-center"
    theme="dark"
    duration="2000"
    let:data
  >
    <FlatToast {data} />
    <!-- Provider template for your toasts -->
  </ToastContainer>
</div>
