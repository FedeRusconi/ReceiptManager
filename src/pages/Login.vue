<script lang="ts" setup>
import { ref } from 'vue';
import { EyeIcon, EyeOffIcon, AtSymbolIcon, KeyIcon } from '@heroicons/vue/outline';
import { Form } from 'vee-validate';
import BorderedField from '../components/common/form-elements/BorderedField.vue';
import * as yup from 'yup';
import Button from '../components/common/Button.vue';
import { User } from '../models/User';
import { Alert } from '../models/Alert';
import { IHttpResponse } from '../@types/IHttpResponse';
import { useRouter } from 'vue-router';
import ViewAlert from '../components/common/Alert.vue';

// Router
const router = useRouter();

// Loading
const loading = ref(false);

// Show/hide password
const viewPwd = ref(false);

// Form values
const formData = ref({
  email: '',
  password: '',
})

// Create form validations
const registerForm = yup.object({
  email: yup.string().required('Please enter your email.').email().label('Email'),
  password: yup.string().required().min(8).label('Password'),
});


/**
 * Register user to application
 */
async function login() {
  loading.value = true;
  const newUser = new User();
  newUser.email = formData.value.email;
  newUser.password = formData.value.password;
  newUser.login()
    .then((response: IHttpResponse) => {
      Alert.create(Alert.PRIMARY, response.message, 'Welcome Back.');
      router.push('/dashboard');
    })
    .catch((error: IHttpResponse) => {
      Alert.create(Alert.DANGER, error.message, 'Something went wrong.');
    })
    .finally(() => {
      loading.value = false;
    });
}

</script>


<template>
  <div class="mt-12 flex justify-center items-center">
    <div class="p-8 w-4/5 max-w-lg bg-white shadow-md rounded">
      <div class="text-center mb-8">
        <h2 class="text-xl">Welcome back to ReceiptManager!</h2>
        <p>Please sign in below.</p>
      </div>
      <Form 
        class="grid grid-cols-1 gap-6" 
        :validation-schema="registerForm"
        @submit="login()"
      >
        <div class="block">
          <label class="text-gray-700">Email address</label>
          <BorderedField
            name="email"
            type="email"
            v-model="formData.email"
          >
            <template #prepend>
              <AtSymbolIcon class="h-5 w-5" />
            </template>
          </BorderedField>
        </div>
        <div class="block">
          <label class="text-gray-700">Password</label>
          <BorderedField
            name="password"
            :type="viewPwd ? 'text' : 'password'"
            v-model="formData.password"
          >
            <template #prepend>
              <KeyIcon class="h-5 w-5" />
            </template>
            <template #append>
              <button 
                type="button"
                @click="viewPwd = !viewPwd"
              >
                <EyeIcon class="h-5 w-5" v-if="!viewPwd" />
                <EyeOffIcon class="h-5 w-5" v-if="viewPwd" />
              </button>
            </template>
          </BorderedField>
        </div>
        <div class="grid gap-2">
          <Button 
            submit 
            :loading="loading"
            loadingText="Signing you in"
            class="w-full"            
            color="success"
          >
            Sign In
          </Button>
          <Button :disabled="loading" outline class="w-full" reset color="danger">
            Clear
          </Button>
        </div>
      </Form>
      <div class="mt-5 text-center">
        New to ReceiptManager? Sign up 
        <router-link to="/sign-up" class="text-red-500"><u>here</u></router-link>
      </div>
    </div>
    <!-- This is necessary to display alerts -->
    <ViewAlert />
  </div>
</template>