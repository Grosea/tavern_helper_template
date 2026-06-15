<script setup lang="ts">
import { useDataStore } from './store';
import StatusStrip from './components/StatusStrip.vue';
import CombatOverlay from './components/CombatOverlay.vue';
import TabBar from './components/TabBar.vue';
import PageOverview from './components/PageOverview.vue';
import PageUser from './components/PageUser.vue';
import PageBase from './components/PageBase.vue';
import PageMecha from './components/PageMecha.vue';
import PageGirls from './components/PageGirls.vue';
import PageInventory from './components/PageInventory.vue';
import PageWorld from './components/PageWorld.vue';
import PageLog from './components/PageLog.vue';

const store = useDataStore();

const tabs = [
  { id: 'home', label: '总览' },
  { id: 'user', label: '主角' },
  { id: 'base', label: '基地' },
  { id: 'mecha', label: '机甲' },
  { id: 'girls', label: '机娘' },
  { id: 'inventory', label: '仓库' },
  { id: 'world', label: '世界' },
  { id: 'log', label: '日志' },
];

const activeTab = ref('home');

// Combat visibility check
const showCombat = computed(() => {
  const phase = store.data.系统.当前阶段;
  const combat = store.data.当前战斗;
  return phase === '战斗' && !!combat.距离;
});

// Girl count badge
const girlCount = computed(() => Object.keys(store.data.机娘名册).length);
</script>

<template>
  <div class="status-bar">
    <StatusStrip />
    <CombatOverlay v-if="showCombat" />
    <TabBar v-model="activeTab" :tabs="tabs" :badges="{ girls: girlCount }" />

    <div class="content">
      <PageOverview  v-show="activeTab === 'home'"      :class="{ active: activeTab === 'home' }" class="page" />
      <PageUser      v-show="activeTab === 'user'"      :class="{ active: activeTab === 'user' }" class="page" />
      <PageBase      v-show="activeTab === 'base'"      :class="{ active: activeTab === 'base' }" class="page" />
      <PageMecha     v-show="activeTab === 'mecha'"     :class="{ active: activeTab === 'mecha' }" class="page" />
      <PageGirls     v-show="activeTab === 'girls'"     :class="{ active: activeTab === 'girls' }" class="page" />
      <PageInventory v-show="activeTab === 'inventory'" :class="{ active: activeTab === 'inventory' }" class="page" />
      <PageWorld     v-show="activeTab === 'world'"     :class="{ active: activeTab === 'world' }" class="page" />
      <PageLog       v-show="activeTab === 'log'"       :class="{ active: activeTab === 'log' }" class="page" />
    </div>
  </div>
</template>
