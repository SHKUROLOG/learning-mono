import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateCategoryInput {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @IsOptional()
  @IsString()
  image?: string
}
