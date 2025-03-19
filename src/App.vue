<template>
    <div id="app">
        <el-header>
            <h1>无人机飞手招聘平台</h1>
        </el-header>
        <el-main>
            <router-view />
        </el-main>
        <el-footer>
            &copy; 2025 无人机飞手招聘平台
        </el-footer>
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

el-header {
  background-color: #333;
  color: white;
  padding: 20px;
}

el-main {
  flex: 1;
  padding: 20px;
}

el-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
}
</style>