import { SaveAnswerInput } from '@app/api/api'
import { instance } from '@app/api/axios'
import { Question } from '@app/types'

export interface ConfigQuestionDeleteInput {
  data: {
    id: number
  }
}

export interface SaveQuestionInput {
  title: string
  themeId: number
  answers: SaveAnswerInput[]
  id?: number
}

export const question = {
  async create(addForm: SaveQuestionInput): Promise<Question> {
    return await instance.post('/question', addForm)
      .then(v => v.data)
  },

  async remove(questionId: number) {
    const dataToSend: ConfigQuestionDeleteInput = {
      data: {
        id: questionId,
      },
    }

    await instance.delete('/question', {
      data: dataToSend,
    })
  },
}
