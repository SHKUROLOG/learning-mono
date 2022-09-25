export interface CreateAnswerProps {
  questionId: number
}

export interface CreateAnswerEmits {
  (emit: 'created'): void
}
