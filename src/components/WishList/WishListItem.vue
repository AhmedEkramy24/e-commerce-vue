<script setup>
import { ref } from "vue";
import { useWishListStore } from "../../store/wishListStore";
import axios from "axios";
import { useAuthStore } from "../../store/auth";

const props = defineProps({
  index: Number,
  category: String,
  title: String,
  price: Number,
  ratingsAverage: Number,
  imageCover: String,
  id: String,
});

const isClicked = ref(false);
const wishListStore = useWishListStore();
const authStore = useAuthStore();

async function removeFromWishList(productId) {
  isClicked.value = true;
  try {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: {
          token: authStore.token,
        },
      },
    );

    await wishListStore.getWishList();

    if (index !== -1) {
      wishListStore.wishList.splice(index, 1);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isClicked.value = false;
  }
}
</script>

<template>
  <div
    class="bg-white rounded-2xl shadow-md p-4 border border-slate-200 hover:shadow-lg transition duration-300"
  >
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <!-- Product Info -->
      <div class="flex gap-4 relative w-full">
        <span
          class="absolute -top-2 -left-2 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
        >
          {{ index + 1 }}
        </span>

        <img
          :src="props.imageCover"
          :alt="props.title"
          class="w-28 h-28 md:w-36 md:h-36 rounded-xl object-cover border border-slate-200"
        />

        <div class="flex flex-col justify-center">
          <p class="text-green-600 font-semibold">
            {{ props.category }}
          </p>

          <h3 class="font-bold text-lg text-slate-800">
            {{ props.title.split(" ", 4).join(" ") }}
          </h3>

          <p class="font-semibold text-slate-700 mt-1">{{ props.price }} EGP</p>

          <div class="flex items-center gap-1 mt-1">
            <span class="font-medium">
              {{ props.ratingsAverage }}
            </span>

            <i class="pi pi-star-fill text-yellow-400"></i>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <router-link
          :to="`/products/${props.id}`"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          View
        </router-link>

        <button
          v-if="!isClicked"
          @click="removeFromWishList(props.id)"
          class="w-11 h-11 bg-red-500 hover:bg-red-600 text-white rounded-xl transition cursor-pointer"
          title="Remove from wishlist"
        >
          <i class="pi pi-trash"></i>
        </button>

        <button
          v-else
          class="w-11 h-11 bg-red-500 text-white rounded-xl"
          disabled
        >
          <i class="pi pi-spinner-dotted pi-spin"></i>
        </button>
      </div>
    </div>
  </div>
</template>
