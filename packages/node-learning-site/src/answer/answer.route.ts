import { CreateAnswerInput } from '@learning-mono/shared'
import { defineRoute } from '../validate/validate'
import { createAnswer } from './answer.service'

export const answerRoute = defineRoute('answer')

answerRoute.create(CreateAnswerInput, async (req, res) => {
  const createdAnswer = await createAnswer(req.body)
  res.json(createdAnswer)
})

answerRoute.update(CreateAnswerInput, async (req, res) => {
  const updatedAnswer = await createAnswer(req.body)
  res.json(updatedAnswer)
})

answerRoute.remove(async (req, res) => {
  const removedAnswer = await createAnswer(req.body)
  res.json(removedAnswer)
})

// answerRoute.post('/answer', async (req, res) => {
//   const request = plainToInstance(CreateAnswerInput, req.body)
//   const errors = await validate(request)
//   if (errors.length)
//     return res.status(400).json({ errors })
//
//   const createdAnswer = await createAnswer(request)
//   res.json(createdAnswer)
// })
//
//
//
// answerRoute.put('/answer', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const updatedAnswer = await updateAnswer(req.body)
//   res.json(updatedAnswer)
// })
//
// answerRoute.delete('/answer', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const answerId = req.body.data.id
//   const deletedAnswer = await removeAnswer(answerId)
//   res.json(deletedAnswer)
// })
