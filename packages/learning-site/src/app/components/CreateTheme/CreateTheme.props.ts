export interface CreateThemeProps {
  categoryId: number
}

export interface CreateThemeEmits {
  (emit: 'created'): void
}
