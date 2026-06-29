<script setup>
import Logo from "./Logo.vue";
import Links from "./Links.vue";
import MenuBtn from "./MenuBtn.vue";
import { ref } from "vue";
const isOpen = ref(false);
const handleMenuOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <nav class="bg-slate-100 p-3">
    <div class="container mx-auto flex items-center justify-between">
      <Logo />
      <Links :isOpen="isOpen" :handleMenuOpen="handleMenuOpen" />
      <MenuBtn :handleMenuOpen="handleMenuOpen" />
    </div>
  </nav>
</template>
