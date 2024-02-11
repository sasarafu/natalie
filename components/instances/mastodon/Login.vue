<template>
  <div class="flex flex-col gap-2">
    <p>インスタンスはどこですか？選択肢になければ自分で入力してください</p>
    <div class="flex flex-wrap justify-end gap-x-2 gap-y-1">
      <template v-if="!selectedInstance">
        <button
          v-for="instance in representativeInstances"
          :key="instance"
          type="button"
          class="btn btn-primary btn-outline"
          @click="selectedInstance = instance"
        >
          <span class="text-lg">{{ instance }}</span>
        </button>

        <div class="basis-full"></div>

        <form
          class="flex items-center relative max-w-full"
          @submit.prevent="selectedInstance = instanceInput"
        >
          <input
            v-model="instanceInput"
            class="input input-bordered pr-8 w-80 max-w-full"
            placeholder="自分で入力する"
            :class="{ 'input-primary': instanceInput }"
          />
          <button
            type="submit"
            class="btn btn-xs btn-circle btn-primary btn-outline absolute right-1"
          >
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </form>
      </template>

      <template v-else>
        <button class="btn btn-circle" @click="selectedInstance = ''">
          <span class="material-symbols-outlined">refresh</span>
        </button>
        <button :key="selectedInstance" type="button" class="btn btn-primary">
          <span class="text-lg">{{ selectedInstance }}</span>
        </button>
      </template>
    </div>

    <template v-if="selectedInstance">
      <p>アクセストークンを入力してください</p>
      <form class="flex flex-col items-end gap-y-2" @submit.prevent="login">
        <div class="form-control max-w-full">
          <input
            v-model="accessToken"
            class="input input-bordered w-80 max-w-full"
            :class="{ 'input-primary': accessToken }"
          />
          <div class="label">
            <span class="label-text-alt">
              自分でアクセストークンを作成してください
            </span>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-circle"
          :disabled="!accessToken || submitting"
        >
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
const selectedInstance = ref('');
const instanceInput = ref('');

const accessToken = ref('');

const representativeInstances = ['mstdn.jp'] as const;

const submitting = ref(false);
const login = async () => {
  submitting.value = true;

  if (!selectedInstance.value || !accessToken.value) {
    submitting.value = false;
    return;
  }

  useLoginUsersStore().add({
    instance: {
      type: 'mastodon',
      baseUrl: `https://${selectedInstance.value}`,
    },
    accessToken: accessToken.value,
  });

  useModalsStore().clear();
};
</script>
