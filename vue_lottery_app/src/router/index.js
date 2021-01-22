import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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
      path: '/sign-up',
      name: 'SignUp',
      component: () => import("../views/SignUp.vue")
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
          component: Home
        },
        {
          path: "/live-draw",
          name: "LiveDraw",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/LiveDraw.vue")
        },
        {
          path: "/sign-up",
          name: "LiveDraw",
          component: () => import("../views/LiveDraw.vue")
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (to.name === 'Home') {
    next({
      path: '/login'
    })
  }
  next()
})

export default router;
