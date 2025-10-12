import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import '../st-api-tester/index'
import '../st-console/index'
import '../st-decorator-tester/index'
import '../st-feature-tester/index'
import { stPlaygroundStyles } from './st-playground.styles'

@customElement('st-playground')
export class StPlayground extends LitElement {
  static styles = stPlaygroundStyles

  // 使用访问器模式定义状态属性，避免类字段阴影问题
  private _activeTab = 'overview'
  private _consoleLogs: Array<{
    timestamp: number
    type: 'log' | 'error' | 'warn'
    message: string
  }> = []
  private _isConsoleCollapsed = false
  private _isConsoleOpen = false

  @state()
  private get activeTab() {
    return this._activeTab
  }
  private set activeTab(value: string) {
    this._activeTab = value
  }

  @state()
  private get consoleLogs() {
    return this._consoleLogs
  }
  private set consoleLogs(
    value: Array<{ timestamp: number; type: 'log' | 'error' | 'warn'; message: string }>
  ) {
    this._consoleLogs = value
  }

  @state()
  private get isConsoleCollapsed() {
    return this._isConsoleCollapsed
  }
  private set isConsoleCollapsed(value: boolean) {
    this._isConsoleCollapsed = value
  }

  @state()
  private get isConsoleOpen() {
    return this._isConsoleOpen
  }
  private set isConsoleOpen(value: boolean) {
    this._isConsoleOpen = value
  }

  private _consoleMode: 'popup' | 'sidebar' = 'sidebar' // popup: 弹出模式, sidebar: 右侧推出模式

  @state()
  private get consoleMode() {
    return this._consoleMode
  }
  private set consoleMode(value: 'popup' | 'sidebar') {
    const oldValue = this._consoleMode
    this._consoleMode = value
    this.requestUpdate('consoleMode', oldValue)
  }

  render() {
    return html`
      <div class="playground-container">
        <div class="playground-wrapper">
          <!-- 头部 -->
          <div class="playground-header">
            <h1 class="playground-title">🐷 Strap-Trousers 调试台</h1>
            <div class="playground-actions">
              <button class="btn-secondary" @click=${() => this.runAllTests()}>运行所有测试</button>
              <button class="btn-primary" @click=${() => this.exportLogs()}>导出日志</button>
            </div>
          </div>

          <!-- 标签页 -->
          <div class="tabs-wrapper">
            ${[
              { id: 'overview', name: '概览', icon: '🏠' },
              { id: 'api-tester', name: 'API测试', icon: '🔌' },
              { id: 'decorator-tester', name: '装饰器测试', icon: '✨' },
              { id: 'feature-tester', name: '特性测试', icon: '🧪' },
            ].map(
              (tab) => html`
                <button
                  class="tab-button ${this.activeTab === tab.id ? 'active' : ''}"
                  @click=${() => {
                    this.activeTab = tab.id
                    this.addLog(`切换到${tab.name}页面`, 'log')
                  }}
                >
                  ${tab.icon} ${tab.name}
                </button>
              `
            )}
          </div>

          <!-- 内容区域 -->
          <div class="content-area">${this.renderContent()}</div>
        </div>

        <!-- 控制台开关按钮 -->
        <button
          class="console-toggle-btn"
          @click=${() => (this.isConsoleOpen = !this.isConsoleOpen)}
        >
          ${this.isConsoleOpen ? '❌' : '🖥️'}
        </button>

        <!-- 遮罩层 -->
        ${this.isConsoleOpen && this._consoleMode === 'popup'
          ? html` <div class="console-overlay" @click=${() => (this.isConsoleOpen = false)}></div> `
          : ''}

        <!-- 控制台容器 -->
        <div class="console-container ${this.isConsoleOpen ? 'open' : ''} ${this._consoleMode}">
          <div class="console-header">
            <h3>调试控制台</h3>
            <div class="console-controls">
              <button
                class="console-mode-btn ${this._consoleMode === 'popup' ? 'active' : ''}"
                @click=${() => (this.consoleMode = 'popup')}
                title="弹出模式"
              >
                🪟
              </button>
              <button
                class="console-mode-btn ${this._consoleMode === 'sidebar' ? 'active' : ''}"
                @click=${() => (this.consoleMode = 'sidebar')}
                title="侧边栏模式"
              >
                📱
              </button>
              <button class="console-close" @click=${() => (this.isConsoleOpen = false)}>✕</button>
            </div>
          </div>
          <div class="console-content">${this.renderFullConsole()}</div>
        </div>
      </div>
    `
  }

  private renderContent() {
    switch (this.activeTab) {
      case 'overview':
        return this.renderOverview()
      case 'api-tester':
        return html`<st-api-tester></st-api-tester>`
      case 'decorator-tester':
        return html`<st-decorator-tester></st-decorator-tester>`
      case 'feature-tester':
        return html`<st-feature-tester></st-feature-tester>`
      default:
        return this.renderOverview()
    }
  }

