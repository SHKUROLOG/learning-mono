import { CreateAnswerInput, UpdateAnswerInput } from '@learning-mono/shared'
import { defineRoute } from '../validate/validate'
import { createAnswer, removeAnswer, updateAnswer } from './answer.service'

export const answerRoute = defineRoute('answer')

answerRoute.create(CreateAnswerInput, createAnswer)

answerRoute.update(UpdateAnswerInput, updateAnswer)

answerRoute.remove(removeAnswer)
