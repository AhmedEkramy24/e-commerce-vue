<script setup>
import Product from "./Product.vue";

const props = defineProps({
  products: Array,
});
</script>

<template>
  <h2 class="my-5 font-bold text-xl">
    <i class="pi pi-arrow-circle-right text-green-600"></i> Our products
  </h2>
  <div v-if="products.length > 0" class="flex flex-wrap">
    <Product
      v-for="product in products"
      :img="product?.images[0]"
      :title="product.title"
      :category="product.category.name"
      :price="product.price"
      :rate="product.ratingsAverage"
      :productId="product._id"
    />
  </div>
</template>
