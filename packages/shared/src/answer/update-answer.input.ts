import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateAnswerInput {
  @IsString()
  title: string

  @IsNumber()
  id: number

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean
}
