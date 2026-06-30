<script setup>
import axios from "axios";
import { useForm } from "vee-validate";
import { ref } from "vue";
import * as yup from "yup";

const isSubmit = ref(false);
const apiError = ref("");
const showPass = ref(false);

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters"),
  rePassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
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
const [password] = defineField("password");
const [rePassword] = defineField("rePassword");
const [phone] = defineField("phone");

const onSubmit = handleSubmit(async (values) => {
  isSubmit.value = true;
  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values,
    );
    isSubmit.value = false;
    apiError.value = "";
  } catch (error) {
    apiError.value = "This email has been already exits";
    isSubmit.value = false;
  }
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/signup",
    values,
  );
  console.log(data);
});

function handlePass() {
  showPass.value = !showPass.value;
}
</script>

<template lang="">
  <form class="max-w-xl mx-auto p-5 rounded-xl space-y-4" @submit="onSubmit">
    <h2 class="text-2xl font-bold text-center">Create Account</h2>
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

    <div class="relative">
      <label for="password" class="block mb-2 text-sm font-medium">
        Password
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

    <button
      v-if="!isSubmit"
      type="submit"
      class="bg-green-600 text-white p-2 rounded-lg cursor-pointer mt-2 hover:bg-green-700 duration-200 font-medium"
    >
      Register
    </button>
    <button
      v-else
      type="button"
      class="bg-green-600 text-white p-2 rounded-lg cursor-pointer mt-2 hover:bg-green-700 duration-200 font-medium"
    >
      <i class="pi pi-spinner-dotted pi-spin text-xl"></i>
    </button>
  </form>
</template>
