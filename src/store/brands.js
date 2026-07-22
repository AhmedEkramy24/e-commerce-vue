import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBrandssStore = defineStore("brands", () => {
  const brands = ref([]);

  async function getBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands",
      );
      brands.value = data.data;
    } catch (error) {
      console.log(error);
    }
  }
  return { brands, getBrands };
});
