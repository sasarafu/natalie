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
      <p>アカウント名とパスワードを入力してください</p>
      <form class="flex flex-col items-end gap-y-2" @submit.prevent="login">
        <input
          v-model="userid"
          placeholder="example.bsky.social"
          class="input input-bordered w-80 max-w-full"
          :class="{ 'input-primary': userid }"
        />
        <div class="form-control max-w-full">
          <input
            v-model="password"
            type="password"
            placeholder="password"
            class="input input-bordered w-80 max-w-full"
            :class="{ 'input-primary': password }"
          />
          <div class="label">
            <span class="label-text-alt">
              <NuxtLink
                to="https://bsky.app/settings/app-passwords"
                target="_blank"
                class="text-primary"
              >
                AppPassword
              </NuxtLink>
              の利用を強く推奨します
            </span>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-circle"
          :disabled="!userid || !password || submitting"
        >
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { BskyAgent } from '@atproto/api';

const selectedInstance = ref('');
const instanceInput = ref('');

const userid = ref('');
const password = ref('');

const representativeInstances = ['bsky.social'] as const;

const submitting = ref(false);
const login = async () => {
  submitting.value = true;

  if (!selectedInstance.value || !userid.value || !password.value) {
    submitting.value = false;
    return;
  }

  const agent = new BskyAgent({ service: `https://${selectedInstance.value}` });
  await agent.login({ identifier: userid.value, password: password.value });
  if (!agent.hasSession || !agent.session) {
    submitting.value = false;

    useToastsStore().add({
      text: 'ログインできませんでした',
      level: 'error',
    });
    throw Error('could not login');
  }

  useLoginUsersStore().add({
    instance: {
      type: 'bluesky',
      baseUrl: agent.service.toString(),
    },
    // セッション情報はJSONにして保存する
    accessToken: JSON.stringify(agent.session),
  });

  useModalsStore().clear();
};
</script>
