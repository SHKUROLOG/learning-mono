import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAnswerInput {
  @IsString()
  title: string

  @IsNumber()
  questionId?: number

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean
}
