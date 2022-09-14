import { linear } from './linear'

export async function tween(
  from: number,
  to: number,
  time: number,
  progress: (value: number) => void,
) {
  await linear(time, (percent) => {
    progress(percent * (to - from) + from)
  })
}
