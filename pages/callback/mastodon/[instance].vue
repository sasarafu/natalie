<template>
  <div class="h-screen w-screen">
    <div class="flex flex-col gap-y-3 justify-center items-center h-full">
      <div class="form-control">
        <label class="label">
          <span class="label-text">アクセストークン</span>
        </label>
        <input
          v-model="accessToken"
          class="input join-item border border-secondary w-96"
        />
        <label class="label">
          <span class="label-text-alt">
            必ず自分で作成したアクセストークンを使用してください
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
// サーバごとにアプリの有無を管理したくないので、ユーザごとにアプリを作成してもらってそのアクセストークンを受け取るようにする

import type { ILoginUser } from '~/models/common/user';
import { useLoginUsers } from '~/stores/loginUsers';

const { $repositories } = useNuxtApp();
const $route = useRoute();

const { add } = useLoginUsers();

const instanceUrl = $route.params.instance;

const accessToken = ref<string>('');
const submitting = ref<boolean>(false);

const isDisabled = computed(() => !accessToken.value.length);

const submit = async () => {
  submitting.value = true;

  if (typeof instanceUrl === 'string') {
    const tempLoginUser: ILoginUser = {
      id: '',
      name: '',
      icon: '',
      instance: {
        type: 'mastodon',
        baseUrl: `https://${instanceUrl}`,
      },
      accessToken: accessToken.value,
    };

    try {
      const res = await (
        await $repositories('mastodon').client(tempLoginUser)
      ).v1.accounts.verifyCredentials();

      add({
        id: res.id,
        name: res.displayName || res.username,
        icon: res.avatar,
        instance: {
          type: 'mastodon',
          baseUrl: `https://${instanceUrl}`,
        },
        accessToken: accessToken.value,
      });

      navigateTo('/');
    } catch (_) {
      submitting.value = false;
    }
  }
};
</script>