import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductsStore = defineStore("products", () => {
  const products = ref([]);

  async function getProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
      );
      products.value = data.data;
    } catch (error) {
      console.log(error);
    }
  }
  return { products, getProducts };
});
