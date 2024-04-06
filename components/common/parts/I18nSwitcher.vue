<template>
  <div class="flex gap-1 w-fit">
    <button
      v-for="lo in $i18n.locales"
      :key="lo.code"
      type="button"
      class="btn btn-primary text-lg"
      :class="{ 'btn-outline': lo.code !== locale, 'btn-sm': compact }"
      @click="setLocale(lo.code)"
    >
      {{ lo.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  compact?: boolean;
}>();

const { locale, setLocale } = useI18n();
</script>
