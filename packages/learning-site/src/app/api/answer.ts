import { CreateAnswerInput, UpdateAnswerInput } from '@learning-mono/shared'
import { instance } from './axios'

export const answer = {
  async create(createAnswerInput: CreateAnswerInput) {
    return await instance.post('/answer', createAnswerInput)
      .then(v => v.data)
  },

  async update(updateAnswerInput: UpdateAnswerInput) {
    return await instance.put('/answer', updateAnswerInput)
      .then(v => v.data)
  },

  async remove(answerId: number) {
    return await instance.delete(`/answer/${answerId}`)
  },
}
