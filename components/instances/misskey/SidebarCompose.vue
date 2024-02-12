<template>
  <CommonSidebarComposeTextarea
    v-model="message"
    :readonly="submitting"
    @submit="submit"
  />

  <div class="flex gap-2">
    <ComposeVisibility
      :visibility="visibility"
      :visibility-icons="visibilityIcons"
      @select="selectVisibility"
    />

    <button
      type="button"
      class="btn btn-primary btn-circle ml-auto"
      :disabled="submitting || message.length === 0"
      @click="submit"
    >
      <span class="material-symbols-outlined">arrow_forward</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type * as Misskey from 'misskey-js';
import type { ILoginUser } from '~/models/common/user';

const props = defineProps<{
  user: ILoginUser;
}>();

const message = ref<string>('');
const visibility = ref<Misskey.entities.Note['visibility']>('followers'); // TODO: preference

const visibilityIcons = {
  public: 'public',
  home: 'home',
  followers: 'lock',
  specified: 'alternate_email',
} as const satisfies Record<Misskey.entities.Note['visibility'], string>;

const selectVisibility = (value: Misskey.entities.Note['visibility']) => {
  visibility.value = value;
};

const submitting = ref<boolean>(false);

const submit = async () => {
  if (message.value.length === 0 || submitting.value) return;

  submitting.value = true;

  try {
    await useApiClientsStore()
      .get<'misskey'>(props.user)
      .api.request('notes/create', {
        text: message.value,
        visibility: visibility.value,
      });

    message.value = '';
  } catch (_) {}

  submitting.value = false;
};
</script>
