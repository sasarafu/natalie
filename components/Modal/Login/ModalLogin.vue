<template>
  <Teleport to="#modalIndex">
    <ModalBaseContainer
      closable
      class="!w-[90dvw] !h-[90dvh] !max-w-[640px] !max-h-[480px] overflow-y-auto"
      @close="$emit('close')"
    >
      <div class="flex flex-col gap-2">
        <p class="mb-2">どのアカウントを追加しますか？</p>
        <div class="flex flex-wrap justify-end gap-x-2 gap-y-1">
          <template v-if="!selectedInstanceType">
            <button
              v-for="instanceType in instanceTypes"
              :key="instanceType"
              type="button"
              class="btn btn-primary btn-outline"
              @click="selectedInstanceType = instanceType"
            >
              <span class="text-lg">{{ instanceType }}</span>
            </button>
          </template>

          <template v-else>
            <button
              class="btn btn-circle"
              @click="selectedInstanceType = undefined"
            >
              <span class="material-symbols-outlined">refresh</span>
            </button>

            <button
              :key="selectedInstanceType"
              type="button"
              class="btn btn-primary"
            >
              <span class="text-lg">{{ selectedInstanceType }}</span>
            </button>
          </template>
        </div>
      </div>

      <div class="divider" />

      <component
        :is="loginComponents[selectedInstanceType]"
        v-if="selectedInstanceType"
        @close="$emit('close')"
      />
    </ModalBaseContainer>
  </Teleport>
</template>

<script setup lang="ts">
import { instanceTypes } from '~/models/instances/instanceType';
import type { IInstanceType } from '~/models/instances/instanceType';

// 閉じたくないとき、$emit('close')は実装しないこと
defineEmits<{
  (e: 'close'): void;
}>();

const selectedInstanceType = ref<IInstanceType | undefined>();

const loginComponents = {
  bluesky: resolveComponent('ModalLoginBluesky'),
  mastodon: resolveComponent('ModalLoginMastodon'),
  misskey: resolveComponent('ModalLoginMisskey'),
};
</script>

<style scoped>
:deep(::placeholder) {
  opacity: 0.3;
}
</style>
