import { Type } from 'class-transformer'
import { IsNumber, IsString, ValidateNested } from 'class-validator'
import { Theme } from '../theme'

export class Category {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @ValidateNested()
  @Type(() => Theme)
  themes: Theme[]

  @IsString()
  image: string
}
