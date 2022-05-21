<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">สร้างบัญชีผู้ใช้</h2>
        <p class="mt-2 text-center text-gray-600">
          หรือ
          {{ ' ' }}
          <router-link :to="{ name : 'Login' }" class="font-medium text-indigo-600 hover:text-indigo-500">
            เข้าสู่ระบบ
          </router-link>
        </p>
      </div>
      <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
        <div v-for="(field, i) of Object.keys(errors)" :key="i">
          <div v-for="(error, ind) of errors[field]" :key="ind">
            * {{ error }}
          </div>
        </div>
      </Alert>
      <form class="mt-8 space-y-6" @submit="register">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">ชื่อ</label>
            <input id="name" name="name" type="text" required="" v-model="user.name" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 " placeholder="ชื่อ" />
          </div>
          <div>
            <label for="email-address" class="sr-only">อีเมล</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" v-model="user.email" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 " placeholder="อีเมล" />
          </div>
          <div>
            <label for="password" class="sr-only">รหัสผ่าน</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="user.password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 " placeholder="รหัสผ่าน" />
          </div>
          <div>
            <label for="password_confirmation" class="sr-only">ยืนยันรหัสผ่าน</label>
            <input id="password_confirmation" name="password_confirmation" type="password" required="" v-model="user.password_confirmation" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 " placeholder="ยืนยันรหัสผ่าน" />
          </div>
        </div>


        <div>
          <button
            :disabled="loading"
            type="submit" 
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :class="{'cursor-not-allowed' : loading, 'hover:bg-indigo-500' : loading}"
            >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            สร้างบัญชี
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
 
<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import store from '../../store'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Alert from "../../components/Alert.vue";


const router = useRouter();
const user = {
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
}
const loading = ref(false);

const errors = ref({});

function register(e){
  e.preventDefault();

  loading.value = true;

  store
    .dispatch('register', user)
    .then((res)=>{
      loading.value = false;
      router.push({
        name: 'Login'
      })
    }).catch(err => {
      loading.value = false;
      if(err.response.status === 422){
        errors.value = err.response.data.errors;
      }
    })
}
</script>