import { User } from '../store/user'
import { instance } from './axios'

export interface FormLogin {
  login: string
  password: string
}

export const auth = {
  async login(formLogin: FormLogin): Promise<User | null> {
    return await instance.post('/login', formLogin)
      .then(v => v.data.user)
  },

  async logout() {
    await instance.post('/logout')
  },

  async getMe(): Promise<User | null> {
    return await instance.get('/me')
      .then(v => v.data.user)
  },
}
