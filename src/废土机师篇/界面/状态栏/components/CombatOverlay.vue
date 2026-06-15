<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const CB = computed(() => store.data.当前战斗);
</script>

<template>
  <div class="combat-overlay">
    <span class="combat-overlay-label">⚔ 战斗中</span>
    <div class="combat-overlay-item">
      <span class="combat-overlay-key">距离</span>
      <span class="combat-overlay-val">{{ CB.距离 }}</span>
    </div>
    <div class="combat-overlay-item">
      <span class="combat-overlay-key">敌方</span>
      <span class="combat-overlay-val">{{ CB.敌方类型 }}</span>
    </div>
    <div class="combat-overlay-item" v-if="CB.敌方规模">
      <span class="combat-overlay-key">规模</span>
      <span class="combat-overlay-val">{{ CB.敌方规模 }}</span>
    </div>
    <div class="combat-overlay-item" v-if="CB.敌方状态">
      <span class="combat-overlay-key">状态</span>
      <span class="combat-overlay-val">{{ CB.敌方状态 }}</span>
    </div>
    <div class="combat-overlay-item">
      <span class="combat-overlay-key">预警</span>
      <span class="combat-overlay-val">{{ CB.遭遇预警 }}</span>
    </div>
  </div>
</template>
