<template>
  <div>
    リダイレクトされないようならボタンを押してください
    <button type="button" class="btn btn-primary">
      <NuxtLink to="/">back to application</NuxtLink>
    </button>
  </div>
</template>

<script setup lang="ts">
const { $repositories } = useNuxtApp();
const $route = useRoute();
const { add } = useLoginUsersStore();

const instanceUrl = $route.params.instance;
const sessionId = $route.query.session;

if (typeof instanceUrl === 'string' && typeof sessionId === 'string') {
  const res = await $repositories('misskey').getAccessToken(
    instanceUrl,
    sessionId,
  );

  if (res?.ok) {
    add({
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
