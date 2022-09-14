import { raf } from '../../utils'

export async function linear(time: number, progress: (percent: number) => void) {
  progress(0)

  const startTime = await raf()
  let current = 0

  while (current !== 1) {
    const now = await raf()
    current = Math.min((now - startTime) / time, 1)

    progress(current)
  }
}
