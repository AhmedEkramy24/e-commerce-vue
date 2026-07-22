<script setup>
import { useBrandssStore } from "../../store/brands";
import Swal from "sweetalert2";

const brandsStore = useBrandssStore();

function showBrand(brand) {
  Swal.fire({
    title: brand.name,
    imageUrl: brand.image,
    imageWidth: 300,
    imageAlt: brand.name,
    showCloseButton: true,
    confirmButtonColor: "#22c55e",
  });
}
</script>

<template>
  <div class="flex flex-wrap">
    <div
      class="p-3 lg:w-1/4 md:w-1/3 w-1/2"
      v-for="brand in brandsStore.brands"
    >
      <div
        class="border border-slate-300 hover:border-green-500 cursor-pointer"
        @click="showBrand(brand)"
      >
        <img :src="brand.image" :alt="brand.name" />
      </div>
    </div>
  </div>
</template>
