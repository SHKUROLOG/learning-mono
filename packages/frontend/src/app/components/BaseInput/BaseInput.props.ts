export interface BaseInputProps {
  placeholder: string
  modelValue: string
  border?: boolean
}
export interface BaseInputEmits {
  (event: 'update:modelValue', value: string): void
}
