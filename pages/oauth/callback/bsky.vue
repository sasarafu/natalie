<template>
  <div>
    <p v-if="!authenticated">setting up...</p>
    <p v-else>Authenticated</p>
  </div>
</template>

<script setup lang="ts">
import { repositoryBsky } from '~/repositories/bsky/repositoryBsky';

const router = useRouter();
const loginUserStore = useLoginUserStore();

const authenticated = ref(false);

const { start: startRedirect } = useTimeoutFn(() => router.replace('/'), 3000, {
  immediate: false,
});

onMounted(async () => {
  const client = repositoryBsky.createSession();
  const result = await client.init();

  if (!result) {
    console.error('bsky signin setup error');
    return;
  }

  if (
    !loginUserStore.loginUsers.value.find(
      (user) => user.type === 'bsky' && user.accessToken === result.session.did,
    )
  ) {
    loginUserStore.add({
      type: 'bsky',
      baseUrl: result.session.server.issuer,
      accessToken: result.session.did,
    });
  }

  authenticated.value = true;
  startRedirect();
});
</script>
