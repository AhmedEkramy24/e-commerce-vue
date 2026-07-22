import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usecategoriesStore = defineStore("categories", () => {
  const categories = ref([]);

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories",
      );
      categories.value = data.data;
    } catch (error) {
      console.log(error);
    }
  }
  return { categories, getCategories };
});
