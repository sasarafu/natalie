<template>
  <div class="w-64">
    <ul class="flex flex-col gap-2">
      <li>account list</li>
      <li>
        <button
          type="button"
          class="btn btn-primary"
          @click="loginModalRef?.open"
        >
          add account
        </button>
      </li>
    </ul>

    <PartsModalBase ref="LoginModalRef">
      <SidebarAccountLogin @completed="loginModalRef?.close" />
    </PartsModalBase>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'completed'): void;
}>();

const loginModalRef = useTemplateRef('LoginModalRef');
</script>
