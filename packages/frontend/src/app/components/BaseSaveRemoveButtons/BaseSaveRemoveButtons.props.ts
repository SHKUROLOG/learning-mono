// export interface BaseSaveRemoveButtonsProps {
//   isSaveShow: boolean
// }

export interface BaseSaveRemoveButtonsProps {
  currentForm: object
  initialForm: object
}

export interface BaseSaveRemoveButtonsEmits {
  (event: 'save'): void
  (event: 'remove'): void
}
