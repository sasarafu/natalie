<template>
  <div class="flex gap-x-1">
    <button
      v-for="account in accounts"
      :key="account.id"
      type="button"
      class="rounded-full"
      @click="$emit('update:modelValue', account)"
    >
      <img
        :src="account.icon"
        class="w-10 h-10 rounded-full"
        draggable="false"
        :class="[
          account.id == modelValue.id
            ? 'border-2 border-accent'
            : 'brightness-50 p-0.5', // padding to avoid move when switch account
        ]"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { IAccount } from '~/models/common/account';

// インスタンスで絞って呼び出す可能性があるので、accountsはpropsで受け取る
defineProps<{
  accounts: IAccount[];
  modelValue: IAccount; // active account
}>();

defineEmits<{
  (e: 'update:modelValue', value: IAccount): void;
}>();
</script>
