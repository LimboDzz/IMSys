import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/admin/Admin'
import Repo from '@/components/repo/Repo'
import Stu from '@/components/repo/Stu'
import Teacher from '@/components/repo/Teacher'
import Cart from '@/components/cart/Cart'
import Grading from '@/components/cart/Grading'
import Signup from '@/components/signup/Signup'
// import Login from '@/components/login/Login'
import loginStu from '@/components/login/loginStu'
import loginTeacher from '@/components/login/loginTeacher'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',                    // root
      redirect: '/repo'
    },
    {                               // repo
      path: '/repo',
      component: Repo
    },
    {                               // repo
      path: '/stu',
      component: Stu
    },
       {                               // repo
      path: '/teacher',
      component: Teacher
    },
    {                               // admin
      path: '/admin',
      component: Admin
    },
    {                               // cart
      path: '/cart',
      component: Cart
    },
        {                               // cart
      path: '/Grading',
      component: Grading
    },
    {                               // signup
      path: '/signup',
      component: Signup
    },
    // {                               // signup
    //   path: '/login',
    //   component: Login
    // },
    {
      path: '/loginStu',
      component: loginStu
    },
    {
      path: '/loginTeacher',
      component: loginTeacher
    },
    {
      path: '/c',
      redirect: '/cart'
    }
  ]
})
