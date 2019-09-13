import Vue from 'vue';
import Router from 'vue-router';
import AuthGuard from './auth-guard';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Dashboard from '@/views/home/Dashboard';
import Projects from '@/views/home/Projects';
import Team from '@/views/home/Team';
import Users from '@/views/home/Users';
import CreateUser from '@/views/user/CreateUser';
import UpdateUser from '@/views/user/UpdateUser';
import NotFound from '@/views/404';

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // },
  routes: [
    {
      path: '/',
      name: 'root',
      component: Login,
      beforeEnter: AuthGuard,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: AuthGuard,
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      component: Home,
      beforeEnter: AuthGuard,
      children:[
        {
          path: 'dashboard',
          component: Dashboard,
          name: 'home.dashboard',
          beforeEnter: AuthGuard,
          // a meta field
          meta: { requiresAuth: true }
        },
        {
          path: 'projects',
          component: Projects,
          name: 'home.projects',
          beforeEnter: AuthGuard,
          // a meta field
          meta: { requiresAuth: true }
        },
        {
          path: 'team',
          component: Team,
          name: 'home.team',
          beforeEnter: AuthGuard,
          // a meta field
          meta: { requiresAuth: true }
        },
        {
          path: 'users',
          component: Users,
          name: 'home.users',
          beforeEnter: AuthGuard,
          // a meta field
          meta: { requiresAuth: true }
        },
        {
          path: 'users/add',
          component: CreateUser,
          name: 'home.newUser',
          beforeEnter: AuthGuard,
          // a meta field
          meta: { requiresAuth: true }
        },
        {
          path: 'users/:id',
          component: UpdateUser,
          name: 'home.updateUser',
          beforeEnter: AuthGuard,
          // a meta field
          meta: { requiresAuth: true }
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      name: 'error404',
      component: NotFound,
      beforeEnter: AuthGuard,
      meta: { requiresAuth: false }
    }
  ]
})

/*
* security
*/
router.beforeEach((to, from, next) => {
  if(to && (to.fullPath === '/home' || to.fullPath === '/home/')) {
    next({name:'home.dashboard'});
    return;
  }
  //default behaviour
  next();
});


// router.beforeResolve((to, from, next) => {
  
//   if(to.name) {
//     document.title = to.name;
//   }

//   next();
// });

// router.afterEach((to, from) => {
//   if(to.name) {
//     document.title = to.name;
//   }
// });

export default router;