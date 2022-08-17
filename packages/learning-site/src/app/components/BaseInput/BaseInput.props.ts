export interface BaseInputProps {
  placeholder: string
  modelValue: string
}
export interface BaseInputEmits {
  (event: 'update:modelValue', value: string): void
}
