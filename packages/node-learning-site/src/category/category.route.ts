import { Router } from 'express'
import { authGuard } from '../auth/auth.guard'
import { createCategory, getAllCategories, getCategoryById, removeCategory, updateCategory } from './category.service'

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

categoryRoute.post('/categories', authGuard, async (req, res) => {
  const { title, image } = req.body
  const category = await createCategory(title, image)
  res.json(category)
})

categoryRoute.put('/categories', async (req, res) => {
  const { title, categoryId, image } = req.body
  const updatedCategory = await updateCategory(title, categoryId, image)
  res.json(updatedCategory)
})

categoryRoute.delete('/categories', async (req, res) => {
  const categoryId = req.body.data.id
  const removedCategory = await removeCategory(categoryId)
  res.json(removedCategory)
})
