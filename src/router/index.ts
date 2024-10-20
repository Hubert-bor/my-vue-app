import { createWebHistory, createRouter } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import("@/views/index.vue") },
    { path: '/traceList', name: 'traceBlock', component: () => import("@/components/TraceBlock.vue") },
    { path: '/traceDetails', name: 'traceDetails', component: () => import("@/components/TraceDetails.vue") },
    { path: '/jaegerTraceList', name: 'jaegerTraceList', component: () => import("@/jaeger/index.vue") },
    { path: '/tracePage', name: 'TracePage', component: () => import("@/jaeger/TracePage/index.vue") },
  ]
})

export default router
