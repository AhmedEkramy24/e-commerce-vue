<script setup>
import { ref } from "vue";
import MenuBtn from "./MenuBtn.vue";

const links = {
  mainLinks: [
    {
      link: "Home",
      href: "",
    },
    {
      link: "Cart",
      href: "cart",
    },
    {
      link: "Wish List",
      href: "wish-list",
    },
    {
      link: "Categories",
      href: "categories",
    },
    {
      link: "Brands",
      href: "brands",
    },
    {
      link: "Products",
      href: "products",
    },
  ],
  auth: [
    {
      link: "Log in",
      href: "login",
    },
    {
      link: "signUp",
      href: "signup",
    },
  ],
};

const props = defineProps({
  isOpen: Boolean,
  handleMenuOpen: Function,
});
</script>

<template>
  <!-- desktop links -->
  <div class="grow">
    <div class="md:flex justify-between hidden text-[14px] font-semibold">
      <ul class="flex space-x-4 ms-3">
        <li
          v-for="(link, index) in links.mainLinks"
          :key="index"
          class="hover:text-green-500"
        >
          <router-link :to="`/${link.href}`" active-class="active">
            {{ link.link }}
          </router-link>
        </li>
      </ul>
      <ul class="flex space-x-4 ms-3">
        <li
          v-for="(link, index) in links.auth"
          :key="index"
          class="hover:text-green-500"
        >
          <router-link :to="`/${link.href}`" active-class="active">
            {{ link.link }}
          </router-link>
        </li>
        <li class="text-red-500 hover:text-red-600 cursor-pointer">
          <span> Log out <i class="pi pi-sign-out translate-0.5"></i> </span>
        </li>
      </ul>
    </div>
  </div>

  <!-- mobile links -->
  <div
    v-if="props.isOpen"
    class="fixed inset-0"
    @click="props.handleMenuOpen()"
  ></div>
  <div
    :class="[
      'md:hidden z-50 duration-500 text-[14px] font-semibold pt-10 absolute top-0 h-screen bg-slate-100 w-50 p-4',
      {
        '-right-full': !props.isOpen,
        'right-0': props.isOpen,
      },
    ]"
  >
    <button
      class="absolute top-2 right-4 cursor-pointer text-red-500 text-2xl"
      @click="props.handleMenuOpen()"
    >
      <i class="pi pi-times-circle mt-1 mx-px"></i>
    </button>
    <ul class="space-y-4">
      <li
        v-for="(link, index) in links.mainLinks"
        :key="index"
        class="hover:text-green-500 hover:translate-x-1 duration-300"
      >
        <router-link :to="`/${link.href}`" active-class="active">
          {{ link.link }}
        </router-link>
      </li>
    </ul>
    <ul class="space-y-4 mt-4">
      <li
        v-for="(link, index) in links.auth"
        :key="index"
        class="hover:text-green-500 hover:translate-x-1 duration-300"
      >
        <router-link :to="`/${link.href}`" active-class="active">
          {{ link.link }}
        </router-link>
      </li>
      <li class="text-red-500 hover:text-red-600 cursor-pointer">
        <span> Log out <i class="pi pi-sign-out translate-0.5"></i> </span>
      </li>
    </ul>
  </div>
</template>
