import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { stConsoleStyles } from './st-console.styles'

interface ConsoleMessage {
  type: 'log' | 'warn' | 'error' | 'info'
  message: string
  timestamp: string
  args: any[]
}

@customElement('st-console')
export class StConsole extends LitElement {
  static styles = stConsoleStyles

  firstUpdated() {
    // 不再注入Tailwind样式，改用原生CSS
    // import { injectTailwindStyles } from '../../utils/tailwind-styles.js'
    // injectTailwindStyles(this.renderRoot as ShadowRoot);
  }
  // 使用访问器模式定义状态属性，避免类字段阴影问题
  private _messages: ConsoleMessage[] = []
  private _isAutoScroll = true
  private _filterType: 'all' | 'log' | 'warn' | 'error' | 'info' = 'all'

  @state()
  private get messages() {
    return this._messages
  }
  private set messages(value: ConsoleMessage[]) {
    this._messages = value
  }

  @state()
  private get isAutoScroll() {
    return this._isAutoScroll
  }
  private set isAutoScroll(value: boolean) {
    this._isAutoScroll = value
  }

  @state()
  private get filterType() {
    return this._filterType
  }
  private set filterType(value: 'all' | 'log' | 'warn' | 'error' | 'info') {
    this._filterType = value
  }

  render() {
    const filteredMessages = this.filterType === 'all'
      ? this.messages
      : this.messages.filter(msg => msg.type === this.filterType)

    return html`
      <div class="console-container">
        <!-- 控制台头部 -->
        <div class="console-header">
          <h3 class="console-title">Console</h3>
          <div class="console-controls">
            <button
              class="console-button ${this.isAutoScroll ? 'active' : ''}"
              @click=${() => this.toggleAutoScroll()}
            >
              自动滚动
            </button>
            <button
              class="console-button"
              @click=${() => this.clearConsole()}
            >
              清空
            </button>
            <select
              class="console-select"
              .value=${this.filterType}
              @change=${(e: Event) => this.filterType = (e.target as HTMLSelectElement).value as any}
            >
              <option value="all">全部</option>
              <option value="log">日志</option>
              <option value="warn">警告</option>
              <option value="error">错误</option>
              <option value="info">信息</option>
            </select>
          </div>
        </div>

        <!-- 控制台内容 -->
        <div class="console-content">
          ${filteredMessages.length === 0
        ? html`<div class="console-empty">控制台为空，等待日志输出...</div>`
        : filteredMessages.map(msg => html`
                <div class="console-message ${msg.type}">
                  <span class="console-timestamp">${msg.timestamp}</span>
                  <span class="console-badge ${msg.type}">
                    ${msg.type}
                  </span>
                  ${msg.message}
                </div>
              `)
      }
        </div>

        <!-- 统计信息 -->
        <div class="console-footer">
          <div>${this.messages.length} messages</div>
          <div>${this.messages.filter(m => m.type === 'error').length} errors</div>
        </div>
      </div>
    `
  }



  private toggleAutoScroll() {
    this.isAutoScroll = !this.isAutoScroll
  }

  private clearConsole() {
    this.messages = []
  }

  addMessage(type: 'log' | 'warn' | 'error' | 'info', message: string, ...args: any[]) {
    const timestamp = new Date().toLocaleTimeString()
    this.messages = [...this.messages, {
      type,
      message,
      timestamp,
      args
    }]

    // 自动滚动到底部
    if (this.isAutoScroll) {
      setTimeout(() => {
        const content = this.shadowRoot?.querySelector('.console-content')
        if (content) {
          content.scrollTop = content.scrollHeight
        }
      }, 100)
    }
  }

  // 公共API方法
  log(message: string, ...args: any[]) {
    this.addMessage('log', message, ...args)
  }

  warn(message: string, ...args: any[]) {
    this.addMessage('warn', message, ...args)
  }

  error(message: string, ...args: any[]) {
    this.addMessage('error', message, ...args)
  }

  info(message: string, ...args: any[]) {
    this.addMessage('info', message, ...args)
  }

  clear() {
    this.clearConsole()
  }
}