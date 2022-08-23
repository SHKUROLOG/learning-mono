import { createTheme, getThemeById, removeTheme, updateTheme } from './theme.service'
import { defineRoute } from '../validate/validate'
import { CreateThemeInput, UpdateThemeInput } from '@learning-mono/shared'

export const themeRoute = defineRoute('theme')

themeRoute.getById(async (req, res) => {
  const themeById = await getThemeById(parseInt(req.params.id))
  res.json(themeById)
})

themeRoute.create(CreateThemeInput, async (req, res) => {
  const createdTheme = await createTheme(req.body)
  res.json(createdTheme)
})

themeRoute.update(UpdateThemeInput, async (req, res) => {
  const updatedTheme = await updateTheme(req.body)
  res.json(updatedTheme)
})

themeRoute.remove(async (req, res) => {
  const removedTheme = await removeTheme(parseInt(req.params.id))
  res.json(removedTheme)
})

// export const themeRoute = Router()

// themeRoute.get('/themes/:id?', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   if (req.params.id) {
//     const theme = await getThemeById(parseInt(req.params.id))
//     res.json(theme)
//   } else {
//     const themes = await getAllThemes()
//     res.json(themes)
//   }
// })
//
// themeRoute.post('/themes', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const { title, categoryId } = req.body
//   const theme = await createTheme(title, categoryId)
//   res.json(theme)
// })
//
// themeRoute.put('/themes', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const { title, categoryId } = req.body
//   const updatedTheme = await updateTheme(title, categoryId)
//   res.json(updatedTheme)
// })
//
// themeRoute.delete('/themes', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const categoryId = req.body.data.id
//   const removedTheme = await removeTheme(categoryId)
//   res.json(removedTheme)
// })
