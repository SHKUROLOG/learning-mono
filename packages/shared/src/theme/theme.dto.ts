import { Type } from 'class-transformer'
import { IsNumber, IsString, ValidateNested } from 'class-validator'
import { Question } from '../question'

export class Theme {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @ValidateNested()
  @Type(() => Question)
  questions: Question[]
}
