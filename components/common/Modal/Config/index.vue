<template>
  <Teleport to="#modalIndex">
    <CommonModalBaseContainer
      title="settings"
      closable
      class="!w-[80dvw] !h-[80dvh]"
      @close="$emit('close')"
    >
      <div class="overflow-y-auto">
        <div>
          <h2 class="text-3xl font-bold mb-2">language</h2>

          <CommonPartsI18nSwitcher horizontal />
        </div>

        <div class="divider"></div>
        <div>
          <h2 class="text-3xl font-bold mb-2">notification</h2>

          <button
            type="button"
            class="btn btn-primary"
            :disabled="!notification?.isRequestable.value"
            @click="notification?.requestPermission()"
          >
            {{
              notification?.isRequestable.value
                ? 'enable notification'
                : 'configured'
            }}
          </button>
        </div>

        <div class="divider"></div>
        <div>
          <h2 class="text-3xl font-bold mb-2">danger zone</h2>

          <CommonPartsDetails class="dropdown">
            <summary class="btn btn-outline">
              <span class="material-symbols-outlined">warning</span>
              reset
            </summary>
            <div
              class="dropdown-content card card-compact bg-base-300 z-[1] p-2 w-64 mt-2"
            >
              <button type="button" class="btn btn-error" @click="reset">
                <span class="material-symbols-outlined">delete</span>
                reset all settings
              </button>
            </div>
          </CommonPartsDetails>
        </div>

        <div class="divider"></div>
        <div>
          <h2 class="text-3xl font-bold mb-2">version</h2>
          <p>
            {{
              `${runtimeConfig.public.appName}
              v${runtimeConfig.public.version}
              (${runtimeConfig.public.natalieEnv.substring(0, 4)})`
            }}
          </p>
        </div>
      </div>
    </CommonModalBaseContainer>
  </Teleport>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'close'): void;
}>();

// const { config } = storeToRefs(useConfigStore());
const notification = useNotification();
const runtimeConfig = useRuntimeConfig();

const reset = () => {
  useLoginUsersStore().removeAll();
  useTimelinesStore().removeAll();
  useConfigStore().reset();
};
</script>
