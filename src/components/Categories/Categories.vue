<script setup>
import Swal from "sweetalert2";
import { usecategoriesStore } from "../../store/categories";

const categoriesStore = usecategoriesStore();

function showCategory(category) {
  Swal.fire({
    title: category.name,
    imageUrl: category.image,
    imageWidth: 300,
    imageAlt: category.name,
    showCloseButton: true,
    confirmButtonColor: "#22c55e",
  });
}
</script>

<template>
  <div class="flex flex-wrap">
    <div
      class="p-3 lg:w-1/4 md:w-1/3 w-1/2"
      v-for="category in categoriesStore.categories"
    >
      <div
        class="border border-slate-300 hover:border-green-500 cursor-pointer"
        @click="showCategory(category)"
      >
        <img
          :src="category.image"
          :alt="category.name"
          class="h-75 object-cover w-full"
        />
      </div>
    </div>
  </div>
</template>
