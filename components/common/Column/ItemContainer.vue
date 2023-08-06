<template>
  <article class="flex gap-x-2 p-2 pt-3">
    <div class="flex-none">
      <a href="#" tabindex="-1">
        <CommonPartsRoundedIcon :icon-url="iconUrl" class="w-9 h-9" />
      </a>
      <slot name="undericon" />
    </div>
    <div class="flex-auto min-w-0">
      <header class="flex gap-x-1 items-end">
        <a href="#" tabindex="-1" class="flex-initial shrink-[9999] truncate">
          <span class="font-semibold">{{ displayName }}</span>
        </a>
        <small class="flex-auto truncate">@{{ username }}</small>
        <small class="flex-none">
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
defineProps<{
  iconUrl: string;
  displayName: string;
  username: string;
  createdAt: Date;
}>();
</script>
