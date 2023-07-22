<template>
  <article class="flex gap-x-2 p-2">
    <div class="flex-none">
      <a href="#" tabindex="-1">
        <img :src="iconUrl" class="w-9 h-9 rounded-full" draggable="false" />
      </a>
    </div>
    <div class="flex-auto min-w-0">
      <header class="flex gap-x-1 items-end">
        <a href="#" tabindex="-1" class="flex-initial shrink-[9999] truncate">
          <span class="font-bold">{{ displayName }}</span>
        </a>
        <small class="flex-auto truncate">@{{ username }}</small>
        <small class="flex-none">
          {{ useRelativeTime(createdAt) }}
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
