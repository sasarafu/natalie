<template>
  <div class="h-screen w-screen">
    <div class="flex flex-col gap-y-3 justify-center items-center h-full">
      <div class="form-control">
        <label class="label">
          <span class="label-text">ユーザID</span>
        </label>
        <input
          v-model="userid"
          class="input join-item border border-secondary w-96"
        />
        <label class="label">
          <span class="label-text-alt">例: example.bsky.social</span>
        </label>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">password</span>
        </label>
        <input
          v-model="password"
          class="input join-item border border-secondary w-96"
        />
        <label class="label">
          <span class="label-text-alt">
            セキュリティのため、
            <NuxtLink
              target="_blank"
              :to="`https://${instanceUrl}/settings/app-passwords`"
              class="text-primary"
            >
              AppPassword
            </NuxtLink>
            の利用を強く推奨します
          </span>
        </label>
      </div>

      <button
        type="submit"
        class="btn btn-secondary join-item"
        :disabled="isDisabled || submitting"
        @click="submit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BskyAgent } from '@atproto/api';

const { add } = useLoginUsersStore();

const $route = useRoute();
const instanceUrl = $route.params.instance;

const userid = ref<string>('');
const password = ref<string>('');

const submitting = ref<boolean>(false);
const isDisabled = computed(
  () => !userid.value.length || !password.value.length,
);

const submit = async () => {
  submitting.value = true;

  if (typeof instanceUrl === 'string') {
    try {
      const agent = new BskyAgent({ service: `https://${instanceUrl}` });
      await agent.login({ identifier: userid.value, password: password.value });

      if (!agent.hasSession || !agent.session) {
        throw Error('could not login');
      }

      add({
        instance: {
          type: 'bluesky',
          baseUrl: agent.service.toString(),
        },
        // セッション情報はJSONにして保存する
        accessToken: JSON.stringify(agent.session),
      });

      navigateTo('/');
    } catch (_) {
      submitting.value = false;
    }
  }
};
</script>
