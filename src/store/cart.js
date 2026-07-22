import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";
import { useToast } from "vue-toastification";

export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);
  const cartCount = ref(0);
  const totalCartPrice = ref(0);
  const authStore = useAuthStore();
  const isLoading = ref(true);
  const toast = useToast();
  const loadingProductId = ref(null);
  const cartId = ref("");

  async function getCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: authStore.token,
          },
        },
      );
      cart.value = data.data.products;
      cartCount.value = data.numOfCartItems;
      totalCartPrice.value = data.data.totalCartPrice;
      cartId.value = data.data._id;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function addItemToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: {
            token: authStore.token,
          },
        },
      );
      toast.success("Add successfuly to your cart ✅", {
        timeout: 2000,
        position: "top-center",
      });

      loadingProductId.value = productId;
      cartCount.value = data.numOfCartItems;
      totalCartPrice.value = data.data.totalCartPrice;
      cart.value = data.data.products;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    cart,
    cartCount,
    getCart,
    isLoading,
    loadingProductId,
    addItemToCart,
    totalCartPrice,
    cartId,
  };
});
