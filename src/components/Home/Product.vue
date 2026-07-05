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
      class="pt-6 overflow-hidden relative group md:pb-10 border border-slate-300 rounded-lg hover:border-green-500 cursor-pointer"
    >
      <span class="absolute top-2 right-2 cursor-pointer">
        <i
          class="pi pi-heart-fill text-slate-300 hover:text-red-500 text-2xl"
        ></i>
      </span>
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
        <button
          class="mt-4 cursor-pointer md:-bottom-full md:group-hover:bottom-2 duration-300 md:absolute bg-green-500 font-bold md:w-[90%] w-full text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
