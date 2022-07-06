import { createRouter, createWebHistory } from "vue-router";
// import Home from '../views/Home.vue'
// import Settings from '../views/Settngs.vue'
import HelloWorld from "../views/HelloWorld.vue";
import Home from "../views/Home.vue";
import Settings from "../views/Settings.vue";

import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
