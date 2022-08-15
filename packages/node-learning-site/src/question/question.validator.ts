import { ConfigQuestionDeleteInput } from './question.types'

export function isConfigQuestionDeleteInput(arg: any): arg is ConfigQuestionDeleteInput {
  return !!arg && typeof arg.data?.id === 'number'
}
