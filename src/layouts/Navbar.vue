<script lang="ts" setup>
import { ref } from "vue";
import { Disclosure, DisclosurePanel, DisclosureButton } from "@headlessui/vue";
import { MenuIcon, XIcon, LogoutIcon } from "@heroicons/vue/outline";
import Button from "../components/common/Button.vue";
import Link from "../components/common/Link.vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
import { Alert } from "../models/Alert";

// Store
const user = useUserStore();

// Router
const router = useRouter();

const links = ref([
  {
    label: "My Receipts",
    to: "ReceiptsList",
    active: true,
  },
]);

/**
 * Log out current user
 */
function logOut() {
  const currentUser = user.currentUser;
  const userFirst = currentUser.firstName;
  if(currentUser.logout()) {
    Alert.create(Alert.PRIMARY, 'We hope to see you soon!', `Thank you, ${userFirst}.`);
    router.push('/sign-in');
  }
}
</script>

<template>
  <Disclosure as="nav" class="bg-primary" v-slot="{ open }">
    <nav class="w-full mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-5 w-5" aria-hidden="true" />
            <XIcon v-else class="block h-5 w-5" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex-1 gap-3 flex items-center justify-center sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <!-- <img
              class="block lg:hidden h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Workflow"
            /> -->
            <img src="/src/assets/logo-pin.png" alt="Logo" width="40" height="40"/>
            <h4 class="text-lg ml-3 text-white hidden lg:block">ReceiptManager</h4>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <Link
                dense
                :flat="!item.active"
                :outline="item.active"
                v-for="item in links"
                :key="item.label"
                :to="{ name: item.to }"
              >
                {{ item.label }}
              </Link>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <Button dense outline @click="logOut">
            <LogoutIcon class="h-5 w-5 mr-1 inline" />
            <span>Sign out</span>
          </Button>
        </div>
      </div>
    </nav>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <Link
          :flat="!item.active"
          :outline="item.active"
          v-for="item in links"
          :key="item.label"
          :to="{ name: item.to }"
        >
          {{ item.label }}
        </Link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
