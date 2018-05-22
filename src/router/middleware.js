import VueCookie from 'vue-cookie'

export const interceptRouter = function (router) {
  // Authentication logic
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
    const SPAToken = VueCookie.get('token')
    if (!requiresAuth) {
      next()
    } else if (requiresAuth && (!SPAToken)) {
      next({ path: '/login' })
    }
    next()
  })
  router.afterEach(() => {

  })
}
