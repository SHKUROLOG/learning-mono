import { CategoryDto } from '@learning-mono/shared'

export interface CategoryEditFormProps {
  category: CategoryDto
}

export interface CategoryEditFormEmits {
  (event: 'update:category', value: CategoryDto): void
  (event: 'remove:category', value: CategoryDto): void
}
