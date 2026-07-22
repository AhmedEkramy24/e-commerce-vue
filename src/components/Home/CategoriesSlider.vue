<script setup>
import { Autoplay } from "swiper/modules";
import { usecategoriesStore } from "../../store/categories";
import { Swiper, SwiperSlide } from "swiper/vue";

const categoryStore = usecategoriesStore();
</script>

<template>
  <div class="my-8">
    <h2 class="mb-5 text-2xl font-bold text-slate-800">
      <i class="pi pi-arrow-circle-right text-green-600 mr-2"></i>
      Categories
    </h2>

    <Swiper
      :modules="[Autoplay]"
      :space-between="20"
      :loop="categoryStore.categories.length > 6"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :breakpoints="{
        320: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
        1280: {
          slidesPerView: 6,
        },
      }"
    >
      <SwiperSlide
        v-for="category in categoryStore.categories"
        :key="category._id"
      >
        <div
          class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer group"
        >
          <div class="overflow-hidden">
            <img
              :src="category.image"
              :alt="category.name"
              class="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
            />
          </div>

          <div class="p-3">
            <p
              class="text-center font-semibold text-slate-700 group-hover:text-green-600 transition"
            >
              {{ category.name }}
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
