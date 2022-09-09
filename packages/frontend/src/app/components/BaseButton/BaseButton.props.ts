export enum ButtonSize {
  S = 's',
  M = 'm',
  L = 'l',
}

export interface BaseButtonProps {
  buttonSize: ButtonSize
  text: string
}
