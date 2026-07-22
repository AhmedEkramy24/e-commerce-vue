<script setup></script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold text-slate-800">Checkout</h1>

      <p class="text-slate-500 mt-2">Choose your preferred payment method</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Visa -->
      <router-link to="/checkout/online" class="group">
        <div
          class="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:border-green-500 hover:shadow-xl transition duration-300"
        >
          <div
            class="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center"
          >
            <i class="pi pi-credit-card text-4xl text-green-600"></i>
          </div>

          <h2 class="text-2xl font-bold mt-5">Pay with Visa</h2>

          <p class="text-slate-500 mt-3">
            Secure online payment using Visa or Mastercard.
          </p>

          <button
            class="mt-6 bg-green-600 group-hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer transition"
          >
            Continue
          </button>
        </div>
      </router-link>

      <!-- Cash -->
      <router-link to="/checkout/cash" class="group">
        <div
          class="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:border-blue-500 hover:shadow-xl transition duration-300"
        >
          <div
            class="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center"
          >
            <i class="pi pi-wallet text-4xl text-blue-600"></i>
          </div>

          <h2 class="text-2xl font-bold mt-5">Cash on Delivery</h2>

          <p class="text-slate-500 mt-3">
            Pay when your order arrives at your address.
          </p>

          <button
            class="mt-6 bg-blue-600 group-hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer transition"
          >
            Continue
          </button>
        </div>
      </router-link>
    </div>
  </div>
</template>
