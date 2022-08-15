import { ref } from 'vue'
import { api } from '../api'

export interface User {
  id: string
  login: string
  isAdmin: boolean
}

export const isLoginFormShown = ref(false)

export const isUserLoading = ref(false)

export const user = ref<User | null>(null)

export async function userStoreInit(): Promise<void> {
  try {
    isUserLoading.value = true
    user.value = await api.getMe()
  } finally {
    isUserLoading.value = false
  }
}
