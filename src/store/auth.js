import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || null);

  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem("token", newToken);
  }

  function logOut() {
    token.value = "";
    localStorage.removeItem("token");
  }

  return { token, logOut, setToken };
});
