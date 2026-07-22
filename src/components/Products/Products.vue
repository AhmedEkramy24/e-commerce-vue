<script setup>
import { storeToRefs } from "pinia";
import { useProductsStore } from "../../store/products";
import RecntProducts from "../RecntProducts/RecntProducts.vue";
import { ref, computed } from "vue";

const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);

const search = ref("");

const filteredProducts = computed(() => {
  const query = search.value.toLowerCase().trim();

  return products.value.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.category.name.toLowerCase().includes(query),
  );
});
</script>

<template>
  <div class="container mx-auto px-4 py-5">
    <!-- Search -->
    <div class="flex justify-center mb-4">
      <div class="relative w-full md:w-1/2">
        <i
          class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        ></i>

        <input
          v-model="search"
          type="text"
          placeholder="Search products..."
          class="w-full pl-10 p-3 border border-slate-300 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200"
        />
      </div>
    </div>

    <!-- Results Count -->
    <div class="text-center text-slate-600 mb-6">
      Found
      <span class="font-bold text-green-600">
        {{ filteredProducts.length }}
      </span>
      products
    </div>

    <!-- Products -->
    <RecntProducts
      v-if="filteredProducts.length"
      :products="filteredProducts"
    />

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-16">
      <i class="pi pi-search text-6xl text-slate-300"></i>

      <h2 class="text-2xl font-bold text-slate-700 mt-4">No products found</h2>

      <p class="text-slate-500 mt-2">Try searching with a different keyword.</p>
    </div>
  </div>
</template>
