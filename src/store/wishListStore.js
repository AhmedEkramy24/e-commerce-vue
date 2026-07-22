import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";

export const useWishListStore = defineStore("wish-list", () => {
  const wishList = ref([]);
  const wishListCount = ref(0);
  const authStore = useAuthStore();
  const wishListIds = ref([]);
  const isLoading = ref(true);
  async function getWishList() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: authStore.token,
          },
        },
      );
      wishList.value = data.data;
      wishListCount.value = data.count;
      wishListIds.value = wishList.value.map((product) => product._id);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    wishList,
    getWishList,
    wishListCount,
    wishListIds,
    isLoading,
  };
});
