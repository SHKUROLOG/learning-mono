import { ref } from 'vue'

export interface User {
  id: string
  login: string
  isAdmin: boolean
}

export const isUserLoading = ref(false)

export const user = ref<User | null>(null)

export async function userStoreInit(): Promise<void> {
  try {
    isUserLoading.value = true
    const res = await fetch('http://localhost:3030/me', {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    }).then((v) => v.json())
    user.value = res.user
  } finally {
    isUserLoading.value = false
  }
}
