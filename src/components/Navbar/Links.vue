<script setup>
const links = [
  {
    link: "Home",
    href: "",
    token: true,
  },
  {
    link: "Cart",
    href: "cart",
    token: true,
  },
  {
    link: "Wish List",
    href: "wish-list",
    token: true,
  },
  {
    link: "Categories",
    href: "categories",
    token: true,
  },
  {
    link: "Brands",
    href: "brands",
    token: true,
  },
  {
    link: "Products",
    href: "products",
    token: true,
  },
  {
    link: "Log in",
    href: "login",
    token: false,
  },
  {
    link: "signUp",
    href: "signup",
    token: false,
  },
  {
    link: "Log out",
    token: true,
  },
];
</script>

<template>
  <div class="md:block hidden">
    <ul class="flex space-x-4 ms-3">
      <li
        v-for="(link, index) in links"
        :key="index"
        :class="[
          'hover:text-green-500 text-[14px] font-semibold',
          { 'text-red-600 hover:text-red-800': index === links.length - 1 },
        ]"
      >
        <router-link :to="`/${link.href}`" active-class="active">
          {{ link.link }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
