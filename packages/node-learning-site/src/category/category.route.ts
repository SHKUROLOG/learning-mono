import { Router } from 'express'
import { getAllCategories, getCategoryById } from './category.service'

export const categoryRoute = Router()

categoryRoute.get('/categories/:id?', async (req, res) => {
  if (req.params.id) {
    const category = await getCategoryById(parseInt(req.params.id))
    res.json(category)
  } else {
    const categories = await getAllCategories()
    res.json(categories)
  }
})
