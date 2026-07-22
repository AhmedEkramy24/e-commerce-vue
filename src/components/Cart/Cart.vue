<script setup>
import axios from "axios";
import { useAuthStore } from "../../store/auth";
import { onMounted } from "vue";
import Loading from "../Loading/Loading.vue";
import { useCartStore } from "../../store/cart.js";
import CartItem from "./CartItem.vue";
import Swal from "sweetalert2";

const authStore = useAuthStore();
const cartStore = useCartStore();

async function clearCart() {
  try {
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: authStore.token,
        },
      },
    );
    cartStore.cart = [];
    cartStore.cartCount = 0;
    cartStore.totalCartPrice = 0;
  } catch (error) {
    console.log(error);
  }
}

async function confirmDelete() {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    await clearCart();

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Your cart is clear now.",
    });
  }
}

onMounted(() => {
  if (authStore.token) {
    cartStore.getCart();
  }
});
</script>
<template>
  <Loading v-if="cartStore.isLoading" />

  <div
    v-else-if="cartStore.cart.length > 0"
    class="max-w-7xl mx-auto px-4 py-8"
  >
    <!-- Header -->
    <div
      class="bg-white rounded-2xl shadow-md p-5 mb-6 flex flex-col md:flex-row justify-between items-center gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-slate-800">Shopping Cart</h1>

        <div class="mt-2 space-y-1">
          <p>
            <span class="font-semibold">Total Items:</span>
            <span class="text-green-600 font-bold ml-2">
              {{ cartStore.cartCount }}
            </span>
          </p>

          <p>
            <span class="font-semibold">Total Price:</span>
            <span class="text-green-600 font-bold ml-2">
              {{ cartStore.totalCartPrice }} EGP
            </span>
          </p>
        </div>
      </div>

      <div class="flex gap-3">
        <router-link to="/checkout">
          <button
            class="px-5 py-3 bg-blue-700 cursor-pointer hover:bg-blue-800 text-white rounded-xl font-semibold transition"
          >
            <i class="pi pi-credit-card mr-2"></i>
            Checkout
          </button>
        </router-link>

        <button
          @click="confirmDelete"
          class="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
        >
          <i class="pi pi-trash mr-2"></i>
          Clear Cart
        </button>
      </div>
    </div>

    <!-- Cart Items -->
    <div class="space-y-4">
      <CartItem
        v-for="(product, index) in cartStore.cart"
        :key="product.product._id"
        :index="index"
        :imageCover="product.product?.imageCover"
        :title="product.product?.title"
        :category="product.product.category?.name"
        :price="product.price"
        :ratingsAverage="product.product.ratingsAverage"
        :id="product.product._id"
        :count="product.count"
      />
    </div>
  </div>

  <!-- Empty Cart -->
  <div
    v-else
    class="min-h-[60vh] flex flex-col items-center justify-center text-center"
  >
    <i class="pi pi-shopping-cart text-7xl text-slate-300"></i>

    <h2 class="text-2xl font-bold mt-4 text-slate-700">Your cart is empty</h2>

    <p class="text-slate-500 mt-2">Add some products and come back.</p>

    <router-link
      to="/products"
      class="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition"
    >
      Browse Products
    </router-link>
  </div>
</template>
