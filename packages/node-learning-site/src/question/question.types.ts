export interface SaveQuestionInput {
  title: string
  themeId: number
  answers: SaveAnswerInput[]
  id?: number
}

export interface SaveAnswerInput {
  title: string
  id?: number
  isCorrect?: boolean
}

export interface ConfigQuestionDeleteInput {
  data: {
    id: number
  }
}
