const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/sample/table', component: () => import('pages/sample/TablePage.vue') },
    ],
  },
  {
    path: '/guide',
    component: () => import('layouts/GuideLayout.vue'),
    children: [
      { path: '', component: () => import('pages/guide/IndexPage.vue') },
      { path: 'color', component: () => import('pages/guide/ColorPage.vue') },
      { path: 'typo', component: () => import('pages/guide/TypoPage.vue') },
      { path: 'icon', component: () => import('pages/guide/IconPage.vue') },
      { path: 'button', component: () => import('pages/guide/ButtonPage.vue') },
      { path: 'input', component: () => import('pages/guide/InputPage.vue') },
      { path: 'checkbox', component: () => import('pages/guide/CheckBoxPage.vue') },
      { path: 'radio', component: () => import('pages/guide/RadioPage.vue') },
      { path: 'pagination', component: () => import('pages/guide/PaginationPage.vue') },
      { path: 'segmented', component: () => import('pages/guide/SegmentedPage.vue') },
      { path: 'table', component: () => import('pages/guide/TablePage.vue') },
      { path: 'dropdown', component: () => import('pages/guide/DropDwonPage.vue') },
      { path: 'tabs', component: () => import('pages/guide/TabsPage.vue') },
      { path: 'breadcrumb', component: () => import('pages/guide/BreadcrumbPage.vue') },
      { path: 'popover', component: () => import('pages/guide/PopoverPage.vue') },
      { path: 'popup', component: () => import('pages/guide/PopupPage.vue') },
      { path: 'toast', component: () => import('pages/guide/ToastPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
