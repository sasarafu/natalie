<template>
  <section
    v-if="activeComposeUser"
    v-show="config.sidebar.isExpanded"
    class="flex flex-col gap-y-3 w-64 p-2 bg-neutral max-sm:h-64 max-sm:w-full"
  >
    <CommonPartsUserSelector
      v-model="activeComposeUser"
      :users="orderedLoginUsers"
    />

    <KeepAlive>
      <component
        :is="composeComponents[activeComposeUser.instance.type]"
        ref="composeComponentRef"
        :user="activeComposeUser"
      />
    </KeepAlive>
  </section>
</template>

<script setup lang="ts">
import {
  BlueskySidebarCompose,
  MastodonSidebarCompose,
  MisskeySidebarCompose,
} from '#components';
import type { ILoginUser } from '~/models/common/user';
import type { ValueOf } from '~/types/ValueOf';

const composeComponents = {
  bluesky: BlueskySidebarCompose,
  mastodon: MastodonSidebarCompose,
  misskey: MisskeySidebarCompose,
};

type IComposeComponent = InstanceType<ValueOf<typeof composeComponents>>;
const composeComponentRef = ref<IComposeComponent>();

const { config } = storeToRefs(useConfigStore());
const { orderedLoginUsers, loginUsers } = storeToRefs(useLoginUsersStore());

const activeComposeUser = ref<ILoginUser>(orderedLoginUsers.value[0]);

// composeUserの切り替えやフォーカスの処理
const { switchComposeData } = useCompose();
watch(switchComposeData, (composeData) => {
  if (!composeData) {
    return;
  }
  if (composeData.data) {
    activeComposeUser.value = loginUsers.value[composeData.data.userId];

    // activeComposeUserを切り替えた後、Refが切り替わるまで待つ
    nextTick(() => {
      if (composeData.data) {
        composeComponentRef.value?.setMessage(composeData.data.message);
      }
      composeComponentRef.value?.focus();
      useCompose().clear();
    });
  } else {
    composeComponentRef.value?.focus();
    useCompose().clear();
  }
});
</script>
