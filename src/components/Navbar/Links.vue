<script setup>
import { useAuthStore } from "../../store/auth.js";
import { useRouter } from "vue-router";
import WishListIcon from "./WishListIcon.vue";
import CartIcon from "./CartIcon.vue";

const links = {
  mainLinks: [
    { link: "Home", href: "" },
    { link: "Cart", href: "cart" },
    { link: "Wish List", href: "wish-list" },
    { link: "Categories", href: "categories" },
    { link: "Brands", href: "brands" },
    { link: "Products", href: "products" },
  ],
  auth: [
    { link: "Log in", href: "login" },
    { link: "Sign Up", href: "signup" },
  ],
};

const router = useRouter();
const authStore = useAuthStore();

const props = defineProps({
  isOpen: Boolean,
  handleMenuOpen: Function,
});

function handleLogOut() {
  authStore.logOut();
  router.push("/login");
}
</script>

<template>
  <!-- Desktop Navbar -->
  <div class="grow">
    <div
      class="hidden md:flex justify-between items-center bg-white rounded-xl px-5 py-3 shadow-sm font-semibold"
    >
      <ul v-if="authStore.token" class="flex items-center gap-5">
        <li v-for="(link, index) in links.mainLinks" :key="index">
          <router-link
            :to="`/${link.href}`"
            active-class="active"
            class="hover:text-green-600 transition text-nowrap"
          >
            {{ link.link }}
          </router-link>
        </li>
      </ul>

      <ul class="flex items-center gap-5 ms-auto">
        <template v-if="authStore.token">
          <li>
            <div class="flex items-center gap-4">
              <CartIcon />
              <WishListIcon />
            </div>
          </li>

          <li>
            <button
              @click="handleLogOut"
              class="bg-red-500 hover:bg-red-600 text-nowrap text-white px-4 py-2 rounded-lg transition cursor-pointer"
            >
              <i class="pi pi-sign-out mr-2"></i>
              Log out
            </button>
          </li>
        </template>

        <template v-else>
          <li v-for="(link, index) in links.auth" :key="index">
            <router-link
              :to="`/${link.href}`"
              active-class="active"
              class="hover:text-green-600 transition"
            >
              {{ link.link }}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>

  <!-- Overlay -->
  <div
    v-if="props.isOpen"
    class="fixed inset-0 bg-black/40 z-40"
    @click="props.handleMenuOpen()"
  ></div>

  <!-- Mobile Sidebar -->
  <div
    :class="[
      'md:hidden fixed top-0 z-50 h-screen w-72 bg-white shadow-2xl p-5 duration-300',
      {
        '-right-full': !props.isOpen,
        'right-0': props.isOpen,
      },
    ]"
  >
    <!-- Close Button -->
    <button
      class="absolute top-4 right-4 text-red-500 text-2xl cursor-pointer"
      @click="props.handleMenuOpen()"
    >
      <i class="pi pi-times-circle"></i>
    </button>

    <!-- Logo / Title -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-green-600">Fresh Cart</h2>
      <p class="text-slate-500 text-sm">Welcome Back 👋</p>
    </div>

    <!-- Authenticated Links -->
    <template v-if="authStore.token">
      <ul class="space-y-2">
        <li v-for="(link, index) in links.mainLinks" :key="index">
          <router-link
            :to="`/${link.href}`"
            active-class="active"
            @click="props.handleMenuOpen()"
            class="block py-3 px-4 rounded-xl hover:bg-green-50 hover:text-green-600 transition"
          >
            {{ link.link }}
          </router-link>
        </li>
      </ul>

      <div class="border-t mt-6 pt-6">
        <div class="flex items-center gap-5 mb-5">
          <CartIcon />
          <WishListIcon />
        </div>

        <button
          @click="handleLogOut"
          class="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
        >
          <i class="pi pi-sign-out mr-2"></i>
          Log out
        </button>
      </div>
    </template>

    <!-- Guest Links -->
    <template v-else>
      <ul class="space-y-2">
        <li v-for="(link, index) in links.auth" :key="index">
          <router-link
            :to="`/${link.href}`"
            active-class="active"
            @click="props.handleMenuOpen()"
            class="block py-3 px-4 rounded-xl hover:bg-green-50 hover:text-green-600 transition"
          >
            {{ link.link }}
          </router-link>
        </li>
      </ul>
    </template>
  </div>
</template>
