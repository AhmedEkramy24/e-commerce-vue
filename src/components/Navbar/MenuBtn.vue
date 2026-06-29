<script setup>
const props = defineProps({
  handleMenuOpen: Function,
});
</script>

<template>
  <button
    @click="props.handleMenuOpen()"
    class="hover:text-green-500 duration-300 text-2xl cursor-pointer block md:hidden"
  >
    <i class="pi pi-align-justify"></i>
  </button>
</template>
