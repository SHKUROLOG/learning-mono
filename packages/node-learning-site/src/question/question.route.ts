import { removeQuestion, getQuestionById, createQuestion, updateQuestion } from './question.service'
import { defineRoute } from '../validate/validate'
import { CreateQuestionInput, UpdateQuestionInput } from '@learning-mono/shared'

export const questionRoute = defineRoute('question')

questionRoute.getById(async (req, res) => {
  const questionById = await getQuestionById(req.body)
  res.json(questionById)
})

questionRoute.create(CreateQuestionInput, async (req, res) => {
  const createdQuestion = await createQuestion(req.body)
  res.json(createdQuestion)
})

questionRoute.update(UpdateQuestionInput, async (req, res) => {
  const updatedQuestion = await updateQuestion(req.body)
  res.json(updatedQuestion)
})

questionRoute.remove(async (req, res) => {
  const removedQuestion = await removeQuestion(req.body)
  res.json(removedQuestion)
})

// export const questionRoute = Router()
//
// questionRoute.get('/questions/:id?', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   if (req.params.id) {
//     const question = await getQuestionById(parseInt(req.params.id))
//     res.json(question)
//   } else {
//     const questions = await getAllQuestions()
//     res.json(questions)
//   }
// })
//
// questionRoute.post('/question', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const question = await saveQuestion(req.body)
//   res.json(question)
// })
//
// questionRoute.delete('/question', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   if (!isConfigQuestionDeleteInput(req.body))
//     return res.status(400).json({ error: 'body invalid' })
//
//   const questionId = req.body.data.id
//   const deletedQuestion = await deleteQuestion(questionId)
//   res.json(deletedQuestion)
// })
