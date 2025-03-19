<template>
    <div>
        <h2 class="aaa">飞手列表</h2>
        <el-table :data="pilots">
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="type" label="飞手类型" />
            <el-table-column prop="experience" label="飞行经验" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const pilots = ref([
    { name: '张三', type: '航拍测绘', experience: '3年' },
    { name: '李四', type: '农业植保', experience: '2年' },
]);
</script>
<style scoped lang="scss">
.aaa{
}
</style>
