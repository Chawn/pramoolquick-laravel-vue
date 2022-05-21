<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <router-link to="/" class="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
                PramoolQuick
              </router-link>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  :target="item.target"
                  :class="[
                    this.$route.name === item.to.name
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium',
                  ]"
                  >{{ item.name }}
                </router-link>
                <a 
                  href="https://chrome.google.com/webstore/detail/pramool-quick/mhhpcbegifmfmbcbnopdcmbagdbgnpdc?hl=th"
                  class="flex text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  target="_blank"
                  >
                  <span class="pr-1">ติดตั้ง Extension</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <Menu v-if="user.name" as="div" class="ml-3 relative">
                <div>
                  <MenuButton
                    class="text-white max-w-xs bg-gray-800 rounded-full flex items-center text-sm"
                  >
                    <span class="sr-only">Open user menu</span>
                    <span class="pl-1">{{ user.name }}</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="px-1 py-1" role="none">
                      <MenuItem v-slot="{ active }" class="flex items-center ">
                        <router-link
                          to="/account"
                          :class="[
                            'cursor-pointer block px-4 py-2 text-gray-700',
                          ]"
                          >
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                          <span class="pl-1">บัญชี</span>
                        </router-link>
                      </MenuItem>
                      <MenuItem v-slot="{ active }" class="flex items-center ">
                        <router-link
                          to="/help"
                          :class="[
                            'cursor-pointer block px-4 py-2 text-gray-700',
                          ]"
                          >
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <span class="pl-1">ศูนย์ช่วยเหลือ</span>
                        </router-link>
                      </MenuItem>
                    </div>
                    <div class="px-1 py-1" role="none">
                      <MenuItem v-slot="{ active }">
                        <a
                          @click="logout"
                          :class="[
                            'cursor-pointer block px-4 py-2 text-gray-700',
                          ]"
                          >ออกจากระบบ</a
                        >
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
              <div v-else class="ml-10 flex items-baseline space-x-4">
                <router-link
                  to="/login"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                  เข้าสู่ระบบ
                </router-link>
                <router-link
                  to="/register"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                  สร้างบัญชี
                </router-link>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            :class="[
              this.$route.name === item.to.name
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            >{{ item.name }}
          </router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div v-if="user.name">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">
                  {{ user.name }}
                </div>
                <div class="text-sm font-medium leading-none text-gray-400">
                  {{ user.email }}
                </div>
              </div>
            </div>
            <div class="mt-3 px-2 space-y-1">
              <DisclosureButton
                as="a"
                @click="logout"
                class="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >ออกจากระบบ</DisclosureButton
              >
            </div>
          </div>
          <div v-else>
            <div class="mt-3 px-2 space-y-1">
              <DisclosureButton
                as="a"
                @click="login"
                class="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >เข้าสู่ระบบ</DisclosureButton
              >
            </div>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <router-view> </router-view>

    <Notification />
  </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/solid'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import Notification from "./Notification.vue";
import { LockClosedIcon } from '@heroicons/vue/solid'


const store = useStore();
const router = useRouter();

function logout() {
  store.dispatch("logout").then(() => {
    router.push({
      name: "Home",
    });
  });
}

function login(){
  router.push({
    name: "Login",
  });
}

const user = computed(() => store.state.user.data);

const navigation = [
  { name: "สมัคร Premium", to: { name: "Premium" } },
  { name: "ศูนย์ช่วยเหลือ", to: { name: "Help" } },
];
</script>
