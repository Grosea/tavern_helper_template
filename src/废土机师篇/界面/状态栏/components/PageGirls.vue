<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const R = computed(() => store.data.机娘名册);
const girlKeys = computed(() => Object.keys(R.value));

const expandedGirl = ref<string | null>(null);

function toggle(name: string) {
  expandedGirl.value = expandedGirl.value === name ? null : name;
}

function affCls(stage: string) {
  const map: Record<string, string> = {
    初识: 'c-aff-1', 熟悉: 'c-aff-1', 信赖: 'c-aff-2',
    暧昧: 'c-aff-2', 恋人: 'c-aff-3', 深爱: 'c-aff-4', 灵魂伴侣: 'c-aff-4',
  };
  return map[stage] || 'c-aff-0';
}
</script>

<template>
  <div>
    <template v-if="girlKeys.length">
      <div v-for="name in girlKeys" :key="name">
        <div class="girl-card" @click="toggle(name)">
          <div class="girl-avatar">{{ (R[name].类型 || '?')[0] }}</div>
          <div class="girl-info">
            <div class="girl-name">{{ name }}</div>
            <div class="girl-type">{{ R[name].类型 }}
              <span v-if="R[name].副标签?.气质"> · {{ R[name].副标签?.气质 }}</span>
            </div>
          </div>
          <div class="girl-stats">
            <span>❤ {{ R[name].好感度 }}</span>
            <span>🛡 {{ R[name].装甲值 }}</span>
            <span :class="{ 'on-mission': R[name].出战 }">{{ R[name].出战 ? '⚔ 出战' : R[name].位置 }}</span>
          </div>
        </div>

        <!-- Expanded Detail -->
        <div v-if="expandedGirl === name" class="girl-detail">
          <div class="girl-detail-grid">
            <div>
              <div class="row"><span class="row-label">好感阶段</span><span class="row-val">{{ R[name].好感阶段 }}</span></div>
              <div class="row"><span class="row-label">好感度</span><span class="row-val">{{ R[name].好感度 }}</span></div>
              <div class="row"><span class="row-label">装甲值</span><span class="row-val">{{ R[name].装甲值 }}</span></div>
              <div class="row"><span class="row-label">零件耐久</span><span class="row-val">{{ R[name].零件耐久 }}</span></div>
              <div class="row"><span class="row-label">状态</span><span class="row-val">{{ R[name].状态 }}</span></div>
              <div class="row"><span class="row-label">位置</span><span class="row-val">{{ R[name].位置 }}</span></div>
            </div>
            <div>
              <div class="row"><span class="row-label">类型</span><span class="row-val">{{ R[name].类型 }}</span></div>
              <div v-if="R[name].副标签?.气质" class="row"><span class="row-label">气质</span><span class="row-val">{{ R[name].副标签.气质 }}</span></div>
              <div v-if="R[name].副标签?.社交" class="row"><span class="row-label">社交</span><span class="row-val">{{ R[name].副标签.社交 }}</span></div>
              <div v-if="R[name].副标签?.情感表达" class="row"><span class="row-label">情感表达</span><span class="row-val">{{ R[name].副标签.情感表达 }}</span></div>
              <div v-if="R[name].副标签?.价值观" class="row"><span class="row-label">价值观</span><span class="row-val">{{ R[name].副标签.价值观 }}</span></div>
              <div v-if="R[name].身形描述" class="row"><span class="row-label">身形</span><span class="row-val text-sm">{{ R[name].身形描述 }}</span></div>
            </div>
          </div>

          <!-- Equipment -->
          <div v-if="R[name].装备" style="margin-top:6px;">
            <div class="row"><span class="row-label">主武器</span><span class="row-val">{{ R[name].装备.主武器 || '无' }}</span></div>
            <div class="row"><span class="row-label">副武器</span><span class="row-val">{{ R[name].装备.副武器 || '无' }}</span></div>
            <div class="row"><span class="row-label">护甲</span><span class="row-val">{{ R[name].装备.护甲 || '无' }}</span></div>
            <div class="row"><span class="row-label">工具</span><span class="row-val">{{ R[name].装备.工具槽 || '无' }}</span></div>
          </div>

          <!-- Talents -->
          <div v-if="R[name].天赋?.length" style="margin-top:4px;">
            <span class="text-xs text-muted">天赋: </span>
            <span class="tag tag-outline" v-for="t in R[name].天赋" :key="t">{{ t }}</span>
          </div>

          <!-- XP / Intimacy -->
          <div v-if="R[name].XP?.length" style="margin-top:4px;">
            <span class="text-xs text-muted">XP: </span>
            <span class="tag tag-outline" v-for="x in R[name].XP" :key="x">{{ x }}</span>
          </div>

          <!-- Intimacy Events -->
          <div v-if="R[name].已触发亲密事件?.length" style="margin-top:4px;">
            <div class="text-xs text-muted" style="margin-bottom:2px;">已触发亲密事件 ({{ R[name].亲密次数 }}次)</div>
            <div class="text-xs text-muted" v-for="ev in R[name].已触发亲密事件" :key="ev" style="padding-left:8px;">· {{ ev }}</div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="empty">无机娘数据</div>
  </div>
</template>
