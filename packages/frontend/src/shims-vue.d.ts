declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.svg' {
  const content: string
  export default content
}
interface ImportMeta {
  env: Record<string, string | undefined>
}
