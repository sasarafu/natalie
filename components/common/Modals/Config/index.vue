<template>
  <div class="w-[80dvw] h-[80dvh] p-4">
    <slot header-name="settings" />

    <div>
      <div class="form-control">
        <label class="label justify-normal gap-2 cursor-pointer">
          <input type="checkbox" class="checkbox" />
          <span class="label-text">some settings</span>
        </label>
      </div>
    </div>

    <div class="divider"></div>
    <div class="overflow-y-auto">
      <div>
        <h2 class="text-xl mb-4">danger zone</h2>

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
        {{
          `${runtimeConfig.public.appName}
          v${runtimeConfig.public.version}
          (${runtimeConfig.public.natalieEnv.substring(0, 4)})`
        }}
      </div>
    </div>
  </div>
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
