<template>
  <CommonPartsTextarea
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
import type { mastodon as Mastodon } from 'masto';
import type { ILoginUser } from '~/models/common/user';

const props = defineProps<{
  user: ILoginUser;
}>();

const message = ref<string>('');
const visibility = ref<Mastodon.v1.StatusVisibility>('private'); // TODO: preferences

const visibilityIcons = {
  public: 'public',
  unlisted: 'lock_open_right',
  private: 'lock',
  direct: 'alternate_email',
} as const satisfies Record<Mastodon.v1.StatusVisibility, string>;

const selectVisibility = (value: Mastodon.v1.StatusVisibility) => {
  visibility.value = value;
};

const submitting = ref<boolean>(false);

const submit = async () => {
  if (message.value.length === 0 || submitting.value) return;

  submitting.value = true;

  try {
    await useApiClientsStore()
      .get<'mastodon'>(props.user)
      .api.v1.statuses.create({
        status: message.value,
        visibility: visibility.value,
      });

    message.value = '';
  } catch (_) {}

  submitting.value = false;
};
</script>
