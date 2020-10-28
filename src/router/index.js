import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Registrar from '@/views/Registrar.vue'
import Imagenes from '@/views/imagenes.vue'
import Create from '@/views/create.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Registrarse',
    name: 'Registrar',
    component: Registrar
  },
  {
    path: '/Imagenes',
    name: 'Imagenes',
    component: Imagenes,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Imagenes/Create',
    name: 'Create',
    component: Create,
    meta: {
      requireAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  if(to.matched.some((record)=>record.meta.requireAuth)){
    const token = localStorage.getItem('token')
    if(!token)
    {
      next('/login')
    }
  }

  next()
})

export default router
