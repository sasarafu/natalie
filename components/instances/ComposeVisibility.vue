<template>
  <details class="dropdown">
    <summary class="btn mb-1">
      <span class="material-symbols-outlined">
        {{ visibilityIcons[visibility as VisibilityType] }}
      </span>
    </summary>
    <ul class="dropdown-content menu z-[1] bg-base-100 rounded-box">
      <li v-for="(_, key) in visibilityIcons" :key="key">
        <button type="button" @click="$emit('select', key as VisibilityType)">
          <span class="material-symbols-outlined">
            {{ visibilityIcons[key] }}
          </span>
          {{ key }}
        </button>
      </li>
    </ul>
  </details>
</template>

<!-- TODO: なぜかgenericの型推論がtemplate内でおかしくなるため、いろいろ仮対応 -->
<script setup lang="ts" generic="VisibilityType extends string">
defineProps<{
  visibility: VisibilityType;
  visibilityIcons: { [key: string]: string };
}>();

defineEmits<{
  (e: 'select', value: VisibilityType): void;
}>();
</script>
