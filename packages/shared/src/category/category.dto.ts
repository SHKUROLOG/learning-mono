import { Type } from 'class-transformer'
import { IsNumber, IsString, ValidateNested } from 'class-validator'
import { ThemeDto } from '../theme'

export class CategoryDto {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @ValidateNested()
  @Type(() => ThemeDto)
  themes: ThemeDto[]

  @IsString()
  image: string
}
