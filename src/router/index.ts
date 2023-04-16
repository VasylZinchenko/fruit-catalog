import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/fruits",
  },
  {
    path: "/fruits",
    name: "fruits",
    component: () => import("/@/pages/FruitsList.vue"),
  },
  {
    path: "/fruits/:id/:name",
    name: "detail.show",
    component: () => import("/@/pages/FruitDetail.vue"),
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () => import("/@/pages/FavoriteList.vue"),
  },
  {
    path: "/compare",
    name: "compare",
    component: () => import("/@/pages/CompareList.vue"),
  },
];

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});
