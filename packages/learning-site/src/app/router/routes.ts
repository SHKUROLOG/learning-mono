import { RouteRecordRaw } from 'vue-router'
import CategoriesPage from '../views/CategoriesPage.vue'
import CategoryPage from '../views/CategoryPage.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/categories', component: CategoriesPage, name: 'categories' },
  { path: '/categories/:id', component: CategoryPage, props: true, name: 'category' },
]
