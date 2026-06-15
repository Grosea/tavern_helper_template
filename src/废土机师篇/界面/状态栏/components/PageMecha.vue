<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const MG = computed(() => store.data.机甲);

const matLabel: Record<string, string> = {
  废铁: '废铁', 军标: '军标', 合金: '合金', 遗产: '遗产',
};

const legForm: Record<string, string> = {
  二足: '二足', 逆关节: '逆关节', 四足: '四足', 履带: '履带',
};
</script>

<template>
  <div v-if="!MG.名称" class="empty">未拥有机甲</div>

  <template v-else>
    <!-- Header -->
    <div class="card">
      <div class="card-header">机甲总览</div>
      <div class="card-body">
        <div class="row"><span class="row-label">名称</span><span class="row-val accent">{{ MG.名称 }}</span></div>
        <div class="row"><span class="row-label">同乘机娘</span><span class="row-val">{{ MG.同乘机娘 || '无' }}</span></div>
        <div class="row"><span class="row-label">击毁数</span><span class="row-val">{{ MG.击毁数 || 0 }}</span></div>
        <div v-if="MG.外观" class="row">
          <span class="row-label">外观</span>
          <span class="row-val text-sm">{{ MG.外观.substring(0, 50) }}{{ MG.外观.length > 50 ? '…' : '' }}</span>
        </div>
      </div>
    </div>

    <!-- 5 Parts -->
    <div class="card">
      <div class="card-header">部件详情</div>
      <div class="card-body">
        <!-- Core -->
        <div v-if="MG.核心?.材料" style="margin-bottom:8px; padding:6px; background:var(--c-bg-elevated); border-radius:4px;">
          <div class="row"><span class="row-label">核心</span><span class="row-val">{{ matLabel[MG.核心.材料] || MG.核心.材料 }} · 体{{ MG.核心.体积 }} · {{ MG.核心.自重 }}t · ⚡{{ MG.核心.电力 }}</span></div>
          <div v-if="MG.核心.描述" class="text-xs text-muted" style="margin-top:2px;">{{ MG.核心.描述 }}</div>
        </div>
        <!-- Right Arm -->
        <div v-if="MG.右臂?.材料" style="margin-bottom:8px; padding:6px; background:var(--c-bg-elevated); border-radius:4px;">
          <div class="row"><span class="row-label">右臂</span><span class="row-val">{{ matLabel[MG.右臂.材料] || MG.右臂.材料 }} · 体{{ MG.右臂.体积 }} · {{ MG.右臂.自重 }}t · 挂{{ MG.右臂.可挂武器 }}</span></div>
          <div v-if="MG.右臂.描述" class="text-xs text-muted" style="margin-top:2px;">{{ MG.右臂.描述 }}</div>
        </div>
        <!-- Left Arm -->
        <div v-if="MG.左臂?.材料" style="margin-bottom:8px; padding:6px; background:var(--c-bg-elevated); border-radius:4px;">
          <div class="row"><span class="row-label">左臂</span><span class="row-val">{{ matLabel[MG.左臂.材料] || MG.左臂.材料 }} · 体{{ MG.左臂.体积 }} · {{ MG.左臂.自重 }}t · 挂{{ MG.左臂.可挂武器 }}</span></div>
          <div v-if="MG.左臂.描述" class="text-xs text-muted" style="margin-top:2px;">{{ MG.左臂.描述 }}</div>
        </div>
        <!-- Legs -->
        <div v-if="MG.腿部?.材料" style="margin-bottom:8px; padding:6px; background:var(--c-bg-elevated); border-radius:4px;">
          <div class="row">
            <span class="row-label">腿部</span>
            <span class="row-val">
              {{ matLabel[MG.腿部.材料] || MG.腿部.材料 }} · {{ legForm[MG.腿部.形态] || MG.腿部.形态 }} · 体{{ MG.腿部.体积 }} · {{ MG.腿部.自重 }}t · 载{{ MG.腿部.载重 }}t
            </span>
          </div>
          <div v-if="MG.腿部.描述" class="text-xs text-muted" style="margin-top:2px;">{{ MG.腿部.描述 }}</div>
        </div>
        <!-- Head -->
        <div v-if="MG.头部?.材料" style="padding:6px; background:var(--c-bg-elevated); border-radius:4px;">
          <div class="row"><span class="row-label">头部</span><span class="row-val">{{ matLabel[MG.头部.材料] || MG.头部.材料 }} · 体{{ MG.头部.体积 }} · {{ MG.头部.自重 }}t · ⚡{{ MG.头部.电力消耗 }}</span></div>
          <div v-if="MG.头部.描述" class="text-xs text-muted" style="margin-top:2px;">{{ MG.头部.描述 }}</div>
        </div>
      </div>
    </div>

    <!-- Weapons -->
    <div class="card">
      <div class="card-header">武器配置</div>
      <div class="card-body">
        <template v-if="MG.武器配置?.length">
          <table class="inv-table">
            <tr><th>硬点</th><th>武器</th><th>弹种</th><th>备弹</th></tr>
            <tr v-for="(w, i) in MG.武器配置" :key="i">
              <td>{{ w.硬点 }}</td>
              <td>{{ w.武器 }}</td>
              <td>{{ w.弹种 }}</td>
              <td>{{ w.备弹 }}</td>
            </tr>
          </table>
        </template>
        <div v-else class="empty">无武器配置</div>
      </div>
    </div>
  </template>
</template>
