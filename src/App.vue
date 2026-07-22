<script setup>
import { onMounted } from "vue";
import Navbar from "./components/Navbar/Navbar.vue";
import { useProductsStore } from "./store/products.js";
import { useBrandssStore } from "./store/brands.js";
import { usecategoriesStore } from "./store/categories.js";
import { useAuthStore } from "./store/auth.js";
import { useWishListStore } from "./store/wishListStore.js";
import { useCartStore } from "./store/cart.js";
import { useOrdersStore } from "./store/orders.js";

const productsStore = useProductsStore();
const brandsStore = useBrandssStore();
const categoriesStore = usecategoriesStore();
const wishListStore = useWishListStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const ordersStore = useOrdersStore();

onMounted(() => {
  productsStore.getProducts();
  brandsStore.getBrands();
  categoriesStore.getCategories();
  if (authStore.token) {
    wishListStore.getWishList();
    cartStore.getCart();
    ordersStore.getOrders();
  }
});
</script>

<template>
  <Navbar />
  <div class="container mx-auto pt-14">
    <router-view />
  </div>
</template>
