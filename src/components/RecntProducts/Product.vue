<script setup>
import axios from "axios";
import { useAuthStore } from "../../store/auth";
import { computed, ref } from "vue";
import { useWishListStore } from "../../store/wishListStore";
import { useCartStore } from "../../store/cart";

const props = defineProps({
  img: String,
  title: String,
  category: String,
  price: Number,
  rate: Number,
  productId: String,
});

const authStore = useAuthStore();
const isClicked = ref(false);
const wishListStore = useWishListStore();
const cartStore = useCartStore();
const isFavorite = computed(() =>
  wishListStore.wishListIds.includes(props.productId),
);

async function addToWishList(productId) {
  isClicked.value = true;
  try {
    await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId,
      },
      {
        headers: {
          token: authStore.token,
        },
      },
    );
    if (!wishListStore.wishListIds.includes(props.productId)) {
      wishListStore.wishListIds.push(props.productId);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isClicked.value = false;
  }
}

async function removeFromWishList(productId) {
  isClicked.value = true;
  try {
    await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: {
          token: authStore.token,
        },
      },
    );
    const index = wishListStore.wishListIds.indexOf(productId);

    if (index !== -1) {
      wishListStore.wishListIds.splice(index, 1);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isClicked.value = false;
  }
}

async function toggleReact(productId) {
  if (isFavorite.value) {
    await removeFromWishList(productId);
  } else {
    await addToWishList(productId);
  }
}
</script>

<template>
  <div class="product xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2 p-3">
    <div
      class="bg-white rounded-xl border border-slate-200 hover:border-green-500 hover:shadow-lg transition-all duration-300 overflow-hidden relative group h-full flex flex-col"
    >
      <!-- Wishlist Button -->
      <button
        :disabled="isClicked"
        class="absolute top-3 right-3 z-10 cursor-pointer disabled:opacity-50"
        @click="toggleReact(props.productId)"
      >
        <i
          class="pi pi-heart-fill text-2xl"
          :class="[
            isClicked
              ? 'text-red-300'
              : isFavorite
                ? 'text-red-500'
                : 'text-slate-300 hover:text-red-500',
          ]"
        ></i>
      </button>

      <!-- Product Link -->
      <router-link
        :to="`/products/${props.productId}`"
        class="flex-1 flex flex-col"
      >
        <!-- Image -->
        <div class="p-4">
          <img :src="img" :alt="title" class="w-full h-52 object-contain" />
        </div>

        <!-- Details -->
        <div class="px-4 pb-4 flex-1 flex flex-col">
          <p class="text-green-600 text-sm font-semibold">
            {{ props.category }}
          </p>

          <h3 class="font-semibold text-slate-800 mt-2 line-clamp-2 min-h-12">
            {{ props.title }}
          </h3>

          <div class="flex justify-between items-center mt-auto pt-3">
            <span class="font-bold text-lg text-green-600">
              {{ props.price }} EGP
            </span>

            <span class="flex items-center gap-1 text-sm">
              {{ props.rate }}
              <i class="pi pi-star-fill text-yellow-400"></i>
            </span>
          </div>
        </div>
      </router-link>

      <!-- Add To Cart -->
      <div class="p-4 pt-0">
        <button
          @click="cartStore.addItemToCart(props.productId)"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold transition duration-300 cursor-pointer"
        >
          <i class="pi pi-shopping-cart mr-2"></i>
          Add To Cart
        </button>
      </div>
    </div>
  </div>
</template>
