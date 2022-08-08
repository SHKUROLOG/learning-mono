// await api.login({ login, password })
// await api.logout()
// await api.me()

import { User } from '@app/store/user'
import { Category, Theme } from '@app/types'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

interface FormLogin {
  login: string
  password: string
}

export const api = {
  async login(formLogin: FormLogin): Promise<User | null> {
    return await instance.post('/login', formLogin).then(v => v.data.user)
  },

  async logout() {
    await instance.post('/logout')
  },

  async getMe(): Promise<User | null> {
    return await instance.get('/me').then(v => v.data.user)
  },

  async getCategories(): Promise<Category[]> {
    return await instance.get('/categories').then(v => v.data)
  },

  async getCategory(categoryId: string): Promise<Category> {
    return await instance.get(`/categories/${categoryId}`).then(v => v.data)
  },

  async getTheme(themeId: string): Promise<Theme> {
    return await instance.get(`/themes/${themeId}`).then(v => v.data)
  },
}
