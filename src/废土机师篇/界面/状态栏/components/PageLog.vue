<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const S = computed(() => store.data.系统);
const FEL = computed(() => store.data.势力事件日志 || []);

const affairs = computed(() => S.value.近期事务 || []);
const quests = computed(() => S.value.任务列表 || {});
const questKeys = computed(() => Object.keys(quests.value));
</script>

<template>
  <div>
    <!-- Recent Affairs -->
    <div class="card">
      <div class="card-header">近期事务 <span class="text-muted text-xs">{{ affairs.length }}条</span></div>
      <div class="card-body">
        <template v-if="affairs.length">
          <div v-for="(a, i) in affairs" :key="i" class="event-log-item">
            {{ a }}
          </div>
        </template>
        <div v-else class="empty">暂无近期事务</div>
      </div>
    </div>

    <!-- Faction Event Log -->
    <div class="card">
      <div class="card-header">势力事件日志 <span class="text-muted text-xs">{{ FEL.length }}条</span></div>
      <div class="card-body">
        <template v-if="FEL.length">
          <div v-for="(ev, i) in FEL" :key="i" class="event-log-item">
            {{ ev }}
          </div>
        </template>
        <div v-else class="empty">无势力事件记录</div>
      </div>
    </div>

    <!-- Quest Board -->
    <div class="card">
      <div class="card-header">任务列表 <span class="text-muted text-xs">{{ questKeys.length }}</span></div>
      <div class="card-body">
        <template v-if="questKeys.length">
          <div v-for="qk in questKeys" :key="qk">
            <div :class="['quest', quests[qk].类型 === '主线' ? 'main' : '']">
              <div class="quest-title">{{ quests[qk].目标 }}</div>
              <div class="quest-meta">
                {{ quests[qk].类型 }}
                · <span :class="quests[qk].状态 === '已完成' ? 'ok' : quests[qk].状态 === '失败' ? 'danger' : 'warn'">{{ quests[qk].状态 }}</span>
                <span v-if="quests[qk].期限 !== '无'"> · 期限: {{ quests[qk].期限 }}</span>
                <span v-if="quests[qk].奖励"> · 奖励: {{ quests[qk].奖励 }}</span>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="empty">暂无任务</div>
      </div>
    </div>
  </div>
</template>
