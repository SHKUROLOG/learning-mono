import { Router } from 'express'
import { createAnswer, removeAnswer, updateAnswer } from './answer.service'

export const answerRoute = Router()

answerRoute.post('/answer', async (req, res) => {
  // TODO VALIDATE REQ BODY
  const answer = await createAnswer(req.body)
  res.json(answer)
})

answerRoute.put('/answer', async (req, res) => {
  // TODO VALIDATE REQ BODY
  const updatedAnswer = await updateAnswer(req.body)
  res.json(updatedAnswer)
})

answerRoute.delete('/answer', async (req, res) => {
  // TODO VALIDATE REQ BODY
  const answerId = req.body.data.id
  const deletedAnswer = await removeAnswer(answerId)
  res.json(deletedAnswer)
})
