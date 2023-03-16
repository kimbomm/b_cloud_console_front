const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // 프로젝트
      { path: "/projects/", component: () => import("pages/projects/IndexPage.vue") },
      { path: "/projects/task", component: () => import("pages/projects/TaskPage.vue") },
      { path: "/projects/taskview", component: () => import("pages/projects/TaskViewPage.vue") },
      { path: "/projects/taskdetail", component: () => import("pages/projects/TaskDetailPage.vue") },
      { path: "/projects/taskgroup", component: () => import("pages/projects/TaskGroupPage.vue") },
      { path: "/projects/instance", component: () => import("pages/projects/InstancePage.vue") },
      { path: "/projects/instanceview", component: () => import("pages/projects/InstanceViewPage.vue") },
      { path: "/projects/instancedetail", component: () => import("pages/projects/InstanceDetailPage.vue") },
      // 스토리지
      { path: "/storage/", component: () => import("pages/storage/IndexPage.vue") },
      // 요금
      { path: "/billing/", component: () => import("pages/billing/IndexPage.vue") },
      { path: "/billing/billingdetail", component: () => import("pages/billing/BillingDetailPage.vue") },
      { path: "/billing/member", component: () => import("pages/billing/MemberPage.vue") },
      { path: "/billing/instance", component: () => import("pages/billing/InstancePage.vue") },
      { path: "/billing/storage", component: () => import("pages/billing/StoragePage.vue") },
      { path: "/billing/project", component: () => import("pages/billing/ProjectPage.vue") },
      // 관리
      { path: "/manage/", component: () => import("pages/manage/IndexPage.vue") },
      { path: "/manage/project", component: () => import("pages/manage/ProjectPage.vue") },
      { path: "/manage/instance", component: () => import("pages/manage/InstancePage.vue") },
      { path: "/manage/task", component: () => import("pages/manage/TaskPage.vue") },
      { path: "/manage/storage", component: () => import("pages/manage/StoragePage.vue") },
      { path: "/manage/member", component: () => import("pages/manage/MemberPage.vue") },
      // 고객지원
      { path: "/support/", component: () => import("pages/support/IndexPage.vue") },
      { path: "/support/write", component: () => import("pages/support/WritePage.vue") },
      { path: "/support/writeb", component: () => import("pages/support/WritebPage.vue") },
      { path: "/support/writec", component: () => import("pages/support/WritecPage.vue") },
      { path: "/support/writed", component: () => import("pages/support/WritedPage.vue") },
      { path: "/support/writee", component: () => import("pages/support/WriteePage.vue") },
      { path: "/support/questiondetail", component: () => import("pages/support/QuestionDetailPage.vue") },
      { path: "/support/questiondetailb", component: () => import("pages/support/QuestionDetailbPage.vue") },
      { path: "/support/questiondetailc", component: () => import("pages/support/QuestionDetailcPage.vue") },
      { path: "/support/questiondetaild", component: () => import("pages/support/QuestionDetaildPage.vue") },
      { path: "/support/survey", component: () => import("pages/support/SurveyPage.vue") },
      // 팝업
      { path: "/popup/", component: () => import("pages/popup/IndexPage.vue") },
      // 샘플
      { path: "/sample/table", component: () => import("pages/sample/TablePage2.vue") },
      { path: "/sample/temp", component: () => import("pages/sample/TempPage.vue") },
      { path: "/sample/api", component: () => import("pages/sample/AxiosPage.vue") },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      // 로그인
      { path: "/login", component: () => import("pages/login/IndexPage.vue") },
    ],
  },
  {
    path: "/common",
    component: () => import("layouts/SubLayout.vue"),
    children: [
      // 회원탈퇴
      { path: "/common/withdrawal", component: () => import("pages/common/WithdrawalPage.vue") },
    ],
  },
  {
    path: "/guide",
    component: () => import("layouts/GuideLayout.vue"),
    children: [
      { path: "", component: () => import("pages/guide/IndexPage.vue") },
      { path: "color", component: () => import("pages/guide/ColorPage.vue") },
      { path: "typo", component: () => import("pages/guide/TypoPage.vue") },
      { path: "icon", component: () => import("pages/guide/IconPage.vue") },
      { path: "button", component: () => import("pages/guide/ButtonPage.vue") },
      { path: "input", component: () => import("pages/guide/InputPage.vue") },
      { path: "checkbox", component: () => import("pages/guide/CheckBoxPage.vue") },
      { path: "radio", component: () => import("pages/guide/RadioPage.vue") },
      { path: "pagination", component: () => import("pages/guide/PaginationPage.vue") },
      { path: "segmented", component: () => import("pages/guide/SegmentedPage.vue") },
      { path: "table", component: () => import("pages/guide/Table2Page.vue") },
      { path: "dropdown", component: () => import("pages/guide/DropDwonPage.vue") },
      { path: "tabs", component: () => import("pages/guide/TabsPage.vue") },
      { path: "breadcrumb", component: () => import("pages/guide/BreadcrumbPage.vue") },
      { path: "popover", component: () => import("pages/guide/PopoverPage.vue") },
      { path: "popup", component: () => import("pages/guide/PopupPage.vue") },
      // { path: "toast", component: () => import("pages/guide/ToastPage.vue") },
      { path: "tooltip", component: () => import("pages/guide/TooltipPage.vue") },
      { path: "uploader", component: () => import("pages/guide/UploaderPage.vue") },
      { path: "notify", component: () => import("pages/guide/NotifyPage.vue") },
      { path: "carousel", component: () => import("pages/guide/CarouselPage.vue") },
      { path: "collapse", component: () => import("pages/guide/CollapsePage.vue") },
      { path: "banner", component: () => import("pages/guide/BannerPage.vue") },
      { path: "template", component: () => import("pages/guide/TemplatePage.vue") },
      { path: "chart", component: () => import("pages/guide/ChartPage.vue") },
    ],
  },

  /**
   * 개발 전용 라우터
   */
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/workspace", component: () => import("pages/workspace/IndexPage.vue") },
      // Dashboard
      { path: "/workspace/:workspaceId/projects", component: () => import("pages/IndexPage.vue") },
      // 프로젝트
      {
        path: "/workspace/:workspaceId/projects/:projectId",
        component: () => import("pages/workspace/projects/IndexPage.vue"),
        name: "ProjectList",
      },
      { path: "/projects/projectdetail", component: () => import("pages/workspace/projects/ProjectDetailPage.vue") },
      // 프로젝트 - 인스턴스 : 생성, 상세
      { path: "/workspace/:workspaceId/projects/:projectId/instance/create", component: () => import("pages/workspace/projects/InstanceDetailPage.vue") },
      { path: "/workspace/:workspaceId/projects/:projectId/instance/:instanceId", component: () => import("pages/workspace/projects/InstanceViewPage.vue") },
      // 프로젝트 - 테스크 : 생성, 상세, 그룹상세
      // TODO: 그룹상세 url
      { path: "/workspace/:workspaceId/projects/:projectId/task/create", component: () => import("pages/workspace/projects/TaskDetailPage.vue") },
      { path: "/workspace/:workspaceId/projects/:projectId/task/:taskId", component: () => import("pages/workspace/projects/TaskViewPage.vue") },
      { path: "/projects/taskgroup", component: () => import("pages/workspace/projects/TaskGroupPage.vue") },

      // 스토리지
      { path: "/workspace/:workspaceId/storage", component: () => import("pages/storage/IndexPage.vue") },
      // 이미지
      { path: "/workspace/:workspaceId/images", component: () => import("pages/workspace/images/IndexPage.vue") },
      // 멤버
      { path: "/workspace/:workspaceId/members/", component: () => import("pages/workspace/members/IndexPage.vue") },
      { path: "/workspace/:workspaceId/members/:memberId", component: () => import("pages/workspace/members/_MemberIdPage.vue") },
      // 요금
      { path: "/workspace/:workspaceId/billing", component: () => import("pages/billing/IndexPage.vue") },
      { path: "/workspace/:workspaceId/billing/:billingId", component: () => import("pages/billing/BillingDetailPage.vue") },
      // 내정보
      { path: "/workspace/:workspaceId/my", component: () => import("pages/workspace/my/IndexPage.vue") },
      // 관리
      { path: "/workspace/:workspaceId/manage/manage/project", component: () => import("pages/manage/ProjectPage.vue") },
      { path: "/manage/resource", component: () => import("pages/manage/InstancePage.vue") },
      { path: "/manage/storage", component: () => import("pages/manage/StoragePage.vue") },
      // 팝업
      { path: "/popup/", component: () => import("pages/popup/IndexPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  // sample page
  {
    path: "/sample",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/sample/popup", component: () => import("pages/sample/PopupPage.vue") },
      { path: "/sample/popup-collect", component: () => import("pages/sample/PopupCollectPage.vue") },
      { path: "/sample/notify", component: () => import("pages/sample/NotifyPage.vue") },
      { path: "/sample/input", component: () => import("pages/sample/InputPage.vue") }
    ]
  }
];

export default routes;
