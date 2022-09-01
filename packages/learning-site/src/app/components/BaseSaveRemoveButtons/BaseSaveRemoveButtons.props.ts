export interface BaseSaveRemoveButtonsProps {
  isSaveShow: boolean
}

export interface BaseSaveRemoveButtonsEmits {
  (event: 'save'): void
  (event: 'remove'): void
}
