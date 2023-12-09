<template>
  <CommonPartsTextarea
    v-model="message"
    :readonly="submitting"
    @submit="submit"
  />
  <button
    type="button"
    class="btn btn-primary"
    :disabled="submitting || message.length === 0"
    @click="submit"
  >
    submit
  </button>

  <ComposeVisibility
    :visibility="visibility"
    :visibility-icons="visibilityIcons"
    @select="selectVisibility"
  />
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
