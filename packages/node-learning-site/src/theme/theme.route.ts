import { Router } from 'express'
import { getAllThemes, getThemeById } from './theme.service'

export const themeRoute = Router()

themeRoute.get('/themes/:id?', async (req, res) => {
  if (req.params.id) {
    const theme = await getThemeById(parseInt(req.params.id))
    res.json(theme)
  } else {
    const themes = await getAllThemes()
    res.json(themes)
  }
})
