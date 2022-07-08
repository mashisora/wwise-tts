import { createRouter, createWebHashHistory } from "vue-router";
// import Home from '../views/Home.vue'
// import Settings from '../views/Settngs.vue'
import HelloWorld from "../views/HelloWorld.vue";
import Home from "../views/Home.vue";
import Settings from "../views/Settings.vue";

import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
