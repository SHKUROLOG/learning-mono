import { CreateThemeInput, UpdateThemeInput } from '@learning-mono/shared'
import { defineRoute } from '../validate/validate'
import { createTheme, getThemeById, removeTheme, updateTheme } from './theme.service'

export const themeRoute = defineRoute('theme')

themeRoute.getById(getThemeById)

themeRoute.create(CreateThemeInput, createTheme)

themeRoute.update(UpdateThemeInput, updateTheme)

themeRoute.remove(removeTheme)
