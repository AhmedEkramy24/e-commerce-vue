import axios from "axios";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

export const useProductsStore = defineStore("products", () => {
  const products = ref([]);
  onMounted(() => {
    getProducts();
  });
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
