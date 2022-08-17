import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { Router } from 'express'
import { createAnswer, removeAnswer, updateAnswer } from './answer.service'
import { AnswerInput } from './answer.types'

export const answerRoute = Router()

answerRoute.post('/answer', async (req, res) => {
  // TODO VALIDATE REQ BODY
  const request = plainToInstance(AnswerInput, req.body)
  const errors = await validate(request)
  if (errors.length)
    return res.status(400).json({ errors })

  const answer = await createAnswer(request)
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
