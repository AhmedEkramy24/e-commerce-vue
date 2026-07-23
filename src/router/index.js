import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home/Home.vue";
import Cart from "../components/Cart/Cart.vue";
import WishList from "../components/WishList/WishList.vue";
import Categories from "../components/Categories/Categories.vue";
import Brands from "../components/Brands/Brands.vue";
import Products from "../components/Products/Products.vue";
import LogIn from "../components/LogIn/LogIn.vue";
import SignUp from "../components/SignUp/SignUp.vue";
import NotFound from "../components/NotFound/NotFound.vue";
import ForgetPass from "../components/ForgetPass/ForgetPass.vue";
import ResetCode from "../components/ResetCode/ResetCode.vue";
import ResetPass from "../components/ResetPass/ResetPass.vue";
import SpecificProduct from "../components/SpecificProduct/SpecificProduct.vue";
import Payment from "../components/Payment/Payment.vue";
import CashOrder from "../components/Payment/CashOrder.vue";
import Checkout from "../components/Payment/Checkout.vue";
import AllOrders from "../components/AllOrders/AllOrders.vue";
import SpecificOrder from "../components/AllOrders/SpecificOrder.vue";
import Settings from "../components/Settings/Settings.vue";
import ChangePassword from "../components/ChangePassword/ChangePassword.vue";
import Profile from "../components/Profile/Profile.vue";

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      protected: true,
    },
  },
  {
    path: "/cart",
    component: Cart,
    meta: {
      protected: true,
    },
  },
  {
    path: "/wish-list",
    component: WishList,
    meta: {
      protected: true,
    },
  },
  {
    path: "/categories",
    component: Categories,
    meta: {
      protected: true,
    },
  },
  {
    path: "/brands",
    component: Brands,
    meta: {
      protected: true,
    },
  },
  {
    path: "/products",
    component: Products,
    meta: {
      protected: true,
    },
  },
  {
    path: "/checkout",
    component: Payment,
    meta: {
      protected: true,
    },
  },
  {
    path: "/settings",
    component: Settings,
    meta: {
      protected: true,
    },
  },
  {
    path: "/change-password",
    component: ChangePassword,
    meta: {
      protected: true,
    },
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      protected: true,
    },
  },
  {
    path: "/checkout/cash",
    component: CashOrder,
    meta: {
      protected: true,
    },
  },
  {
    path: "/checkout/online",
    component: Checkout,
    meta: {
      protected: true,
    },
  },
  {
    path: "/products/:id",
    component: SpecificProduct,
    name: "product-details",
    meta: {
      protected: true,
    },
  },
  {
    path: "/allorders",
    component: AllOrders,

    meta: {
      protected: true,
    },
  },
  {
    path: "/allorders/:id",
    component: SpecificOrder,

    meta: {
      protected: true,
    },
  },
  {
    path: "/login",
    component: LogIn,
  },
  {
    path: "/forget-pass",
    component: ForgetPass,
  },
  {
    path: "/reset-code",
    component: ResetCode,
  },
  {
    path: "/reset-pass",
    component: ResetPass,
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
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");
  if (to.meta.protected && !token) {
    return "/login";
  }
});

export default router;
