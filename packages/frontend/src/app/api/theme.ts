import { CreateThemeInput, ThemeDto, UpdateThemeInput } from '@learning-mono/shared'
import { instance } from './axios'

export const theme = {
  async getById(themeId: string): Promise<ThemeDto> {
    return await instance.get(`/theme/${themeId}`)
      .then(v => v.data)
  },

  async create(createThemeInput: CreateThemeInput): Promise<ThemeDto> {
    return await instance.post('/theme', createThemeInput)
      .then(v => v.data)
  },

  async update(updateThemeInput: UpdateThemeInput): Promise<ThemeDto> {
    return await instance.put('/theme', updateThemeInput)
      .then(v => v.data)
  },

  async remove(themeId: number): Promise<ThemeDto> {
    return await instance.delete(`/theme/${themeId}`)
      .then(v => v.data)
  },
}
