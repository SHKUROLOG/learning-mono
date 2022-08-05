import { RouteRecordRaw } from 'vue-router'
import CategoriesPage from '../views/CategoriesPage.vue'
import CategoryPage from '../views/CategoryPage.vue'
import ThemePage from '../views/ThemePage.vue'
import StatisticPage from '../views/StatisticPage.vue'
import AdminPage from '../views/AdminPage.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', component: CategoriesPage, name: 'home' },
  { path: '/categories/:categoryId', component: CategoryPage, props: true, name: 'category' },
  { path: '/themes/:themeId', component: ThemePage, props: true, name: 'theme' },
  { path: '/statistic', component: StatisticPage, name: 'statistic' },
  { path: '/admin', component: AdminPage, name: 'admin' },
]
