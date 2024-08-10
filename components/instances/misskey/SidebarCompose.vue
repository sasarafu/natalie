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
import type * as Misskey from 'misskey-js';
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
      .get<'misskey'>(props.user)
      .api.request('notes/create', {
        text: message.value.text,
        visibility: visibility.value,
      });

    message.value = {};
  } catch {}

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
</script>
