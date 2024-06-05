<template>
  <div class="h-full flex flex-col justify-center p-1">
    <CommonDetails class="dropdown dropdown-left">
      <summary class="btn btn-ghost btn-square btn-xs">
        <span class="material-symbols-outlined text-base">add</span>
      </summary>
      <div
        class="menu dropdown-content bg-base-300 rounded-box border border-primary w-80 mr-1"
      >
        <div class="w-full">
          <label class="label">
            <span class="label-text-alt">タイムライン名</span>
          </label>
          <input v-model="timelineName" class="input input-sm w-full" />
        </div>

        <div class="divider" />

        <CommonUserSelector
          v-model="activeLoginUser"
          :users="orderedLoginUsers"
        />

        <div class="divider" />

        <div class="flex w-full flex-wrap gap-1">
          <button
            v-for="timelineType in activeTimelineTypes"
            :key="timelineType"
            type="button"
            class="btn btn-sm"
            :class="
              activeTimelineType === timelineType
                ? 'btn-primary'
                : 'btn-outline border-primary'
            "
            @click="activeTimelineType = timelineType"
          >
            {{ timelineType }}
          </button>
        </div>

        <button type="button" class="btn btn-primary mt-4" @click="addTimeline">
          add
        </button>
      </div>
    </CommonDetails>
  </div>
</template>

<script setup lang="ts">
import type { ILoginUser } from '~/models/common/user';
import type { ITimelineType } from '~/models/instances/instanceType';
import { timelineTypes } from '~/models/instances/instanceType';

const timelinesStore = useTimelinesStore();
const { orderedLoginUsers } = storeToRefs(useLoginUsersStore());

const timelineName = ref('timeline');

const activeLoginUser = ref<ILoginUser>(orderedLoginUsers.value[0]);

const activeTimelineTypes = computed(
  () => timelineTypes[activeLoginUser.value.instance.type],
);
const activeTimelineType = ref<ITimelineType>(activeTimelineTypes.value[0]);

const addTimeline = () => {
  timelinesStore.add({
    id: crypto.randomUUID(),
    name: timelineName.value,
    notify: false,
    query: {
      user: activeLoginUser.value.id,
      type: activeTimelineType.value,
    },
  });
  (document.activeElement as HTMLElement | null)?.blur();
};
</script>

<style scoped>
.dropdown > .dropdown-content {
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
}
</style>
