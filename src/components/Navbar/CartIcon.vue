<script setup>
import { useCartStore } from "../../store/cart";

const cartStore = useCartStore();
</script>

<template>
  <router-link to="/cart">
    <router-link to="/cart" class="relative flex items-center justify-center">
      <i
        class="pi pi-shopping-cart text-green-600 text-2xl hover:scale-110 transition"
      ></i>

      <span
        v-if="cartStore.cartCount > 0"
        class="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
      >
        {{ cartStore.cartCount }}
      </span>
    </router-link>
  </router-link>
</template>
