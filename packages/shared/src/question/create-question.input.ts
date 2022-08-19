import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateAnswerInput } from '../answer'

export class CreateQuestionInput {
  @IsString()
  title: string

  @IsNumber()
  themeId: number

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAnswerInput)
  answers?: CreateAnswerInput[]
}
