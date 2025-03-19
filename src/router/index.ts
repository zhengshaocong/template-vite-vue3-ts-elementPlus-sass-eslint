import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'; // 修正类型导入方式
import PilotList from '@/views/PilotList.vue';
import RecruitmentInfo from '@/views/RecruitmentInfo.vue';
import { useTitle } from '@vueuse/core' // 新增导入

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'PilotList',
    component: PilotList,
    meta: { title: '飞行员列表' } // 新增元数据
  },
  {
    path: '/recruitment',
    name: 'RecruitmentInfo',
    component: RecruitmentInfo,
    meta: { title: '招聘信息' } // 新增元数据
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 新增全局导航守卫设置标题
router.beforeEach((to) => {
    const title = useTitle()
    title.value = to.meta.title as string || '默认标题' // 使用 VueUse 的 useTitle
  })

export default router;   