export interface CreateQuestionProps {
  themeId: number
}

export interface CreateQuestionEmits {
  (emit: 'created'): void
}
