<script setup>
import Logo from "./Logo.vue";
import Links from "./Links.vue";
import MenuBtn from "./MenuBtn.vue";
import { ref } from "vue";
import CartIcon from "./CartIcon.vue";
import WishListIcon from "./WishListIcon.vue";
import { useAuthStore } from "../../store/auth.js";
const isOpen = ref(false);
const authStore = useAuthStore();
const handleMenuOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <nav class="bg-slate-200 p-3 fixed w-full z-30">
    <div class="container mx-auto flex items-center justify-between">
      <Logo />
      <Links :isOpen="isOpen" :handleMenuOpen="handleMenuOpen" />
      <div class="flex space-x-4">
        <div
          v-if="authStore.token"
          class="md:hidden items-center space-x-2 flex"
        >
          <CartIcon />
          <WishListIcon />
        </div>
        <MenuBtn :handleMenuOpen="handleMenuOpen" />
      </div>
    </div>
  </nav>
</template>
