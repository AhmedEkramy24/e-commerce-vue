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
const router = useRouter();
const toast = useToast();

const schema = yup.object({
  resetCode: yup.string().required("please write the code"),
});

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [resetCode] = defineField("resetCode");

function handleResetCode(data) {
  isSubmit.value = false;
  apiError.value = "";
  toast.success(`${data.status} ✅`, {
    timeout: 2000,
    position: "top-center",
  });
  router.push("/reset-pass");
}

const onSubmit = handleSubmit(async (values) => {
  isSubmit.value = true;
  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      values,
    );
    handleResetCode(data);
  } catch (error) {
    apiError.value = error?.response?.data?.message;
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
    <h2 class="text-2xl font-bold text-center">Forgot Password</h2>
    <div
      class="p-4 mb-4 text-sm text-red-700 rounded-base bg-red-100"
      role="alert"
      v-if="apiError"
    >
      {{ apiError }}
    </div>
    <div>
      <label for="resetCode" class="block mb-2 text-sm font-medium">
        Reset code
      </label>

      <input
        id="resetCode"
        type="text"
        v-model="resetCode"
        placeholder="Enter reset code"
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
    <div class="flex items-center justify-between">
      <div>
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
    </div>
  </form>
</template>
