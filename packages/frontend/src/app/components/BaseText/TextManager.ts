import { wait } from '@learning-mono/shared'

type InstanceFn = () => Generator

class TextManager {
  private queue: InstanceFn[] = []
  private isRunning = false

  add(textInstance: InstanceFn) {
    this.queue.push(textInstance)
    this.run()
  }

  private async run() {
    if (this.isRunning)
      return

    this.isRunning = true

    let instanceFn: InstanceFn | undefined

    // eslint-disable-next-line no-cond-assign
    while (instanceFn = this.queue.shift()) {
      const instance = instanceFn()
      while (!instance.next().done)
        await wait(10)
    }

    this.isRunning = false
  }
}

export const textManager = new TextManager()
