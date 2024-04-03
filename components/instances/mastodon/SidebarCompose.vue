<template>
  <CommonSidebarComposeTextarea
    ref="textareaRef"
    v-model="message.text"
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
      :disabled="!isSubmitable"
      @click="submit"
    >
      <span class="material-symbols-outlined">arrow_forward</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { CommonSidebarComposeTextarea } from '#components';
import type { mastodon as Mastodon } from 'masto';
import type { IComposeMessage } from '~/models/common/composeMessage';
import type { ILoginUser } from '~/models/common/user';

const props = defineProps<{
  user: ILoginUser;
}>();

const textareaRef = ref<InstanceType<typeof CommonSidebarComposeTextarea>>();

const message = ref<IComposeMessage>({});
const submitting = ref<boolean>(false);

const isSubmitable = computed(() => !submitting.value && message.value.text);

const submit = async () => {
  if (!isSubmitable.value) return;

  submitting.value = true;

  try {
    await useApiClientsStore()
      .get<'mastodon'>(props.user)
      .api.v1.statuses.create({
        status: message.value.text!,
        visibility: visibility.value,
      });

    message.value = {};
  } catch (_) {}

  submitting.value = false;
};

const focus = () => textareaRef.value?.focus();
onActivated(focus);

defineExpose({
  focus,
  setMessage: (data: IComposeMessage) => {
    message.value = data;
  },
});

// visibility
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
</script>
