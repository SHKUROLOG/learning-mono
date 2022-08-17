import { Category } from '@app/types'

export interface CategoryEditFormProps {
  category: Category
}

export interface CategoryCreateForm {
  title: string
  image: string
  categoryId: number
}

export interface CategoryEditFormEmits {
  (event: 'update:category', value: Category): void
}
