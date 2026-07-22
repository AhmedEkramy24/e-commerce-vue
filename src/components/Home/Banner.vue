<script setup>
import { Autoplay, Pagination } from "swiper/modules";
import Banner_1 from "/banner-1.png";
import Banner_2 from "/banner-2.jpg";
import Banner_3 from "/banner-3.jpg";

import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/pagination";
</script>

<template>
  <div class="my-6">
    <Swiper
      :modules="[Autoplay, Pagination]"
      :slides-per-view="1"
      :loop="true"
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      class="rounded-2xl overflow-hidden shadow-lg"
    >
      <SwiperSlide>
        <img
          :src="Banner_3"
          alt="banner-3"
          class="w-full h-55 md:h-87.5 lg:h-112.5 object-cover"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          :src="Banner_1"
          alt="banner-1"
          class="w-full h-55 md:h-87.5 lg:h-112.5 object-cover"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          :src="Banner_2"
          alt="banner-2"
          class="w-full h-55 md:h-87.5 lg:h-112.5 object-cover"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
