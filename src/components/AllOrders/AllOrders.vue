<script setup>
import { onMounted } from "vue";
import { useOrdersStore } from "../../store/orders";
import Loading from "../Loading/Loading.vue";

const ordersStore = useOrdersStore();

onMounted(() => {
  ordersStore.getOrders();
});
</script>

<template>
  <Loading v-if="ordersStore.isLoading" />

  <div v-else-if="ordersStore.orders.length > 0" class="py-10">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">My Orders</h1>

      <p class="text-slate-500 mt-1">
        Total Orders:
        <span class="font-semibold text-green-600">
          {{ ordersStore.orders.length }}
        </span>
      </p>
    </div>

    <!-- Orders -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="order in ordersStore.orders"
        :key="order._id"
        class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300"
      >
        <!-- Header -->
        <div class="flex justify-between items-start mb-5">
          <div>
            <h2 class="text-lg font-bold text-slate-800">
              Order #{{ order.id }}
            </h2>

            <p class="text-sm text-slate-500">
              {{ new Date(order.createdAt).toLocaleDateString() }}
            </p>
          </div>

          <span
            class="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
            :class="
              order.isPaid
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            "
          >
            <i
              :class="
                order.isPaid ? 'pi pi-check-circle' : 'pi pi-times-circle'
              "
            ></i>

            {{ order.isPaid ? "Paid" : "Unpaid" }}
          </span>
        </div>

        <!-- Info -->
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-slate-500">
              <i class="pi pi-shopping-cart mr-2"></i>
              Items
            </span>

            <span class="font-semibold">
              {{ order.cartItems.length }}
            </span>
          </div>

          <div class="flex justify-between">
            <span class="text-slate-500">
              <i class="pi pi-credit-card mr-2"></i>
              Payment
            </span>

            <span class="font-semibold capitalize">
              {{ order.paymentMethodType }}
            </span>
          </div>

          <div class="flex justify-between">
            <span class="text-slate-500">
              <i class="pi pi-money-bill mr-2"></i>
              Total
            </span>

            <span class="font-bold text-xl text-green-600">
              {{ order.totalOrderPrice }} EGP
            </span>
          </div>
        </div>

        <!-- Details Button -->
        <router-link :to="`/allorders/${order._id}`">
          <button
            class="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold transition cursor-pointer"
          >
            View Details
          </button>
        </router-link>
      </div>
    </div>
  </div>

  <div
    v-else
    class="flex flex-col items-center justify-center py-20 text-center"
  >
    <i class="pi pi-shopping-bag text-6xl text-slate-300 mb-4"></i>

    <h2 class="text-2xl font-bold text-slate-700">No Orders Yet</h2>

    <p class="text-slate-500 mt-2">
      Start shopping and your orders will appear here.
    </p>

    <router-link
      to="/products"
      class="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
    >
      Browse Products
    </router-link>
  </div>
</template>
