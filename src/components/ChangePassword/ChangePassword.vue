<script setup>
import axios from "axios";
import { useForm } from "vee-validate";
import { onMounted, ref } from "vue";
import * as yup from "yup";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const isSubmit = ref(false);
const apiError = ref("");
const showPass = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const schema = yup.object({
  currentPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters"),
  rePassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [currentPassword] = defineField("currentPassword");
const [password] = defineField("password");
const [rePassword] = defineField("rePassword");

const onSubmit = handleSubmit(async (values) => {
  isSubmit.value = true;
  try {
    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      values,
      {
        headers: {
          token: authStore.token,
        },
      },
    );
    isSubmit.value = false;
    apiError.value = "";
    toast.success(`Password is updated successfuly✅`, {
      timeout: 2000,
      position: "top-center",
    });
    authStore.logOut();
    router.push("/login");
  } catch (error) {
    apiError.value = error?.response?.data?.errors?.msg;
    isSubmit.value = false;
  }
});

function handlePass() {
  showPass.value = !showPass.value;
}
</script>

<template>
  <form
    class="max-w-xl mx-auto p-5 rounded-xl space-y-4"
    @submit.prevent="onSubmit"
  >
    <h2 class="text-2xl font-bold text-center">Update Password</h2>
    <div
      class="p-4 mb-4 text-sm text-red-700 rounded-base bg-red-100"
      role="alert"
      v-if="apiError"
    >
      {{ apiError }}
    </div>
    <div class="relative">
      <label for="password" class="block mb-2 text-sm font-medium">
        Current Password
      </label>

      <input
        id="current-pass"
        :type="showPass ? 'text' : 'password'"
        v-model="currentPassword"
        placeholder="Enter your current password"
        class="w-full p-2 border border-slate-400 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200"
      />
      <span class="absolute top-9 right-3 cursor-pointer" @click="handlePass">
        <i :class="['pi', showPass ? 'pi-eye-slash' : 'pi-eye']"></i>
      </span>
      <div
        class="p-4 mb-4 text-sm text-red-700 rounded-base bg-red-100"
        role="alert"
        v-if="errors.currentPassword"
      >
        {{ errors.currentPassword }}
      </div>
    </div>

    <div class="relative">
      <label for="password" class="block mb-2 text-sm font-medium">
        New Password
      </label>

      <input
        id="password"
        :type="showPass ? 'text' : 'password'"
        v-model="password"
        placeholder="Enter your password"
        class="w-full p-2 border border-slate-400 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200"
      />
      <span class="absolute top-9 right-3 cursor-pointer" @click="handlePass">
        <i :class="['pi', showPass ? 'pi-eye-slash' : 'pi-eye']"></i>
      </span>
      <div
        class="p-4 mb-4 text-sm text-red-700 rounded-base bg-red-100"
        role="alert"
        v-if="errors.password"
      >
        {{ errors.password }}
      </div>
    </div>

    <div class="relative">
      <label for="rePassword" class="block mb-2 text-sm font-medium">
        Confirm Password
      </label>

      <input
        id="rePassword"
        :type="showPass ? 'text' : 'password'"
        v-model="rePassword"
        placeholder="Confirm password"
        class="w-full p-2 border border-slate-400 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200"
      />
      <span class="absolute top-9 right-3 cursor-pointer" @click="handlePass">
        <i :class="['pi', showPass ? 'pi-eye-slash' : 'pi-eye']"></i>
      </span>
      <div
        class="p-4 mb-4 text-sm text-red-700 rounded-base bg-red-100"
        role="alert"
        v-if="errors.rePassword"
      >
        {{ errors.rePassword }}
      </div>
    </div>

    <div class="flex items-center justify-between">
      <button
        v-if="!isSubmit"
        type="submit"
        class="bg-green-600 text-white p-2 rounded-lg cursor-pointer mt-2 hover:bg-green-700 duration-200 font-medium"
      >
        Submit
      </button>
      <button
        v-else
        type="button"
        class="bg-green-600 text-white p-2 rounded-lg cursor-pointer mt-2 hover:bg-green-700 duration-200 font-medium"
      >
        <i class="pi pi-spinner-dotted pi-spin text-xl"></i>
      </button>
    </div>
  </form>
</template>
