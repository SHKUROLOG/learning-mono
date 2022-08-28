export interface BaseSaveRemoveButtonsProps {
  initialForm: object
  currentForm: object
}

export interface BaseSaveRemoveButtonsEmits {
  (event: 'save'): void
  (event: 'remove'): void
}
