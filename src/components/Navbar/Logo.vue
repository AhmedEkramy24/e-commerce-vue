<script setup>
import logo from "../../assets/images/logo.svg";
</script>

<template>
  <router-link
    to="/"
    class="flex items-center gap-2 hover:opacity-80 transition"
  >
    <img :src="logo" alt="Fresh Cart Logo" class="h-10 md:h-12 w-auto" />
  </router-link>
</template>
