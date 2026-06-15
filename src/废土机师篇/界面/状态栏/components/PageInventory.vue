<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const B = computed(() => store.data.基地);
const U = computed(() => store.data.多恩);

const inv = computed(() => B.value.物品栏 || {});
const invKeys = computed(() => Object.keys(inv.value));
const cargoWeight = computed(() => B.value.已用负重 || 0);
const userWeight = computed(() => U.value.已用负重 || 0);

// Collect ammo from mecha weapons
const mechaAmmo = computed(() => {
  const weapons = store.data.机甲.武器配置 || [];
  const ammo: Record<string, number> = {};
  for (const w of weapons) {
    if (w.武器 && w.备弹 > 0) {
      ammo[w.武器] = (ammo[w.武器] || 0) + w.备弹;
    }
  }
  return ammo;
});
const ammoKeys = computed(() => Object.keys(mechaAmmo.value));
</script>

<template>
  <div>
    <!-- Base Warehouse -->
    <div class="card">
      <div class="card-header">基地仓库 <span class="text-muted text-xs">负重 {{ cargoWeight }}kg</span></div>
      <div class="card-body">
        <template v-if="invKeys.length">
          <table class="inv-table">
            <tr><th>名称</th><th>品级</th><th>数量</th><th>重量</th><th>来源</th></tr>
            <tr v-for="k in invKeys" :key="k">
              <td>{{ k }}</td>
              <td><span :class="['inv-tier', 't' + ((inv[k].品级 || 'T1')[1] || '1')]">{{ inv[k].品级 }}</span></td>
              <td>{{ inv[k].数量 }}</td>
              <td>{{ (inv[k].单件重量 || 0) * (inv[k].数量 || 0) }}kg</td>
              <td class="text-muted text-xs">{{ inv[k].来源 }}</td>
            </tr>
          </table>
        </template>
        <div v-else class="empty">仓库为空</div>
      </div>
    </div>

    <!-- Ammo Stock -->
    <div class="card">
      <div class="card-header">机甲弹药库存</div>
      <div class="card-body">
        <template v-if="ammoKeys.length">
          <div v-for="k in ammoKeys" :key="k" class="row">
            <span>{{ k }}</span>
            <span class="row-val">{{ mechaAmmo[k] }} 发</span>
          </div>
        </template>
        <div v-else class="empty">无弹药数据</div>
      </div>
    </div>

    <!-- User Backpack Summary -->
    <div class="card">
      <div class="card-header">主角背包 <span class="text-muted text-xs">负重 {{ userWeight }}kg</span></div>
      <div class="card-body">
        <template v-if="Object.keys(U.背包 || {}).length">
          <table class="inv-table">
            <tr><th>名称</th><th>品级</th><th>数量</th><th>重量</th></tr>
            <tr v-for="(item, k) in U.背包" :key="k">
              <td>{{ k }}</td>
              <td><span :class="['inv-tier', 't' + ((item.品级 || 'T1')[1] || '1')]">{{ item.品级 }}</span></td>
              <td>{{ item.数量 }}</td>
              <td>{{ (item.单件重量 || 0) * (item.数量 || 0) }}kg</td>
            </tr>
          </table>
        </template>
        <div v-else class="empty">背包为空</div>
      </div>
    </div>
  </div>
</template>
