import { Type } from 'class-transformer'
import { IsNumber, IsString, ValidateNested } from 'class-validator'
import { QuestionDto } from '../question'

export class Theme {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @ValidateNested()
  @Type(() => QuestionDto)
  questions: QuestionDto[]
}
