<template>
  <div>
    <p v-if="!authenticated">setting up...</p>
    <p v-else>Authenticated</p>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';

const router = useRouter();
const route = useRoute();
const loginUserStore = useLoginUserStore();

const localstorage = useLocalStorage<
  Record<string, { token_endpoint: string; code_verifier: string }>
>('misskey:oauth', {});

const authenticated = ref(false);

const { start: startRedirect } = useTimeoutFn(() => router.replace('/'), 3000, {
  immediate: false,
});

onMounted(async () => {
  const query = z
    .object({ code: z.string(), state: z.string(), iss: z.string() })
    .parse(route.query);

  const data = localstorage.value[query.state];
  if (!data) {
    console.error('invalid state');
    return;
  }

  const response = z.object({ access_token: z.string() }).parse(
    await $fetch(data.token_endpoint, {
      method: 'post',
      body: {
        client_id:
          'https://natalie.sasarafu.net/oauth/misskey-client-metadata.html',
        redirect_uri: 'https://natalie.sasarafu.net/oauth/callback/misskey',
        grant_type: 'authorization_code',
        scope: 'read:account',
        code: query.code,
        code_verifier: data.code_verifier,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );

  loginUserStore.add({
    type: 'misskey',
    baseUrl: query.iss,
    accessToken: response.access_token,
  });

  authenticated.value = true;
  startRedirect();
});
</script>
