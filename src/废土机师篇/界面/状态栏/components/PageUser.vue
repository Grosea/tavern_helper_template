<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const U = computed(() => store.data.多恩);
const S = computed(() => store.data.系统);

const equip = computed(() => U.value.装备 || {});
const talents = computed(() => U.value.天赋 || []);
const bp = computed(() => U.value.背包 || {});
const bpKeys = computed(() => Object.keys(bp.value));
</script>

<template>
  <div>
    <!-- Stats + Equipment -->
    <div class="grid2">
      <div class="card">
        <div class="card-header">属性</div>
        <div class="card-body">
          <div class="row"><span class="row-label">武力</span><span class="row-val">{{ U.武力 }}</span></div>
          <div class="row"><span class="row-label">工程</span><span class="row-val">{{ U.工程 }}</span></div>
          <div class="row"><span class="row-label">感知</span><span class="row-val">{{ U.感知 }}</span></div>
          <div class="row"><span class="row-label">统御</span><span class="row-val">{{ U.统御 }}</span></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">装备</div>
        <div class="card-body">
          <div class="row"><span class="row-label">主武器</span><span class="row-val">{{ equip.主武器 || '无' }}</span></div>
          <div class="row"><span class="row-label">副武器</span><span class="row-val">{{ equip.副武器 || '无' }}</span></div>
          <div class="row"><span class="row-label">护甲</span><span class="row-val">{{ equip.护甲 || '无' }}</span></div>
          <div class="row"><span class="row-label">工具</span><span class="row-val">{{ equip.工具槽 || '无' }}</span></div>
        </div>
      </div>
    </div>

    <!-- Talents -->
    <div class="card">
      <div class="card-header">天赋</div>
      <div class="card-body">
        <template v-if="talents.length">
          <div v-for="t in talents" :key="t" class="row">
            <span>{{ t }}</span>
          </div>
        </template>
        <div v-else class="empty">暂无天赋</div>
      </div>
    </div>

    <!-- Backpack -->
    <div class="card">
      <div class="card-header">背包 <span class="text-muted text-xs">已用 {{ U.已用负重 }}kg</span></div>
      <div class="card-body">
        <template v-if="bpKeys.length">
          <table class="inv-table">
            <tr><th>名称</th><th>品级</th><th>数量</th><th>重量</th></tr>
            <tr v-for="k in bpKeys" :key="k">
              <td>{{ k }}</td>
              <td><span :class="['inv-tier', 't' + ((bp[k].品级 || 'T1')[1] || '1')]">{{ bp[k].品级 }}</span></td>
              <td>{{ bp[k].数量 }}</td>
              <td>{{ (bp[k].单件重量 || 0) * (bp[k].数量 || 0) }}kg</td>
            </tr>
          </table>
        </template>
        <div v-else class="empty">背包为空</div>
      </div>
    </div>
  </div>
</template>
