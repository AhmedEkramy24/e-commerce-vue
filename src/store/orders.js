import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import { jwtDecode } from "jwt-decode";

export const useOrdersStore = defineStore("orders", () => {
  const authStore = useAuthStore();
  const { id } = jwtDecode(authStore.token);
  const orders = ref([]);
  const isLoading = ref(true);

  async function getOrders() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      );
      orders.value = data;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
  return { orders, getOrders, isLoading };
});
