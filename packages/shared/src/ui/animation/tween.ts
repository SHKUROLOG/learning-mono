import { easeLinear } from '../easing'
import { linear } from './linear'

interface TweenOptions {
  time?: number
  progress?: (value: number) => void
  ease?: (percent: number) => number
}

export async function tween(
  from: number,
  to: number,
  options?: TweenOptions,
) {
  const ease = options?.ease ?? easeLinear

  await linear(options?.time ?? 300, (percent) => {
    options?.progress?.(ease(percent) * (to - from) + from)
  })
}
