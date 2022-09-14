export async function raf(): Promise<number> {
  // return new Promise(resolve => requestAnimationFrame(time => resolve(time)))
  return new Promise(requestAnimationFrame)
}
