<script setup lang="ts">
interface Tab {
  id: string;
  label: string;
}

const props = defineProps<{
  tabs: Tab[];
  modelValue: string;
  badges?: Record<string, number>;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

function select(id: string) {
  emit('update:modelValue', id);
}
</script>

<template>
  <nav class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="['tab', { active: modelValue === tab.id }]"
      @click="select(tab.id)"
    >
      {{ tab.label }}
      <span v-if="badges?.[tab.id]" class="tab-badge">{{ badges[tab.id] }}</span>
    </button>
  </nav>
</template>
