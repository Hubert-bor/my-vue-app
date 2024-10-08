import { createWebHistory, createRouter } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import("@/views/index.vue") },
    { path: '/traceList', name: 'traceBlock', component: () => import("@/components/TraceBlock.vue") },
    { path: '/traceDetails', name: 'traceDetails', component: () => import("@/components/TraceDetails.vue") },
  ]
})

export default router
