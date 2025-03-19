<template>
    <el-card class="pilot-card">
      <template #header>
        <div class="card-header">
          <h3>{{ pilot.name }}</h3>
          <el-tag :type="typeColorMap[pilot.type]">
            {{ typeLabelMap[pilot.type] }}
          </el-tag>
        </div>
      </template>
  
      <div class="card-content">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="info-item">
              <el-icon><location /></el-icon>
              {{ pilot.location }}
            </div>
            <div class="info-item">
              <el-icon><timer /></el-icon>
              {{ pilot.experience }}年经验
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <el-icon><trophy /></el-icon>
              {{ pilot.certifications.join(', ') }}
            </div>
          </el-col>
        </el-row>
  
        <el-divider />
  
        <div class="equipment">
          <h4>设备清单</h4>
          <el-tag
            v-for="(item, index) in pilot.equipment"
            :key="index"
            type="info"
            class="equipment-tag"
          >
            {{ item }}
          </el-tag>
        </div>
      </div>
    </el-card>
  </template>
  
  <script setup lang="ts">
  import { Location, Timer, Trophy } from '@element-plus/icons-vue'
  
  defineProps<{
    pilot: Pilot
  }>()
  
  const typeLabelMap = {
    'aerial-photography': '航拍摄影',
    agriculture: '农业植保',
    surveying: '测绘勘探',
    racing: '竞速飞行'
  }
  
  const typeColorMap = {
    'aerial-photography': 'primary',
    agriculture: 'success',
    surveying: 'warning',
    racing: 'danger'
  }
  </script>