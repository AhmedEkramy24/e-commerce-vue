<script setup>
import axios from "axios";
import { ref } from "vue";
import { useCartStore } from "../../store/cart";
import { useAuthStore } from "../../store/auth";

const validate = ref("");

const form = ref({
  details: "",
  phone: "",
  city: "",
});

const cartStore = useCartStore();
const authStore = useAuthStore();

async function submitOrder() {
  const body = {
    shippingAddress: {
      details: form.value.details,
      phone: form.value.phone,
      city: form.value.city,
    },
  };

  if (!form.value.city && !form.value.phone && !form.value.details) {
    validate.value = "All filed is required.";
    return;
  }
  try {
    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartStore.cartId}?url=${window.origin}`,
      {
        body,
      },
      {
        headers: {
          token: authStore.token,
        },
      },
    );
    cartStore.cart = [];
    cartStore.cartCount = 0;
    location.href = data.session.url;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-10">
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <h1 class="text-3xl font-bold text-slate-800 mb-2">Checkout</h1>

      <p class="text-slate-500 mb-8">Enter your shipping information</p>

      <p class="text-red-500">
        {{ validate.value }}
      </p>

      <form @submit.prevent="submitOrder" class="space-y-5">
        <!-- Address -->
        <div>
          <label class="block mb-2 font-semibold"> Address Details </label>

          <textarea
            v-model="form.details"
            rows="4"
            placeholder="Enter your full address"
            class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
          ></textarea>
        </div>

        <!-- Phone -->
        <div>
          <label class="block mb-2 font-semibold"> Phone Number </label>

          <input
            v-model="form.phone"
            type="tel"
            placeholder="010xxxxxxxx"
            class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
          />
        </div>

        <!-- City -->
        <div>
          <label class="block mb-2 font-semibold"> City </label>

          <input
            v-model="form.city"
            type="text"
            placeholder="Cairo"
            class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Confirm Order
        </button>
      </form>
    </div>
  </div>
</template>
