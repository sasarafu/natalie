<template>
  <div class="w-[80dvw] h-[80dvh] overflow-hidden-x">
    <template v-if="pending">
      <span class="loading loading-spinner loading-lg"></span>
    </template>

    <template v-else-if="error || !data">
      <div>取得失敗</div>
    </template>

    <template v-else>
      <header
        class="flex items-center gap-2 h-32 p-2 rounded"
        :class="
          data.profile.banner
            ? `bg-[url(${data.profile.banner})]`
            : 'bg-gray-800'
        "
      >
        <CommonPartsRoundedIcon
          v-if="data.profile.avatar"
          :icon-url="data.profile.avatar"
          class="w-20"
        />
        <div class="flex flex-col">
          <p class="text-3xl">{{ data.profile.displayName }}</p>
          <p>@{{ data.profile.handle }}</p>
        </div>
      </header>

      <div class="p-2">
        <BlueskyColumnItem
          v-for="item in data.recentPosts.feed"
          :key="item.post.cid"
          :item="
            blueskyConverter.postToMessage(item, data.recentPosts.cursor, via)
          "
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ILoginUser, IUser } from '~/models/common/user';

const props = defineProps<{
  userid: IUser['userid'];
  via: ILoginUser;
}>();

const { data, error, pending } = useAsyncData(async () => {
  const apiClient = useApiClientsStore().get<'bluesky'>(props.via);

  const profile = await apiClient.getProfile({ actor: props.userid });
  const recentPosts = await apiClient.getAuthorFeed({ actor: props.userid });

  return {
    profile: profile.data,
    recentPosts: recentPosts.data,
  };
});

// const data = computed(() => ({
//   profile: userProfile?.value?.data!,
// }));
// const error = computed(() => userProfileError.value && !data.value.profile);
// const pending = computed(() => userProfilePending.value);
</script>
