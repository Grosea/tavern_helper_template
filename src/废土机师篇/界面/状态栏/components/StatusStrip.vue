<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const S = computed(() => store.data.系统);
const B = computed(() => store.data.基地);

const maxRes = 200; // resource bar max

function pct(val: number) {
  return Math.min(100, Math.max(0, ((val || 0) / maxRes) * 100));
}

const phaseClass = computed(() => {
  const map: Record<string, string> = {
    探索: 'explore', 战斗: 'combat', 经营: 'manage', 交涉: 'negotiate', 修复: 'repair',
  };
  return map[S.value.当前阶段] || '';
});

const moveIcon = computed(() => {
  const map: Record<string, string> = { 驻留: '◎', 航程中: '▶', 全速航行: '⏩' };
  return map[S.value.移动状态] || '◎';
});

const crisisClass = computed(() => S.value.危机等级 >= 3 ? 'danger' : S.value.危机等级 >= 2 ? 'warn' : 'ok');
const disasterActive = computed(() => S.value.灾害预警 !== '无');
</script>

<template>
  <div class="strip">
    <!-- Fuel -->
    <div class="strip-item">
      <span class="strip-label">燃料</span>
      <div class="strip-bar">
        <div class="strip-bar-inner fuel" :style="{ width: pct(B.燃料) + '%' }"></div>
      </div>
      <span class="strip-val">{{ B.燃料 }}</span>
    </div>

    <!-- Parts -->
    <div class="strip-item">
      <span class="strip-label">零件</span>
      <div class="strip-bar">
        <div class="strip-bar-inner parts" :style="{ width: pct(B.零件) + '%' }"></div>
      </div>
      <span class="strip-val">{{ B.零件 }}</span>
    </div>

    <!-- Supply -->
    <div class="strip-item">
      <span class="strip-label">物资</span>
      <div class="strip-bar">
        <div class="strip-bar-inner supply" :style="{ width: pct(B.物资) + '%' }"></div>
      </div>
      <span class="strip-val">{{ B.物资 }}</span>
    </div>

    <!-- Armor -->
    <div class="strip-item">
      <span class="strip-label">装甲</span>
      <div class="strip-bar">
        <div class="strip-bar-inner armor" :style="{ width: pct(B.基地装甲) + '%' }"></div>
      </div>
      <span class="strip-val">{{ B.基地装甲 }}</span>
    </div>

    <div class="strip-sep"></div>

    <!-- Location -->
    <div class="strip-item">
      <span class="strip-label">位置</span>
      <span class="strip-val">{{ S.当前位置 }}</span>
      <span class="strip-move">{{ moveIcon }}</span>
    </div>

    <!-- Date/Time -->
    <div class="strip-item">
      <span class="strip-label">时间</span>
      <span class="strip-val">{{ S.日期 }} {{ S.时间 }}</span>
    </div>

    <!-- Phase -->
    <div class="strip-item">
      <span :class="['strip-phase', phaseClass]">{{ S.当前阶段 }}</span>
    </div>

    <!-- Crisis level (conditional) -->
    <div v-if="S.危机等级 > 0" class="strip-item" :class="{ 'strip-crisis': S.危机等级 >= 3 }">
      <span class="strip-label">危机</span>
      <span class="strip-val" :class="'row-val ' + crisisClass">Lv.{{ S.危机等级 }}</span>
    </div>

    <!-- Disaster warning (conditional) -->
    <div v-if="disasterActive" class="strip-item disaster-active">
      <span class="strip-label">⚠ 灾害</span>
      <span class="strip-val danger">{{ S.灾害预警 }}</span>
    </div>
  </div>
</template>
