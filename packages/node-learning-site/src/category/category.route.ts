import { defineRoute } from '../validate/validate'
import { CreateCategoryInput, UpdateCategoryInput } from '@learning-mono/shared'
import { createCategory, getAllCategories, getCategoryById, removeCategory } from './category.service'

export const categoryRoute = defineRoute('category')

categoryRoute.getById(async (req, res) => {
  const categoryById = await getCategoryById(parseInt(req.params.id))
  res.json(categoryById)
})

categoryRoute.create(CreateCategoryInput, async (req, res) => {
  const createdCategory = await createCategory(req.body)
  res.json(createdCategory)
})

categoryRoute.update(UpdateCategoryInput, async (req, res) => {
  const updatedCategory = await createCategory(req.body)
  res.json(updatedCategory)
})

categoryRoute.remove(async (req, res) => {
  const removedCategory = await removeCategory(parseInt(req.params.id))
  res.json(removedCategory)
})

categoryRoute.custom('get', '/categories', Object, async (req, res) => {
  const allCategories = await getAllCategories()
  res.json(allCategories)
})

// export const categoryRoute = Router()

// categoryRoute.get('/categories/:id?', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   if (req.params.id) {
//     const category = await getCategoryById(parseInt(req.params.id))
//     res.json(category)
//   } else {
//     const categories = await getAllCategories()
//     res.json(categories)
//   }
// })
//
// categoryRoute.post('/categories', authGuard, async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const { title, image } = req.body
//   const category = await createCategory(title, image)
//   res.json(category)
// })
//
// categoryRoute.put('/categories', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const { title, categoryId, image } = req.body
//   const updatedCategory = await updateCategory(title, categoryId, image)
//   res.json(updatedCategory)
// })
//
// categoryRoute.delete('/categories/:id', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const categoryId = parseInt(req.params.id)
//   const removedCategory = await removeCategory(categoryId)
//   res.json(removedCategory)
// })
