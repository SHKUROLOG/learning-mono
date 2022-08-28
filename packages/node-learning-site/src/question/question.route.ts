import { CreateQuestionInput, UpdateQuestionInput } from '@learning-mono/shared'
import { defineRoute } from '../validate/validate'
import { createQuestion, getQuestionById, removeQuestion, updateQuestion } from './question.service'

export const questionRoute = defineRoute('question')

questionRoute.getById(getQuestionById)

questionRoute.create(CreateQuestionInput, createQuestion)

questionRoute.update(UpdateQuestionInput, updateQuestion)

questionRoute.remove(removeQuestion)

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
