<template>
  <div class="flex flex-col gap-y-2 pb-2">
    <div>
      <label class="label">
        <span class="label-text-alt">タイムライン名</span>
      </label>
      <input
        v-model="timelineName"
        class="input input-sm w-full"
        @change="changeTimelineName"
      />
    </div>
    <div class="flex gap-1">
      <button
        type="button"
        class="btn btn-square btn-sm"
        @click="changeNotification"
      >
        <span class="material-symbols-outlined">
          {{ timeline.notify ? 'notifications' : 'notifications_off' }}
        </span>
      </button>

      <button
        class="btn btn-square btn-sm btn-outline btn-error ml-auto"
        @click="removeTimeline"
      >
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITimeline } from '~/models/common/timeline';

const props = defineProps<{
  timeline: ITimeline;
}>();

const timelinesStore = useTimelinesStore();
const { timelines } = storeToRefs(timelinesStore);
const target = computed(
  () => timelines.value.find((timeline) => timeline.id === props.timeline.id)!,
);

const timelineName = ref('');

const changeTimelineName = () => {
  target.value.name = timelineName.value;
};

const changeNotification = () => {
  target.value.notify = !target.value.notify;
};

const removeTimeline = () => {
  timelinesStore.remove(props.timeline.id);
};

onMounted(() => {
  timelineName.value = props.timeline.name;
});
</script>
