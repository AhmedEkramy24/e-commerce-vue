<script setup>
const props = defineProps({
  img: String,
  title: String,
  category: String,
  price: Number,
  rate: Number,
});
</script>

<template>
  <div class="product xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2 p-3">
    <div
      class="pt-5 pb-10 border border-slate-300 rounded-lg hover:border-green-500 cursor-pointer"
    >
      <div class="py-3">
        <img :src="img" :alt="title" class="w-full object-cover block" />
      </div>
      <div class="p-3">
        <p class="text-green-600 font-bold">{{ category }}</p>
        <h3>{{ title.split(" ", 3).join(" ") }}</h3>
        <div class="flex justify-between">
          <span>{{ price }}EGP</span>
          <span>
            {{ rate }}
            <i class="pi pi-star-fill text-yellow-400"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
