<template>
  <section class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Settings</h1>

    <div class="grid gap-4 md:grid-cols-3">
      <!-- Orders -->
      <RouterLink
        to="/allorders"
        class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-all hover:-translate-y-1"
      >
        <div class="flex items-center gap-3 mb-3">
          <i class="pi pi-shopping-bag text-2xl text-green-500"></i>
          <h2 class="text-lg font-semibold">Orders</h2>
        </div>
        <p class="text-gray-500 text-sm">
          View your order history and track purchases.
        </p>
      </RouterLink>

      <!-- Change Password -->
      <RouterLink
        to="/change-password"
        class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-all hover:-translate-y-1"
      >
        <div class="flex items-center gap-3 mb-3">
          <i class="pi pi-lock text-2xl text-green-500"></i>
          <h2 class="text-lg font-semibold">Change Password</h2>
        </div>
        <p class="text-gray-500 text-sm">
          Update your password to keep your account secure.
        </p>
      </RouterLink>

      <!-- Profile -->
      <RouterLink
        to="/profile"
        class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-all hover:-translate-y-1"
      >
        <div class="flex items-center gap-3 mb-3">
          <i class="pi pi-user-edit text-2xl text-green-500"></i>
          <h2 class="text-lg font-semibold">Profile Information</h2>
        </div>
        <p class="text-gray-500 text-sm">
          Edit your personal information and account details.
        </p>
      </RouterLink>
    </div>
  </section>
</template>
