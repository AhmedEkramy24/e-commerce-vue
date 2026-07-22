<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useOrdersStore } from "../../store/orders";

const route = useRoute();
const ordersStore = useOrdersStore();

const order = computed(() =>
  ordersStore.orders.find((item) => item._id === route.params.id),
);
</script>

<template>
  <div v-if="order" class="max-w-6xl mx-auto px-4 py-10">
    <!-- Header -->
    <div
      class="bg-white rounded-3xl shadow-md border border-slate-200 p-6 mb-8"
    >
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold text-slate-800">
            Order #{{ order.id }}
          </h1>

          <p class="text-slate-500 mt-2">
            {{ new Date(order.createdAt).toLocaleString() }}
          </p>
        </div>

        <div class="flex gap-3">
          <span
            class="px-4 py-2 rounded-full font-semibold"
            :class="
              order.isPaid
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            "
          >
            {{ order.isPaid ? "Paid" : "Unpaid" }}
          </span>

          <span
            class="px-4 py-2 rounded-full font-semibold"
            :class="
              order.isDelivered
                ? 'bg-blue-100 text-blue-700'
                : 'bg-yellow-100 text-yellow-700'
            "
          >
            {{ order.isDelivered ? "Delivered" : "Pending" }}
          </span>
        </div>
      </div>
    </div>

    <!-- Order Summary -->
    <div class="grid md:grid-cols-3 gap-5 mb-8">
      <div class="bg-white rounded-2xl p-5 shadow border">
        <p class="text-slate-500">Total Price</p>
        <h3 class="text-2xl font-bold text-green-600">
          {{ order.totalOrderPrice }} EGP
        </h3>
      </div>

      <div class="bg-white rounded-2xl p-5 shadow border">
        <p class="text-slate-500">Items</p>
        <h3 class="text-2xl font-bold">
          {{ order.cartItems.length }}
        </h3>
      </div>

      <div class="bg-white rounded-2xl p-5 shadow border">
        <p class="text-slate-500">Payment Method</p>
        <h3 class="text-2xl font-bold capitalize">
          {{ order.paymentMethodType }}
        </h3>
      </div>
    </div>

    <!-- Products -->
    <div>
      <h2 class="text-2xl font-bold mb-6">Ordered Products</h2>

      <div class="space-y-4">
        <div
          v-for="item in order.cartItems"
          :key="item._id"
          class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
        >
          <div class="flex flex-col md:flex-row gap-5">
            <img
              :src="item.product.imageCover"
              :alt="item.product.title"
              class="w-32 h-32 object-contain mx-auto md:mx-0"
            />

            <div class="flex-1">
              <p class="text-green-600 font-semibold">
                {{ item.product.category.name }}
              </p>

              <h3 class="text-xl font-bold mt-1">
                {{ item.product.title }}
              </h3>

              <div class="flex items-center gap-2 mt-2">
                <i class="pi pi-star-fill text-yellow-400"></i>
                <span>{{ item.product.ratingsAverage }}</span>
              </div>

              <div class="flex flex-wrap gap-6 mt-4 text-slate-600 font-medium">
                <span>
                  Quantity:
                  <span class="font-bold">{{ item.count }}</span>
                </span>

                <span>
                  Price:
                  <span class="font-bold text-green-600">
                    {{ item.price }} EGP
                  </span>
                </span>

                <span>
                  Total:
                  <span class="font-bold text-green-600">
                    {{ item.price * item.count }} EGP
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-20 text-2xl font-semibold text-slate-500">
    Order not found
  </div>
</template>
