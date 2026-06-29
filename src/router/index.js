import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home/Home.vue";
import Cart from "../components/Cart/Cart.vue";
import WishList from "../components/WishList/WishList.vue";
import Categories from "../components/Categories/Categories.vue";
import Brands from "../components/Brands/Brands.vue";
import Products from "../components/Products/Products.vue";
import LogIn from "../components/Login/Login.vue";
import SignUp from "../components/SignUp/SignUp.vue";
import NotFound from "../components/NotFound/NotFound.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/wish-list",
    component: WishList,
  },
  {
    path: "/categories",
    component: Categories,
  },
  {
    path: "/brands",
    component: Brands,
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/login",
    component: LogIn,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
