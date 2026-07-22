<script setup>
import { storeToRefs } from "pinia";
import { useProductsStore } from "../../store/products";
import RecntProducts from "../RecntProducts/RecntProducts.vue";
import CategoriesSlider from "./CategoriesSlider.vue";
import Banner from "./Banner.vue";

const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);
</script>
<template>
  <Banner />
  <CategoriesSlider />
  <RecntProducts :products="products" />
</template>