  private renderOverview() {
    return html`
      <div>
        <div class="demo-section">
          <h3 class="demo-title">🚀 快速开始</h3>
          <div class="demo-output">
            <button class="demo-button" @click=${() => this.testConnection()}>测试连接</button>
            <button class="demo-button secondary" @click=${() => this.testApiCall()}>
              API调用测试
            </button>
            <button class="demo-button success" @click=${() => this.showDocumentation()}>
              查看文档
            </button>
            <button class="demo-button warning" @click=${() => this.runPerformanceTest()}>
              性能测试
            </button>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="demo-title">📚 库信息</h3>
          <div class="demo-content">
            <h4 class="demo-card-title">Strap-Trousers</h4>
            <p class="demo-card-content">
              一个轻量级的JavaScript库，提供API连接、状态管理和装饰器功能。
            </p>
            <pre class="demo-output">npm install strap-trousers</pre>
            <ul class="demo-card-content">
              <li>✅ 基于Axios的HTTP客户端封装</li>
              <li>✅ 装饰器模式支持</li>
              <li>✅ 响应式状态管理</li>
              <li>✅ TypeScript支持</li>
            </ul>
          </div>
        </div>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.interceptConsole()
    this.addLog('🐷 Strap-Trousers 调试环境已启动', 'log')
  }

  firstUpdated() {}

  private originalLog = console.log
  private originalError = console.error
  private originalWarn = console.warn

  private interceptConsole() {
    console.log = (...args: any[]) => {
      this.originalLog.apply(console, args)
      this.addLog(
        args
          .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
          .join(' ')
      )
    }

    console.error = (...args: any[]) => {
      this.originalError.apply(console, args)
      this.addLog(
        args
          .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
          .join(' '),
        'error'
      )
    }

    console.warn = (...args: any[]) => {
      this.originalWarn.apply(console, args)
      this.addLog(
        args
          .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
          .join(' '),
        'warn'
      )
    }
  }

  private addLog(message: string, type: 'log' | 'error' | 'warn' = 'log') {
    this.consoleLogs = [
      ...this.consoleLogs,
      {
        timestamp: Date.now(),
        type,
        message,
      },
    ]

    // 限制日志数量
    if (this.consoleLogs.length > 100) {
      this.consoleLogs = this.consoleLogs.slice(-100)
    }
  }

  private testConnection() {
    this.addLog('正在测试连接...', 'log')
    // 模拟连接测试
    setTimeout(() => {
      this.addLog('连接测试完成 ✅', 'log')
      this.addLog('连接状态: 正常', 'log')
    }, 1000)
  }

  private showDocumentation() {
    this.addLog('打开文档中...', 'log')
    window.open('https://github.com/your-repo/strap-trousers', '_blank')
  }

  private runPerformanceTest() {
    this.addLog('开始性能测试...', 'log')
    const start = performance.now()

    // 模拟性能测试
    setTimeout(() => {
      const end = performance.now()
      const duration = end - start
      this.addLog(`性能测试完成，耗时: ${duration.toFixed(2)}ms`, 'log')
    }, 500)
  }

  private runAllTests() {
    this.addLog('开始运行所有测试...', 'log')
    this.testConnection()
    setTimeout(() => this.testApiCall(), 500)
    setTimeout(() => this.runPerformanceTest(), 1000)
  }

  private renderFullConsole() {
    return html`
      <div class="full-console">
        <div class="console-toolbar">
          <span>总日志数: ${this.consoleLogs.length}</span>
          <button class="console-clear-btn" @click=${this.clearLogs}>清空日志</button>
        </div>
        ${this.consoleLogs.length > 0
          ? html`
              <div class="console-log-list">
                ${this.consoleLogs.map(
                  (log) => html`
                    <div class="console-log-item ${log.type}">
                      <div class="console-log-header">
                        <span class="console-badge ${log.type}">
                          ${log.type === 'error' ? '❌' : log.type === 'warn' ? '⚠️' : '✅'}
                        </span>
                        <span class="console-log-time">
                          ${new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div class="console-log-message">${log.message}</div>
                    </div>
                  `
                )}
              </div>
            `
          : html`<p class="console-empty">暂无日志</p>`}
      </div>
    `
  }

  private clearLogs() {
    this.consoleLogs = []
    this.addLog('控制台日志已清空', 'log')
  }

  private exportLogs() {
    const logs = this.consoleLogs
      .map(
        (log) =>
          `[${new Date(log.timestamp).toLocaleString()}] ${log.type.toUpperCase()}: ${log.message}`
      )
      .join('\n')

    const blob = new Blob([logs], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `strap-trousers-logs-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)

    this.addLog('日志已导出', 'log')
  }
}
