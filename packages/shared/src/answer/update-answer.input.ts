import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateAnswerInput {
  @IsString()
  title: string

  @IsNumber()
  QuestionId: number

  @IsNumber()
  Id: number

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean
}
