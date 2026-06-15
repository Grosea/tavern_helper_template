<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const B = computed(() => store.data.基地);
const MG = computed(() => store.data.机甲);

const tierLabel = computed(() => {
  const map: Record<string, string> = {
    'T1机动避难所': 'T1', 'T2小型基地': 'T2', 'T3中型基地': 'T3',
    'T4大型基地': 'T4', 'T5终极堡垒': 'T5',
  };
  return map[B.value.底盘等级] || B.value.底盘等级 || '?';
});

const facilities = computed(() => B.value.模块 || {});
const facKeys = computed(() => Object.keys(facilities.value));
const engines = computed(() => B.value.引擎 || []);
</script>

<template>
  <div>
    <!-- Resources + Chassis -->
    <div class="grid2">
      <div class="card">
        <div class="card-header">资源</div>
        <div class="card-body">
          <div class="row"><span class="row-label">燃料</span><span class="row-val fuel-c">{{ B.燃料 }}</span></div>
          <div class="row"><span class="row-label">零件</span><span class="row-val parts-c">{{ B.零件 }}</span></div>
          <div class="row"><span class="row-label">物资</span><span class="row-val supply-c">{{ B.物资 }}</span></div>
          <div class="row"><span class="row-label">基地装甲</span><span class="row-val armor-c">{{ B.基地装甲 }}</span></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">底盘</div>
        <div class="card-body">
          <div class="row"><span class="row-label">等级</span><span class="row-val">{{ tierLabel }} ({{ B.底盘等级 }})</span></div>
          <div class="row"><span class="row-label">空间</span><span class="row-val">{{ B.已用空间 }} / {{ B.总空间 }}</span></div>
          <div class="row" v-if="B.外观"><span class="row-label">外观</span><span class="row-val text-sm">{{ B.外观.substring(0, 40) }}{{ B.外观.length > 40 ? '…' : '' }}</span></div>
          <div class="row" v-if="B.内饰"><span class="row-label">内饰</span><span class="row-val text-sm">{{ B.内饰.substring(0, 40) }}{{ B.内饰.length > 40 ? '…' : '' }}</span></div>
        </div>
      </div>
    </div>

    <!-- Facilities -->
    <div class="card">
      <div class="card-header">设施</div>
      <div class="card-body">
        <template v-if="facKeys.length">
          <div v-for="k in facKeys" :key="k" class="row">
            <span>{{ k }}</span>
            <span class="row-val">
              {{ facilities[k].等级 }} · {{ facilities[k].空间 }}空间
              <span :class="facilities[k].状态 === '正常' ? 'ok' : 'warn'">[{{ facilities[k].状态 }}]</span>
            </span>
          </div>
        </template>
        <div v-else class="empty">无设施数据</div>
      </div>
    </div>

    <!-- Engines -->
    <div v-if="engines.length" class="card">
      <div class="card-header">引擎</div>
      <div class="card-body">
        <div v-for="(eng, i) in engines" :key="i" class="row">
          <span>{{ eng.名称 }}</span>
          <span class="row-val">{{ eng.等级 }}</span>
        </div>
      </div>
    </div>

    <!-- Mecha Summary -->
    <div class="card">
      <div class="card-header">机甲</div>
      <div class="card-body">
        <template v-if="MG.名称">
          <div class="row"><span class="row-label">名称</span><span class="row-val">{{ MG.名称 }}</span></div>
          <div class="row"><span class="row-label">同乘</span><span class="row-val">{{ MG.同乘机娘 || '无' }}</span></div>
          <div class="row"><span class="row-label">击毁数</span><span class="row-val">{{ MG.击毁数 || 0 }}</span></div>
          <div v-if="MG.武器配置?.length" class="row">
            <span class="row-label">武器</span>
            <span class="row-val text-sm">{{ MG.武器配置.map((w: any) => w.武器).join(', ') }}</span>
          </div>
        </template>
        <div v-else class="empty">未拥有机甲</div>
      </div>
    </div>
  </div>
</template>
