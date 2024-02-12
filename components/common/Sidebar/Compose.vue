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

    <component
      :is="composeComponents[activeComposeUser.instance.type]"
      :user="activeComposeUser"
    />
  </section>
</template>

<script setup lang="ts">
const composeComponents = {
  bluesky: resolveComponent('BlueskySidebarCompose'),
  mastodon: resolveComponent('MastodonSidebarCompose'),
  misskey: resolveComponent('MisskeySidebarCompose'),
};

const { config } = storeToRefs(useConfigStore());
const { orderedLoginUsers } = storeToRefs(useLoginUsersStore());

const { activeComposeUser } = useCompose();
activeComposeUser.value = orderedLoginUsers.value[0];
</script>
