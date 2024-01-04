<template>
  <CommonPartsContainer class="w-[80dvw] h-[80dvh] p-4">
    <template #header>
      <slot header-name="settings" />
      <div class="divider mt-2 mb-0"></div>
    </template>

    <div class="overflow-y-scroll pt-4">
    <div>
      <div class="form-control">
        <label class="label justify-normal gap-2 cursor-pointer">
          <input type="checkbox" class="checkbox" />
          <span class="label-text">some settings</span>
        </label>
      </div>
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
  </CommonPartsContainer>
</template>

<script setup lang="ts">
// const { config } = storeToRefs(useConfigStore());
const runtimeConfig = useRuntimeConfig();

const reset = () => {
  useLoginUsersStore().loginUsers = {};
  useTimelinesStore().timelines = [];
  useConfigStore().config = {
    sidebar: {
      isExpanded: true,
    },
  };
};
</script>
