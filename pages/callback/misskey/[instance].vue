<template>
  <div>
    リダイレクトされないようならボタンを押してください
    <button type="button" class="btn btn-primary">
      <NuxtLink to="/">back to application</NuxtLink>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useLoginUsers } from '~/stores/loginUsers';

const { $repositories } = useNuxtApp();
const $route = useRoute();
const { add } = useLoginUsers();

const instanceUrl = $route.params.instance;
const sessionId = $route.query.session;

if (typeof instanceUrl === 'string' && typeof sessionId === 'string') {
  const res = await $repositories('misskey').getAccessToken(
    instanceUrl,
    sessionId,
  );

  if (res?.ok) {
    add({
      id: crypto.randomUUID(),
      userid: res.user.id,
      username: res.user.username,
      displayName: res.user.name,
      iconUrl: res.user.avatarUrl,
      instance: {
        type: 'misskey',
        baseUrl: `https://${instanceUrl}`,
      },
      accessToken: res.token,
    });

    navigateTo('/');
  }
}
</script>
