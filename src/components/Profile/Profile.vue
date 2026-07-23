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
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [name] = defineField("name");
const [email] = defineField("email");
const [phone] = defineField("phone");

const onSubmit = handleSubmit(async (values) => {
  isSubmit.value = true;
  try {
    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      values,
      {
        headers: {
          token: authStore.token,
        },
      },
    );
    isSubmit.value = false;
    apiError.value = "";
    toast.success(`Your data is updated successfuly`, {
      timeout: 2000,
      position: "top-center",
    });
    router.push("/settings");
  } catch (error) {
    apiError.value = error?.response?.data?.errors?.msg;

    isSubmit.value = false;
  }
});
</script>

<template>
  <form
    class="max-w-xl mx-auto p-5 rounded-xl space-y-4"
    @submit.prevent="onSubmit"
  >
    <h2 class="text-2xl font-bold text-center">Update Your Logged Data</h2>
    <div
      class="p-4 mb-4 text-sm text-red-700 rounded-base bg-red-100"
      role="alert"
      v-if="apiError"
    >
      {{ apiError }}
    </div>
    <div>
      <label for="name" class="block mb-1 text-sm font-medium">
        Full Name
      </label>

      <input
        id="name"
        type="text"
        v-model="name"
        placeholder="Enter your name "
        class="w-full p-2 border border-slate-400 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200"
      />
      <div
        class="p-4 mb-4 text-sm text-red-700 rounded-base bg-red-100"
        role="alert"
        v-if="errors.name"
      >
        {{ errors.name }}
      </div>
    </div>

    <div>
      <label for="email" class="block mb-2 text-sm font-medium"> Email </label>

      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="Enter your email"
        class="w-full p-2 border border-slate-400 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200zs"
      />
      <div
        class="p-4 mb-4 text-sm text-red-700 rounded-base bg-red-100"
        role="alert"
        v-if="errors.email"
      >
        {{ errors.email }}
      </div>
    </div>

    <div>
      <label for="phone" class="block mb-1 text-sm font-medium"> Phone </label>

      <input
        id="phone"
        type="tel"
        v-model="phone"
        placeholder="Enter your phone"
        class="w-full p-2 border border-slate-400 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 duration-200"
      />
      <div
        class="p-4 mb-4 text-sm text-red-700 rounded-base bg-red-100"
        role="alert"
        v-if="errors.phone"
      >
        {{ errors.phone }}
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
