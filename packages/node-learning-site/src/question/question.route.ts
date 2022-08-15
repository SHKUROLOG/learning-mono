import { Router } from 'express'
import { deleteQuestion, getAllQuestions, getQuestionById, saveQuestion } from './question.service'
import { isConfigQuestionDeleteInput } from './question.validator'

export const questionRoute = Router()

questionRoute.get('/questions/:id?', async (req, res) => {
  if (req.params.id) {
    const question = await getQuestionById(parseInt(req.params.id))
    res.json(question)
  } else {
    const questions = await getAllQuestions()
    res.json(questions)
  }
})

questionRoute.post('/question', async (req, res) => {
  // TODO VALIDATE REQ BODY
  const question = await saveQuestion(req.body)
  res.json(question)
})

questionRoute.delete('/question', async (req, res) => {
  if (!isConfigQuestionDeleteInput(req.body))
    return res.status(400).json({ error: 'body invalid' })

  const questionId = req.body.data.id
  const deletedQuestion = await deleteQuestion(questionId)
  res.json(deletedQuestion)
})
