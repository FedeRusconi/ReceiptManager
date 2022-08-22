<script lang="ts" setup>
import { ref } from 'vue';
import { EyeIcon, EyeOffIcon, AtSymbolIcon, UserIcon, KeyIcon, CheckCircleIcon } from '@heroicons/vue/outline';
import { Form } from 'vee-validate';
import BorderedField from '../components/common/form-elements/BorderedField.vue';
import * as yup from 'yup';
import Button from '../components/common/Button.vue';
import { User } from '../models/User';
import { IUser } from '../@types/IUser';
import ViewAlert from '../components/common/Alert.vue';
import { Alert } from '../models/Alert';
import { IHttpResponse } from '../@types/IHttpResponse';
import { useRouter } from 'vue-router';

// Router
const router = useRouter();

// Loading
const loading = ref(false);

// Show/hide passwords
const viewPwd = ref(false);
const viewConfirmPwd = ref(false);

// Form values
const formData = ref<IUser>({
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Create form validations
const registerForm = yup.object({
  firstName: yup.string().required('Please enter your first name.'),
  lastName: yup.string().required('Please enter your last name.'),
  email: yup.string().required('Please enter your email.').email().label('Email'),
  password: yup.string().required('Please enter a password.').min(8).label('Password'),
  confirmPassword: yup.string().required('Please confirm your password.').oneOf([yup.ref('password')], 'Passwords do not match.'),
});


/**
 * Register user to application
 */
async function registerUser() {
  loading.value = true;
  const newUser = new User(formData.value);
  newUser.password = formData.value.password;
  newUser.confirmPassword = formData.value.confirmPassword;
  newUser.create()
    .then((response: IHttpResponse) => {
      Alert.create(Alert.PRIMARY, response.message, 'Welcome to ReceiptManager.');
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
        <h2 class="text-xl">Welcome to ReceiptManager!</h2>
        <p>Please enter your details below.</p>
      </div>
      <Form 
        class="grid grid-cols-1 gap-6" 
        :validation-schema="registerForm"
        @submit="registerUser()"
      >
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-gray-700">First Name</label>
            <BorderedField
              name="firstName"
              type="text"
              v-model="formData.firstName"
            >
              <template #prepend>
                <UserIcon class="h-5 w-5" />
              </template>
            </BorderedField>
          </div>
          <div>
            <label class="text-gray-700">Last Name</label>
            <BorderedField
              name="lastName"
              type="text"
              v-model="formData.lastName"
            >
              <template #prepend>
                <UserIcon class="h-5 w-5" />
              </template>
            </BorderedField>
          </div>
        </div>
        <div class="block">
          <label class="text-gray-700">Email address</label>
          <BorderedField
            name="email"
            type="email"
            placeholder="example@receiptmanager.com"
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
        <div class="block">
          <label class="text-gray-700">Confirm Password</label>
          <BorderedField
            name="confirmPassword"
            :type="viewConfirmPwd ? 'text' : 'password'"
            v-model="formData.confirmPassword"
          >
            <template #prepend>
              <CheckCircleIcon class="h-5 w-5" />
            </template>
            <template #append>
              <button 
                type="button"
                @click="viewConfirmPwd = !viewConfirmPwd"
              >
                <EyeIcon class="h-5 w-5" v-if="!viewConfirmPwd" />
                <EyeOffIcon class="h-5 w-5" v-if="viewConfirmPwd" />
              </button>
            </template>
          </BorderedField>
        </div>
        <div class="grid gap-2">
          <Button
            submit
            :loading="loading"
            loadingText="Signing you up"
            class="w-full"
            color="success"
          >
            Sign Up
          </Button>
          <Button outline :disabled="loading" class="w-full" reset color="danger">
            Clear
          </Button>
        </div>
      </Form>
      <div class="mt-5 text-center">
        Already part of the ReceiptManager's family?<br> Sign in 
        <router-link to="/sign-in" class="text-red-500"><u>here</u></router-link>
      </div>
    </div>
    <!-- This is necessary to display alerts -->
    <ViewAlert />
  </div>
</template>