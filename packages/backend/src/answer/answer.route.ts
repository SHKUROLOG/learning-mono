import { CreateAnswerInput, UpdateAnswerInput } from '@learning-mono/shared'
import { defineRoute } from '../validate/validate'
import { createAnswer, removeAnswer } from './answer.service'

export const answerRoute = defineRoute('answer')

answerRoute.create(CreateAnswerInput, createAnswer)

answerRoute.update(UpdateAnswerInput, createAnswer)

answerRoute.remove(removeAnswer)
