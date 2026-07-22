<script setup>
import { useWishListStore } from "../../store/wishListStore";

const wishListStore = useWishListStore();
</script>

<template>
  <router-link
    to="/wish-list"
    class="relative flex items-center justify-center"
  >
    <i
      class="pi pi-heart-fill text-red-500 text-2xl hover:scale-110 transition"
    ></i>

    <span
      v-if="wishListStore.wishListIds.length > 0"
      class="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
    >
      {{ wishListStore.wishListIds.length }}
    </span>
  </router-link>
</template>
