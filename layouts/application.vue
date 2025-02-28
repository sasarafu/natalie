<template>
  <div class="flex h-dvh w-dvw gap-2">
    <Sidebar class="flex-none" />
    <main class="grow overflow-x-auto flex h-full gap-1">
      <Timeline v-for="i in [1, 2, 3, 4, 5]" :key="i" />
      <slot />
    </main>
  </div>
</template>
