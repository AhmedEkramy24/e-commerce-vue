<script setup>
import axios from "axios";
import { useAuthStore } from "../../store/auth";
import { onMounted } from "vue";
import { useWishListStore } from "../../store/wishListStore";
import Loading from "../Loading/Loading.vue";
import WishListItem from "./WishListItem.vue";

const authStore = useAuthStore();
const wishListStore = useWishListStore();

onMounted(() => {
  if (authStore.token) {
    wishListStore.getWishList();
  }
});
</script>
<template>
  <Loading v-if="wishListStore.isLoading" />

  <div
    v-else-if="wishListStore.wishListCount > 0"
    class="max-w-7xl mx-auto px-4 py-8"
  >
    <!-- Header -->
    <div
      class="bg-white rounded-2xl shadow-md p-5 mb-6 flex items-center justify-between"
    >
      <div>
        <h1 class="text-3xl font-bold text-slate-800">My Wishlist</h1>

        <p class="mt-2 text-slate-600">
          Saved Products:
          <span class="font-bold text-green-600">
            {{ wishListStore.wishListCount }}
          </span>
        </p>
      </div>

      <div
        class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center"
      >
        <i class="pi pi-heart-fill text-2xl text-green-600"></i>
      </div>
    </div>

    <!-- Wishlist Items -->
    <div class="space-y-4">
      <WishListItem
        v-for="(product, index) in wishListStore.wishList"
        :key="product._id"
        :index="index"
        :imageCover="product.imageCover"
        :title="product.title"
        :category="product.category.name"
        :price="product.price"
        :ratingsAverage="product.ratingsAverage"
        :id="product._id"
      />
    </div>
  </div>

  <!-- Empty Wishlist -->
  <div
    v-else
    class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
  >
    <div
      class="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center"
    >
      <i class="pi pi-heart text-5xl text-slate-300"></i>
    </div>

    <h2 class="text-2xl font-bold mt-6 text-slate-700">
      Your wishlist is empty
    </h2>

    <p class="text-slate-500 mt-2">
      Save your favorite products to find them later.
    </p>

    <router-link
      to="/products"
      class="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition"
    >
      Browse Products
    </router-link>
  </div>
</template>
