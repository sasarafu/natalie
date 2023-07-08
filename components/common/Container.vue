<template>
  <div class="common-container overflow-x-hidden flex flex-col">
    <div class="common-container-header">
      <slot name="header" class="common-container-header"></slot>
    </div>

    <div class="common-container-body flex-auto overflow-y-auto">
      <slot></slot>
    </div>

    <div>
      <slot name="footer" class="common-container-footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.common-container-body::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.common-container-body::-webkit-scrollbar-thumb {
  border-radius: 4px;
}
</style>
