/**
 * 安全注册自定义元素，避免重复注册错误
 */
export function safeDefineElement(name: string, element: CustomElementConstructor): void {
  if (!customElements.get(name)) {
    customElements.define(name, element)
  }
}