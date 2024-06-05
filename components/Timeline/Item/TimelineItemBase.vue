<template>
  <article class="flex gap-x-2 mx-2 py-2">
    <div class="flex-none">
      <a href="#" tabindex="-1">
        <CommonRoundedIcon :icon-url="user.iconUrl" class="w-9 h-9" />
      </a>
      <slot name="undericon" />
    </div>

    <div class="flex-auto min-w-0">
      <header class="flex gap-x-1 items-end">
        <a href="#" tabindex="-1" class="flex-initial truncate">
          <span class="font-semibold no-wrap">
            <slot name="displayName">
              {{ user.displayName }}
            </slot>
          </span>
        </a>
        <small class="flex-auto truncate shrink-[9999]">
          <slot name="username"> @{{ user.username }} </slot>
        </small>
        <small :key="useNow()" class="flex-none">
          {{ calcRelativeTime(createdAt) }}
        </small>
      </header>

      <slot />

      <footer>
        <slot name="footer" />
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { IUser } from '~/models/common/user';

defineProps<{
  user: IUser;
  createdAt: Date;
}>();
</script>
