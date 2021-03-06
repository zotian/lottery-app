import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../components/views/Login-Register/Login.vue")
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../components/views/Login-Register/Register.vue")
    },
    {
      path: "/",
      component: () => import("../components/views/Main.vue"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("../components/views/Home/Home.vue")
        },
        {
          path: "/live-draw",
          name: "LiveDraw",
          component: () => import("../components/views/Live-Draw/LiveDraw.vue")
        },
        {
          path: "/history",
          name: "History",
          component: () => import("../components/views/History/History.vue")
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  let isAuth = !!localStorage.getItem("loginData");
  let appSession;
  try {
    appSession = JSON.parse(localStorage.getItem("loginData"));
  } catch (e) {
    isAuth = false;
  }
  if (isAuth) {
    if (!appSession.idToken) {
      isAuth = false;
      localStorage.removeItem("loginData");
    }
  }
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !isAuth) {
    next({
      path: "/login"
    });
  } else {
    next();
  }
});

export default router;
