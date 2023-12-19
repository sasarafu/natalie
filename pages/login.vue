<template>
  <div class="h-screen w-screen static">
    <form
      class="flex justify-center items-center h-full"
      @submit.prevent="submit"
    >
      <div class="flex flex-col gap-y-3 justify-center items-center h-full">
        <button
          v-for="instanceType in instanceTypes"
          :key="instanceType"
          type="button"
          class="btn border border-secondary h-fit w-fit p-3"
          :class="
            selectedInstanceType === instanceType
              ? 'btn-secondary'
              : 'brightness-50'
          "
          @click="switchInstance(instanceType)"
        >
          <span class="text-xl">{{ instanceType }}</span>
        </button>
      </div>

      <div class="divider divider-horizontal"></div>

      <div class="flex flex-col gap-y-3 justify-center items-center h-full">
        <div class="form-control">
          <label class="label">
            <span class="label-text">インスタンスURL</span>
          </label>
          <input
            v-model="instanceUrl"
            class="input join-item border border-secondary w-96"
            :disabled="selectedInstanceType === undefined"
          />
          <label class="label">
            <span class="label-text-alt">例: example.com</span>
          </label>
        </div>

        <button
          type="submit"
          class="btn btn-secondary join-item"
          :disabled="isLinkInvalid"
        >
          Let's go
        </button>
      </div>
    </form>

    <div class="absolute left-2 top-2">
      <NuxtLink to="/" type="button" class="btn">
        <span class="material-symbols-outlined">arrow_back</span>
        back
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { instanceTypes } from '~/models/instances/instanceType';
import type { IInstanceType } from '~/models/instances/instanceType';

const { $repositories } = useNuxtApp();

const selectedInstanceType = ref<IInstanceType | undefined>();
const instanceUrl = ref<string>('');

const isLinkInvalid = computed(() => {
  return !selectedInstanceType.value || !instanceUrl.value.length;
});

const submit = () => {
  if (!selectedInstanceType.value) {
    return;
  }

  try {
    const url = $repositories(selectedInstanceType.value).getAuthUrl(
      instanceUrl.value,
      window.location.origin,
    );

    navigateTo(url, { external: true });
  } catch {}
};

const switchInstance = (instanceType: IInstanceType) => {
  if (selectedInstanceType.value !== instanceType) {
    selectedInstanceType.value = instanceType;
    instanceUrl.value = '';
  }
};
</script>
