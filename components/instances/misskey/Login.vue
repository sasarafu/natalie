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

    <div class="flex justify-end">
      <button
        type="submit"
        class="btn btn-primary btn-circle"
        :disabled="!selectedInstance"
        @click="login"
      >
        <span class="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'close'): void;
}>();

const selectedInstance = ref('');
const instanceInput = ref('');

const representativeInstances = ['misskey.io'] as const;

const login = () => {
  if (!selectedInstance.value) {
    return;
  }

  const config = useRuntimeConfig();

  // use miauth
  const sessionId = crypto.randomUUID();
  const url = new URL(
    `/miauth/${sessionId}`,
    `https://${selectedInstance.value}`,
  );
  const callbackBaseUrl = window.location.origin;

  url.searchParams.append('name', config.public.appName);
  url.searchParams.append(
    'callback',
    `${callbackBaseUrl}/callback/misskey/${selectedInstance.value}`,
  );
  // permission list: https://misskey-hub.net/docs/api/permission.html
  url.searchParams.append(
    'permission',
    'read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messaging,write:messaging,read:mutes,write:mutes,write:notes,read:notifications,write:notifications,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes,write:gallery-likes,read:gallery-likes',
  );
  navigateTo(url.toString(), { external: true });
  emits('close');
};
</script>
