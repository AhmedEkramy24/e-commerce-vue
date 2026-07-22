<script setup>
const props = defineProps({
  handleMenuOpen: Function,
});
</script>

<template>
  <button
    @click="props.handleMenuOpen()"
    class="md:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-green-50 hover:border-green-500 hover:text-green-600 transition duration-300 cursor-pointer"
    aria-label="Open Menu"
  >
    <i class="pi pi-bars text-xl"></i>
  </button>
</template>
