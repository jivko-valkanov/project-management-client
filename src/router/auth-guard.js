import store from '@/store/';

const guard = (to, from, next) => {
  //check if authenticated by jwt from store or localstorage
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['user/checkIsLogin']) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next();
    }
  } else {
    next();
  }
  //next()
};

export default guard;