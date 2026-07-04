<script setup>
import { onMounted } from "vue";
import Navbar from "./components/Navbar/Navbar.vue";
import { useProductsStore } from "./store/products.js";

const productsStore = useProductsStore();

onMounted(() => {
  productsStore.getProducts();
});
</script>

<template>
  <Navbar />
  <div class="container mx-auto">
    <router-view />
  </div>
</template>
