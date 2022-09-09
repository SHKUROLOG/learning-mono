import { CategoryDto, CreateCategoryInput, UpdateCategoryInput } from '@learning-mono/shared'
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
    return instance.get(`/category/${categoryId}`)
      .then(v => v.data)
  },

  async create(createCategoryInput: CreateCategoryInput): Promise<CategoryDto> {
    return instance.post('/category', createCategoryInput)
      .then(v => v.data)
  },

  async update(updateCategoryInput: UpdateCategoryInput): Promise<CategoryDto> {
    return instance.put('/category', updateCategoryInput)
      .then(v => v.data)
  },

  async remove(categoryId: number): Promise<CategoryDto> {
    return instance.delete(`/category/${categoryId}`)
      .then(v => v.data)
  },
}
