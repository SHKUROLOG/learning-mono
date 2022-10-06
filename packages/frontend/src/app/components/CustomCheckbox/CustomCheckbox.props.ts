export interface CustomCheckboxProps {
  group: string
  isChecked: boolean
  value?: string
}

export interface CustomCheckboxEmits {
  (emit: 'click'): void
}
