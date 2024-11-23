import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

router.beforeEach(async (to, from, next) => {
  const { accessToken } = useUserStore();
  if (to.meta.requiresAuth && !accessToken) {
    next("/login");
  } else {
    if ((to.path === "/login" || to.path === "/register") && accessToken) {
      next("/");
    }
    next();
  }
});

export default router;
