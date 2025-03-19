<template>
    <div>
        <h2>发布招聘信息</h2>
        <el-form :model="recruitmentForm" label-width="120px">
            <el-form-item label="公司名称">
                <el-input v-model="recruitmentForm.companyName" />
            </el-form-item>
            <el-form-item label="飞手类型">
                <el-input v-model="recruitmentForm.pilotType" />
            </el-form-item>
            <el-form-item label="职位要求">
                <el-input v-model="recruitmentForm.jobRequirements" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const recruitmentForm = ref({
    companyName: '',
    pilotType: '',
    jobRequirements: '',
});

const submitForm = () => {
    console.log('发布的招聘信息：', recruitmentForm.value);
    // 这里可以添加实际的提交逻辑，如发送请求到后端
};
</script>