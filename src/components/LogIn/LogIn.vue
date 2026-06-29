<script setup>
import { ref } from "vue";

const formData = ref({
  name: "",
  email: "",
  password: "",
  rePassword: "",
  phone: "",
});

function handleSubmit(e) {
  e.preventDefault();

  console.log(data.value);
}
</script>

<template lang="">
  <form class="max-w-xl mx-auto bg-white p-5 rounded-xl shadow-md space-y-5">
    <h2 class="text-2xl font-bold text-center">Create Account</h2>

    <div>
      <label for="name" class="block mb-2 text-sm font-medium">
        Full Name
      </label>

      <input
        id="name"
        type="text"
        v-model="formData.name"
        placeholder="Enter your name "
        class="w-full px-4 py-3 border rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200"
      />
    </div>

    <div>
      <label for="email" class="block mb-2 text-sm font-medium"> Email </label>

      <input
        id="email"
        type="email"
        v-model="formData.email"
        placeholder="Enter your email"
        class="w-full px-4 py-3 border rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200"
      />
    </div>

    <div>
      <label for="password" class="block mb-2 text-sm font-medium">
        Password
      </label>
      <span></span>

      <input
        id="password"
        type="password"
        v-model="formData.password"
        placeholder="Enter your password"
        class="w-full px-4 py-3 border rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200"
      />
    </div>

    <div>
      <label for="rePassword" class="block mb-2 text-sm font-medium">
        Confirm Password
      </label>

      <input
        id="rePassword"
        type="password"
        v-model="formData.rePassword"
        placeholder="Confirm password"
        class="w-full px-4 py-3 border rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200"
      />
    </div>

    <div>
      <label for="phone" class="block mb-2 text-sm font-medium"> Phone </label>

      <input
        id="phone"
        type="tel"
        v-model="formData.phone"
        placeholder="Enter your phone"
        class="w-full px-4 py-3 border rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200"
      />
    </div>

    <button
      type="submit"
      class="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 duration-200 font-medium"
    >
      Create Account
    </button>
  </form>
</template>
