import { Router } from 'express'
import { authGuard } from '../auth/auth.guard'
import { createTheme, getAllThemes, getThemeById, removeTheme, updateTheme } from './theme.service'

export const themeRoute = Router()

themeRoute.get('/themes/:id?', async (req, res) => {
  // TODO VALIDATE REQ BODY
  if (req.params.id) {
    const theme = await getThemeById(parseInt(req.params.id))
    res.json(theme)
  } else {
    const themes = await getAllThemes()
    res.json(themes)
  }
})

themeRoute.post('/themes', async (req, res) => {
  // TODO VALIDATE REQ BODY
  const { title, categoryId } = req.body
  const theme = await createTheme(title, categoryId)
  res.json(theme)
})

themeRoute.put('/themes', async (req, res) => {
  // TODO VALIDATE REQ BODY
  const { title, categoryId } = req.body
  const updatedTheme = await updateTheme(title, categoryId)
  res.json(updatedTheme)
})

themeRoute.delete('/themes', async (req, res) => {
  // TODO VALIDATE REQ BODY
  const categoryId = req.body.data.id
  const removedTheme = await removeTheme(categoryId)
  res.json(removedTheme)
})
