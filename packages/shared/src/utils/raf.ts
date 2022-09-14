export async function raf(): Promise<number> {
  return new Promise<number>(requestAnimationFrame)
}
