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

const composeComponents = {
  bluesky: BlueskySidebarCompose,
  mastodon: MastodonSidebarCompose,
  misskey: MisskeySidebarCompose,
};

const { config } = storeToRefs(useConfigStore());
const { orderedLoginUsers } = storeToRefs(useLoginUsersStore());

const activeComposeUser = ref<ILoginUser>(orderedLoginUsers.value[0]);
</script>
