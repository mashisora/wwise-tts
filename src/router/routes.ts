const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/speech",
    name: "speech",
    component: () => import("../views/Speech.vue"),
  },
  {
    path: "/settings",
    children: [
      {
        path: "azure",
        name: "settings-azure",
        component: () => import("../views/settings/AzureSettings.vue"),
      },
      {
        path: "wwise",
        name: "settings-wwise",
        component: () => import("../views/settings/WwiseSettings.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
];

export default routes;
