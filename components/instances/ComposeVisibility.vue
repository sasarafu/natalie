<template>
  <CommonPartsDetails class="dropdown">
    <summary class="btn mb-1">
      <span class="material-symbols-outlined">
        {{ visibilityIcons[visibility as VisibilityType] }}
      </span>
    </summary>
    <ul class="dropdown-content menu z-[1] bg-base-100 rounded-box">
      <li v-for="(_, key) in visibilityIcons" :key="key">
        <button
          type="button"
          :class="{ 'text-warning': key === visibility }"
          @click="select(key as VisibilityType)"
        >
          <span class="material-symbols-outlined">
            {{ visibilityIcons[key] }}
          </span>
          {{ key }}
        </button>
      </li>
    </ul>
  </CommonPartsDetails>
</template>

<!-- TODO: なぜかgenericの型推論がtemplate内でおかしくなるため、いろいろ仮対応 -->
<script setup lang="ts" generic="VisibilityType extends string">
defineProps<{
  visibility: VisibilityType;
  visibilityIcons: { [key: string]: string };
}>();

const emits = defineEmits<{
  (e: 'select', value: VisibilityType): void;
}>();

const select = (key: VisibilityType) => {
  emits('select', key);
  (document.activeElement as HTMLElement | null)?.blur();
};
</script>
