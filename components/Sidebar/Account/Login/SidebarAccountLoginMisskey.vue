<template>
  <form @submit.prevent="submit">
    <div class="flex gap-2">
      <fieldset class="fieldset w-full">
        <input
          v-model="instanceUrl"
          type="text"
          class="input input-primary input-bordered w-full"
          placeholder="userid"
        />
        <p class="label">e.g. example.bsky.social</p>
      </fieldset>
      <button class="btn btn-circle btn-primary p-2" :disabled="disabled">
        <span v-if="submitting" class="loading loading-spinner loading-sm" />
        <PaperAirplaneIcon v-else class="size-full" />
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import pkceChallenge from 'pkce-challenge';
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline';
import { z } from 'zod';

const localstorage = useLocalStorage<
  Record<string, { token_endpoint: string; code_verifier: string }>
>('misskey:oauth', {});

const instanceUrl = ref('');
const submitting = ref(false);

const disabled = computed(() => !instanceUrl.value || submitting.value);

const submit = async () => {
  if (submitting.value) {
    return;
  }
  submitting.value = true;

  try {
    const challenges = await pkceChallenge();
    const state = crypto.randomUUID();

    const serverMetadata = z
      .object({
        authorization_endpoint: z.string().url(),
        token_endpoint: z.string().url(),
      })
      .parse(
        await $fetch(
          `https://${instanceUrl.value}/.well-known/oauth-authorization-server`,
        ),
      );

    localstorage.value = {
      ...localstorage.value,
      [state]: {
        token_endpoint: serverMetadata.token_endpoint,
        code_verifier: challenges.code_verifier,
      },
    };

    const url = new URL(serverMetadata.authorization_endpoint);
    url.search = new URLSearchParams({
      client_id:
        'https://natalie.sasarafu.net/oauth/misskey-client-metadata.html',
      redirect_uri: 'https://natalie.sasarafu.net/oauth/callback/misskey',
      response_type: 'code',
      code_challenge: challenges.code_challenge,
      code_challenge_method: 'S256',
      scope: 'read:account',
      state: state,
    }).toString();

    navigateTo(url.toString(), { external: true });
  } catch (e) {
    console.error(e);
  } finally {
    submitting.value = false;
  }
};
</script>
