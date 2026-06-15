<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const S = computed(() => store.data.系统);
const FA = computed(() => store.data.势力态度 || {});
const factionKeys = computed(() => Object.keys(FA.value));
const NPC = computed(() => store.data.NPC名录 || {});
const npcKeys = computed(() => Object.keys(NPC.value));
const regions = computed(() => S.value.已发现区域 || []);
const achievements = computed(() => S.value.已解锁成就 || []);

function attitudeLabel(val: number): string {
  if (val >= 75) return '崇敬';
  if (val >= 50) return '友善';
  if (val >= 25) return '友好';
  if (val >= 0) return '中立';
  if (val >= -25) return '冷淡';
  if (val >= -50) return '敌意';
  if (val >= -75) return '仇视';
  return '死敌';
}

function attitudeCls(val: number): string {
  if (val >= 50) return 'ok';
  if (val >= 0) return 'text-muted';
  if (val >= -50) return 'warn';
  return 'danger';
}

function markerPos(val: number): string {
  // map -100..100 to 0%..100%
  return ((val + 100) / 200 * 100) + '%';
}
</script>

<template>
  <div>
    <!-- Discovered Regions -->
    <div class="card">
      <div class="card-header">已发现区域 <span class="text-muted text-xs">{{ regions.length }}</span></div>
      <div class="card-body">
        <template v-if="regions.length">
          <div style="display:flex; flex-wrap:wrap; gap:4px;">
            <span v-for="r in regions" :key="r" class="tag tag-outline">{{ r }}</span>
          </div>
        </template>
        <div v-else class="empty">尚未探索任何区域</div>
      </div>
    </div>

    <!-- Faction Attitudes -->
    <div class="card">
      <div class="card-header">势力态度</div>
      <div class="card-body">
        <template v-if="factionKeys.length">
          <div v-for="fk in factionKeys" :key="fk" style="margin-bottom:6px;">
            <div class="row">
              <span>{{ fk }}</span>
              <span class="row-val" :class="attitudeCls(FA[fk])">
                {{ FA[fk] > 0 ? '+' : '' }}{{ FA[fk] }} · {{ attitudeLabel(FA[fk]) }}
              </span>
            </div>
            <div class="faction-bar">
              <div class="faction-bar-marker" :style="{ left: markerPos(FA[fk]) }"></div>
            </div>
          </div>
        </template>
        <div v-else class="empty">无势力数据</div>
      </div>
    </div>

    <!-- NPC Directory -->
    <div class="card">
      <div class="card-header">NPC名录 <span class="text-muted text-xs">{{ npcKeys.length }}人</span></div>
      <div class="card-body">
        <template v-if="npcKeys.length">
          <div v-for="nk in npcKeys" :key="nk" class="npc-row">
            <div>
              <span class="npc-name">{{ nk }}</span>
              <span class="npc-faction" v-if="NPC[nk].所属势力"> · {{ NPC[nk].所属势力 }}</span>
            </div>
            <div>
              <span class="npc-location" v-if="NPC[nk].当前位置">{{ NPC[nk].当前位置 }}</span>
              <span class="tag tag-outline" style="margin-left:4px;" :class="NPC[nk].状态 === '活跃' ? '' : 'text-muted'">{{ NPC[nk].状态 }}</span>
            </div>
          </div>
        </template>
        <div v-else class="empty">无NPC数据</div>
      </div>
    </div>

    <!-- Achievements -->
    <div class="card">
      <div class="card-header">已解锁成就 <span class="text-muted text-xs">{{ achievements.length }}</span></div>
      <div class="card-body">
        <template v-if="achievements.length">
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            <div v-for="a in achievements" :key="a" class="achievement">
              ✦ {{ a }}
            </div>
          </div>
        </template>
        <div v-else class="empty">暂无成就</div>
      </div>
    </div>

    <!-- Mileage -->
    <div class="card">
      <div class="card-header">旅程统计</div>
      <div class="card-body">
        <div class="row"><span class="row-label">已行驶里程</span><span class="row-val">{{ S.已行驶里程 || 0 }} km</span></div>
      </div>
    </div>
  </div>
</template>
