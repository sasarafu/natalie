<template>
  <SidebarComposeTextarea
    ref="textareaRef"
    v-model="message.text"
    :readonly="submitting"
    @submit="submit"
  />

  <div class="flex gap-2">
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
import type { SidebarComposeTextarea } from '#components';
import type { IComposeMessage } from '~/models/common/composeMessage';
import type { ILoginUser } from '~/models/common/user';

const props = defineProps<{
  user: ILoginUser;
}>();

const textareaRef = ref<InstanceType<typeof SidebarComposeTextarea>>();

const message = ref<IComposeMessage>({});
const submitting = ref<boolean>(false);

const isSubmitable = computed(() => !submitting.value && message.value.text);

const submit = async () => {
  if (!isSubmitable.value) return;

  submitting.value = true;

  try {
    await useApiClientsStore()
      .get<'bluesky'>(props.user)
      .post({ text: message.value.text });

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
</script>
