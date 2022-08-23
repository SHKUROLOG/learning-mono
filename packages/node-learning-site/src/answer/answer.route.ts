import { CreateAnswerInput, UpdateAnswerInput } from '@learning-mono/shared'
import { defineRoute } from '../validate/validate'
import { createAnswer, removeAnswer } from './answer.service'

export const answerRoute = defineRoute('answer')

answerRoute.create(CreateAnswerInput, async (req, res) => {
  const createdAnswer = await createAnswer(req.body)
  res.json(createdAnswer)
})

answerRoute.update(UpdateAnswerInput, async (req, res) => {
  const updatedAnswer = await createAnswer(req.body)
  res.json(updatedAnswer)
})

answerRoute.remove(async (req, res) => {
  const removedAnswer = await removeAnswer(parseInt(req.params.id))
  res.json(removedAnswer)
})
