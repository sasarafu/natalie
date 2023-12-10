<template>
  <details
    ref="details"
    tabindex="-1"
    class="w-fit bg-red"
    @focusout="focusout"
  >
    <slot />
  </details>
</template>

<script setup lang="ts">
const details = ref<HTMLDetailsElement>();

// descendantがancestor以下のツリーに含まれるかを判定
const isDescendant = (
  ancestor: HTMLElement,
  descendant: HTMLElement,
): boolean =>
  ancestor === descendant ||
  (descendant.parentElement &&
    isDescendant(ancestor, descendant.parentElement)) ||
  false;

// focusoutした際に、選択先がdetails以下でなければdetailsを閉じる
// tabindex="-1" でdetails内ならrelatedTargetが常に設定されるはず
const focusout = (e: FocusEvent) => {
  const relatedTarget = e.relatedTarget as HTMLElement | null;

  if (!details.value) {
    return;
  }
  if (!relatedTarget || !isDescendant(details.value, relatedTarget)) {
    details.value.open = false;
  }
};
</script>
