import { CategoryDto } from '@learning-mono/shared'
import { instance } from './axios'

export interface CategoryInput {
  title: string
  image?: string
  categoryId?: number
}

export const category = {
  async getAll(): Promise<CategoryDto[]> {
    return instance.get('/categories')
      .then(v => v.data)
  },

  async getById(categoryId: string): Promise<CategoryDto> {
    return instance.get(`/categories/${categoryId}`)
      .then(v => v.data)
  },

  async create(categoryInput: CategoryInput): Promise<CategoryDto> {
    return instance.post('/categories', categoryInput)
      .then(v => v.data)
  },

  async update(categoryInput: CategoryInput): Promise<CategoryDto> {
    return instance.put('/categories', categoryInput)
      .then(v => v.data)
  },

  async remove(categoryId: number) {
    return instance.delete(`/categories/${categoryId}`)
  },
}
