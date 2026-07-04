<script setup>
import { storeToRefs } from "pinia";
import { useProductsStore } from "../../store/products";
import Product from "./Product.vue";

const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);
</script>
<template>
  <div class="flex flex-wrap">
    <Product
      v-for="product in products"
      :img="product?.images[0]"
      :title="product.title"
      :category="product.category.name"
      :price="product.price"
      :rate="product.ratingsAverage"
    />
  </div>
</template>
