<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const S = computed(() => store.data.系统);
const B = computed(() => store.data.基地);
const CB = computed(() => store.data.当前战斗);
const R = computed(() => store.data.机娘名册);

const crisisText = computed(() => {
  const map = ['无', '环境暗示', '雷达信号+资源紧张', '可见威胁', '立即撤离'];
  return map[S.value.危机等级] || '--';
});

const crisisCls = computed(() =>
  S.value.危机等级 >= 3 ? 'danger' : S.value.危机等级 >= 2 ? 'warn' : 'ok'
);

const tierLabel = computed(() => {
  const map: Record<string, string> = {
    'T1机动避难所': 'T1', 'T2小型基地': 'T2', 'T3中型基地': 'T3',
    'T4大型基地': 'T4', 'T5终极堡垒': 'T5',
  };
  return map[B.value.底盘等级] || B.value.底盘等级 || '?';
});

const sortieGirls = computed(() => {
  return Object.entries(R.value).filter(([, g]) => g.出战);
});

function r(label: string, val: any, cls?: string) {
  return { label, val, cls };
}
</script>

<template>
  <div>
    <!-- Env + Base -->
    <div class="grid2">
      <div class="card">
        <div class="card-header">环境</div>
        <div class="card-body">
          <div class="row"><span class="row-label">天气</span><span class="row-val">{{ S.当前天气 }}</span></div>
          <div class="row"><span class="row-label">外温</span><span class="row-val">{{ S.当前温度 }}°C</span></div>
          <div class="row"><span class="row-label">舱温</span><span class="row-val">{{ S.舱内温度 }}°C</span></div>
          <div class="row"><span class="row-label">季节</span><span class="row-val">{{ S.季节 }}</span></div>
          <div class="row" v-if="S.灾害预警 !== '无'">
            <span class="row-label">⚠ 灾害</span>
            <span class="row-val danger">{{ S.灾害预警 }}</span>
          </div>
          <div class="row">
            <span class="row-label">危机</span>
            <span class="row-val" :class="crisisCls">{{ crisisText }}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">基地</div>
        <div class="card-body">
          <div class="row"><span class="row-label">等级</span><span class="row-val">{{ tierLabel }}</span></div>
          <div class="row"><span class="row-label">空间</span><span class="row-val">{{ B.已用空间 }}/{{ B.总空间 }}</span></div>
          <div class="row"><span class="row-label">移动</span><span class="row-val">{{ S.移动状态 }}</span></div>
          <div class="row"><span class="row-label">里程</span><span class="row-val">{{ S.已行驶里程 }}km</span></div>
          <div class="row"><span class="row-label">位置</span><span class="row-val">{{ S.当前位置 }}</span></div>
          <div class="row"><span class="row-label">危机计数</span><span class="row-val">{{ S.危机计数器 }}</span></div>
        </div>
      </div>
    </div>

    <!-- Sortie Girls -->
    <div class="card">
      <div class="card-header">出战机娘</div>
      <div class="card-body">
        <template v-if="sortieGirls.length">
          <div v-for="[name, g] in sortieGirls" :key="name" class="girl-card">
            <div class="girl-avatar">{{ (g.类型 || '?')[0] }}</div>
            <div class="girl-info">
              <div class="girl-name">{{ name }}</div>
              <div class="girl-type">{{ g.类型 }} · {{ g.好感阶段 }}</div>
            </div>
            <div class="girl-stats">
              <span class="girl-stat on-mission">出战</span>
              <span>🛡{{ g.装甲值 }}</span>
              <span>❤{{ g.好感度 }}</span>
            </div>
          </div>
        </template>
        <div v-else class="empty">无出战机娘</div>
      </div>
    </div>

    <!-- Combat (conditional) -->
    <div v-if="S.当前阶段 === '战斗' && CB.距离" class="card">
      <div class="card-header" style="color:var(--c-combat)">当前战斗</div>
      <div class="card-body">
        <div class="row"><span class="row-label">距离</span><span class="row-val">{{ CB.距离 }}</span></div>
        <div class="row"><span class="row-label">敌方类型</span><span class="row-val">{{ CB.敌方类型 }}</span></div>
        <div class="row" v-if="CB.敌方规模"><span class="row-label">规模</span><span class="row-val">{{ CB.敌方规模 }}</span></div>
        <div class="row" v-if="CB.敌方状态"><span class="row-label">敌方状态</span><span class="row-val">{{ CB.敌方状态 }}</span></div>
        <div class="row"><span class="row-label">预警</span><span class="row-val">{{ CB.遭遇预警 }}</span></div>
      </div>
    </div>
  </div>
</template>
