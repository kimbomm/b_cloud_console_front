const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/sample/table", component: () => import("pages/sample/TablePage.vue") },
    ],
  },
  {
    path: "/guide",
    component: () => import("layouts/GuideLayout.vue"),
    children: [
      { path: "", component: () => import("pages/guide/IndexPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
