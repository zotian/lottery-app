import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/login'  
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import("../views/Login.vue")
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import("../views/Register.vue")
    },
    {
      path: '/',
      component: () => import("../views/Main.vue"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("../views/Home.vue")
        },
        {
          path: "/live-draw",
          name: "LiveDraw",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/LiveDraw.vue")
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // if (to.name === 'Home') {
  //   next({
  //     path: '/login'
  //   })
  // }
  next()
})

export default router;
