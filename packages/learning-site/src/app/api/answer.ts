import { CreateAnswerInput } from '@learning-mono/shared'
import { instance } from './axios'

// export interface AnswerInput {
//   title: string
//   answerId?: number
//   questionId?: number
// }
//
// export interface ConfigAnswerDeleteInput {
//   data: {
//     id: number
//   }
// }
//
// export interface SaveAnswerInput {
//   title: string
//   id?: number
//   isCorrect?: boolean
// }

export const answer = {
  async create(answerInput: CreateAnswerInput) {
    return await instance.post('/answer', answerInput)
      .then(v => v.data)
  },

  async update(answerInput: AnswerInput) {
    return await instance.put('/answer', answerInput)
      .then(v => v.data)
  },

  async remove(answerId: number) {
    return await instance.delete(`/answer/${answerId}`)
  },
}
