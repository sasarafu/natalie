<template>
  <div>
    リダイレクトされないようならボタンを押してください
    <button type="button" class="btn">
      <NuxtLink to="/">back to application</NuxtLink>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { entities } from 'misskey-js';

const $route = useRoute();

const instanceUrl = $route.params.instance;
const sessionId = $route.query.session;

if (typeof instanceUrl === 'string' && typeof sessionId === 'string') {
  try {
    const res = await $fetch<{
      ok: boolean;
      token: string;
      user: entities.User;
    }>(`https://${instanceUrl}/api/miauth/${sessionId}/check`, {
      method: 'post',
    });

    if (!res.ok) {
      throw new Error('not ok');
    }

    useLoginUsersStore().add({
      instance: {
        type: 'misskey',
        baseUrl: `https://${instanceUrl}`,
      },
      accessToken: res.token,
    });
  } catch {
    useToastsStore().add({
      text: 'ログインできませんでした',
      level: 'error',
    });
  }
  navigateTo('/');
}
</script>
