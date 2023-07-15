<template>
  <div class="flex gap-x-1">
    <button
      v-for="user in users"
      :key="user.id"
      type="button"
      class="rounded-full"
      @click="$emit('update:modelValue', user)"
    >
      <img
        :src="user.icon"
        class="w-10 h-10 rounded-full"
        draggable="false"
        :class="[
          user.id == modelValue.id
            ? 'border-2 border-accent'
            : 'brightness-50 p-0.5', // padding to avoid move when switch user
        ]"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { IUser } from '~/models/common/user';

// インスタンスで絞って呼び出す可能性があるので、usersはpropsで受け取る
defineProps<{
  users: IUser[];
  modelValue: IUser; // active user
}>();

defineEmits<{
  (e: 'update:modelValue', value: IUser): void;
}>();
</script>
