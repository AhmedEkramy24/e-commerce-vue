<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import { useAuthStore } from "../../store/auth";
import { useWishListStore } from "../../store/wishListStore";
import { useProductsStore } from "../../store/products";
import { useCartStore } from "../../store/cart";

const authStore = useAuthStore();
const isClicked = ref(false);
const wishListStore = useWishListStore();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const isFavorite = computed(() =>
  wishListStore.wishListIds.includes(route.params.id),
);
const route = useRoute();
const product = ref({});
const relatedProducts = computed(() => {
  if (!product.value?.category?._id) return [];

  return productsStore.products.filter(
    (item) =>
      item.category._id === product.value.category._id &&
      item._id !== product.value._id,
  );
});

const showAllReviews = ref(false);

const displayedReviews = computed(() => {
  if (showAllReviews.value) {
    return product.value.reviews || [];
  }

  return (product.value.reviews || []).slice(0, 1);
});

async function getSpecificProduct(id) {
  try {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );
    product.value = data.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getSpecificProduct(route.params.id);
});

async function addToWishList(productId) {
  isClicked.value = true;
  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId,
      },
      {
        headers: {
          token: authStore.token,
        },
      },
    );
    if (!wishListStore.wishListIds.includes(productId)) {
      wishListStore.wishListIds.push(productId);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isClicked.value = false;
  }
}

async function removeFromWishList(productId) {
  isClicked.value = true;
  try {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: {
          token: authStore.token,
        },
      },
    );
    const index = wishListStore.wishListIds.indexOf(productId);

    if (index !== -1) {
      wishListStore.wishListIds.splice(index, 1);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isClicked.value = false;
  }
}

async function toggleReact(productId) {
  if (isFavorite.value) {
    await removeFromWishList(productId);
  } else {
    await addToWishList(productId);
  }
}
</script>

<template>
  <div class="px-4 py-10">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6"
    >
      <!-- Images -->
      <div class="relative">
        <button
          :disabled="isClicked"
          class="absolute top-2 right-2 cursor-pointer disabled:opacity-50 z-20"
          @click="toggleReact(route.params.id)"
        >
          <i
            class="pi pi-heart-fill text-2xl"
            :class="[
              isClicked
                ? 'text-red-300'
                : isFavorite
                  ? 'text-red-500'
                  : 'text-slate-300 hover:text-red-500',
            ]"
          ></i>
        </button>
        <Swiper
          :key="product._id"
          :modules="[Autoplay]"
          :slides-per-view="1"
          :space-between="20"
          :loop="true"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }"
          class="rounded-xl overflow-hidden"
        >
          <SwiperSlide v-for="image in product.images" :key="image">
            <img
              :src="image"
              :alt="product.title"
              class="w-full h-96 object-contain"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Details -->
      <div class="flex flex-col justify-center">
        <span class="text-green-600 font-semibold uppercase tracking-wide mb-2">
          {{ product.category?.name }}
        </span>

        <h1 class="text-3xl font-bold text-slate-800 mb-4">
          {{ product.title }}
        </h1>

        <p class="text-slate-600 leading-7 mb-6">
          {{ product.description }}
        </p>

        <div class="flex items-center justify-between mb-6">
          <span class="text-3xl font-bold text-green-600">
            {{ product.price }} EGP
          </span>

          <div class="flex items-center gap-1">
            <i class="pi pi-star-fill text-yellow-400"></i>
            <span class="font-semibold">
              {{ product.ratingsAverage }}
            </span>
          </div>
        </div>

        <button
          @click="cartStore.addItemToCart(product._id)"
          class="bg-green-600 cursor-pointer hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-300"
        >
          Add To Cart
        </button>
      </div>
    </div>
    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-6">
        Customer Reviews
        <span class="text-green-600">
          ({{ product.reviews?.length || 0 }})
        </span>
      </h2>

      <div class="space-y-5">
        <div
          v-for="review in displayedReviews"
          :key="review._id"
          class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"
              >
                <i class="pi pi-user text-green-600 text-xl"></i>
              </div>

              <div>
                <h3 class="font-semibold text-slate-800">
                  {{ review.user.name }}
                </h3>

                <p class="text-sm text-slate-500">
                  {{ new Date(review.createdAt).toLocaleDateString() }}
                </p>
              </div>
            </div>

            <div class="flex flex-col items-end">
              <div class="flex gap-1 mb-1">
                <i
                  v-for="star in 5"
                  :key="star"
                  class="pi pi-star-fill text-sm"
                  :class="
                    star <= review.rating ? 'text-yellow-400' : 'text-slate-300'
                  "
                ></i>
              </div>

              <span
                class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold"
              >
                {{ review.rating }}/5
              </span>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-slate-100">
            <p class="text-slate-600 leading-7">
              {{ review.review }}
            </p>
          </div>
        </div>
        <div
          v-if="product.reviews?.length > 1"
          class="flex justify-center mt-6"
        >
          <button
            @click="showAllReviews = !showAllReviews"
            class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            {{ showAllReviews ? "Show Less" : "Show More" }}
          </button>
        </div>
      </div>
    </div>
    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-6">
        More Form {{ product.category?.name }}
      </h2>

      <Swiper
        :key="product._id"
        :modules="[Autoplay]"
        :loop="true"
        :autoplay="
          relatedProducts.length > 4
            ? {
                delay: 2500,
                disableOnInteraction: false,
              }
            : false
        "
        :slides-per-view="1"
        :space-between="20"
        :breakpoints="{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }"
      >
        <SwiperSlide v-for="item in relatedProducts" :key="item._id">
          <router-link :to="`/products/${item._id}`">
            <div
              class="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
              @click="getSpecificProduct(item._id)"
            >
              <img
                :src="item.imageCover"
                :alt="item.title"
                class="w-full h-48 object-contain"
              />

              <p class="text-green-600 text-sm mt-3">
                {{ item.category.name }}
              </p>

              <h3 class="font-semibold line-clamp-2 mt-1">
                {{ item.title }}
              </h3>

              <div class="flex justify-between items-center mt-3">
                <span class="font-bold text-lg"> {{ item.price }} EGP </span>

                <span class="flex items-center gap-1">
                  <i class="pi pi-star-fill text-yellow-400"></i>
                  {{ item.ratingsAverage }}
                </span>
              </div>
            </div>
          </router-link>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
