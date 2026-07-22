<script setup>
import { ref } from "vue";
import { useWishListStore } from "../../store/wishListStore";
import axios from "axios";
import { useAuthStore } from "../../store/auth";
import { useCartStore } from "../../store/cart";

const props = defineProps({
  index: Number,
  category: String,
  title: String,
  price: Number,
  ratingsAverage: Number,
  imageCover: String,
  id: String,
  count: Number,
});

const isClicked = ref(false);
const increaseDecreaseBtnsIsClicked = ref(false);
const cartStore = useCartStore();
const authStore = useAuthStore();

async function removeFromCart(productId) {
  isClicked.value = true;
  try {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: {
          token: authStore.token,
        },
      },
    );
    cartStore.cart = data.data.products;
    cartStore.cartCount = data.numOfCartItems;
    cartStore.totalCartPrice = data.data.totalCartPrice;
  } catch (error) {
    console.log(error);
  } finally {
    isClicked.value = false;
  }
}

async function increaseProductCount(count, productId) {
  increaseDecreaseBtnsIsClicked.value = true;
  try {
    const { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: count + 1,
      },
      {
        headers: {
          token: authStore.token,
        },
      },
    );
    cartStore.cart = data.data.products;
    cartStore.cartCount = data.numOfCartItems;
    cartStore.totalCartPrice = data.data.totalCartPrice;
  } catch (error) {
    console.log(error.response);
  } finally {
    increaseDecreaseBtnsIsClicked.value = false;
  }
}

async function decreaseProductCount(count, productId) {
  increaseDecreaseBtnsIsClicked.value = true;
  if (count === 1) {
    await removeFromCart(productId);
    increaseDecreaseBtnsIsClicked.value = false;
    return;
  }
  try {
    const { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: count - 1,
      },
      {
        headers: {
          token: authStore.token,
        },
      },
    );
    cartStore.cart = data.data.products;
    cartStore.cartCount = data.numOfCartItems;
    cartStore.totalCartPrice = data.data.totalCartPrice;
  } catch (error) {
    console.log(error.response);
  } finally {
    increaseDecreaseBtnsIsClicked.value = false;
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-4 mb-4 border border-slate-200">
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      <!-- Product Info -->
      <div class="flex gap-4 relative">
        <span
          class="absolute -top-2 -left-2 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
        >
          {{ index + 1 }}
        </span>

        <img
          :src="props.imageCover"
          :alt="props.title"
          class="w-28 h-28 md:w-36 md:h-36 rounded-xl object-cover border"
        />

        <div class="flex flex-col justify-center">
          <p class="text-green-600 font-semibold">
            {{ props.category }}
          </p>

          <h3 class="font-bold text-lg text-slate-800">
            {{ props.title ? props.title.split(" ", 4).join(" ") : "" }}
          </h3>

          <p class="font-semibold text-slate-700">{{ props.price }} EGP</p>

          <div class="flex items-center gap-1">
            <span>{{ props.ratingsAverage }}</span>
            <i class="pi pi-star-fill text-yellow-400"></i>
          </div>
        </div>
      </div>

      <!-- Quantity -->
      <div class="flex flex-col items-center gap-3">
        <div class="flex items-center">
          <button
            v-if="!increaseDecreaseBtnsIsClicked"
            @click="decreaseProductCount(props.count, props.id)"
            class="w-9 h-9 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <i class="pi pi-minus"></i>
          </button>

          <button v-else class="w-9 h-9 bg-green-600 text-white rounded-lg">
            <i class="pi pi-spinner-dotted pi-spin"></i>
          </button>

          <span class="mx-4 text-xl font-semibold">
            {{ props.count }}
          </span>

          <button
            v-if="!increaseDecreaseBtnsIsClicked"
            @click="increaseProductCount(props.count, props.id)"
            class="w-9 h-9 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <i class="pi pi-plus"></i>
          </button>

          <button
            v-else
            disabled
            class="w-9 h-9 bg-green-600 text-white rounded-lg"
          >
            <i class="pi pi-spinner-dotted pi-spin"></i>
          </button>
        </div>

        <p class="font-bold text-lg">
          Total:
          <span class="text-green-600">
            {{ props.count * props.price }} EGP
          </span>
        </p>
      </div>

      <!-- Delete -->
      <div class="flex justify-end">
        <button
          v-if="!isClicked"
          @click="removeFromCart(props.id)"
          class="w-11 h-11 bg-red-500 hover:bg-red-600 text-white rounded-xl transition"
        >
          <i class="pi pi-trash"></i>
        </button>

        <button v-else class="w-11 h-11 bg-red-500 text-white rounded-xl">
          <i class="pi pi-spinner-dotted pi-spin"></i>
        </button>
      </div>
    </div>
  </div>
</template>
