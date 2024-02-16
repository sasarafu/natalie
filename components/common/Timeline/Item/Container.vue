<template>
  <article class="flex gap-x-2 mx-2 py-2">
    <div class="flex-none">
      <a href="#" tabindex="-1">
        <CommonPartsRoundedIcon
          :icon-url="user.iconUrl"
          class="w-9 h-9"
          @click="$emit('clickIcon')"
        />
      </a>
      <slot name="undericon" />
    </div>

    <div class="flex-auto min-w-0">
      <header class="flex gap-x-1 items-end">
        <a
          tabindex="-1"
          class="flex-auto truncate cursor-pointer"
          @click="$emit('clickIcon')"
        >
          <span class="font-semibold no-wrap">
            <slot name="displayName">
              {{ user.displayName }}
            </slot>
          </span>
          <small class="truncate shrink-[9999]">
            <slot name="username"> @{{ user.username }} </slot>
          </small>
        </a>
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

defineEmits<{
  (e: 'clickIcon'): void;
}>();
</script>
