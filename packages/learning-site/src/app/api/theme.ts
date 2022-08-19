import { Theme } from '@learning-mono/shared'
import { instance } from './axios'

export interface ThemeInput {
  title: string
  themeId?: number
  categoryId?: number
}

export const theme = {
  async getById(themeId: string): Promise<Theme> {
    return await instance.get(`/themes/${themeId}`)
      .then(v => v.data)
  },

  async create(themeInput: ThemeInput) {
    return await instance.post('/themes', themeInput)
      .then(v => v.data)
  },

  async update(themeInput: ThemeInput) {
    return await instance.put('/themes', themeInput)
      .then(v => v.data)
  },

  async remove(themeId: number) {
    return await instance.delete(`/themes/${themeId}`)
  },
}
