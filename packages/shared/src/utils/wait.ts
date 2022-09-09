export async function wait(time: number = 42): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time))
}
