import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { DKID, LOGO, createConnect } from 'strap-trousers'
import { stFeatureTesterStyles } from './st-feature-tester.styles'

@customElement('st-feature-tester')
export class StFeatureTester extends LitElement {
  static styles = stFeatureTesterStyles

  // 使用访问器模式定义状态属性，避免类字段阴影问题
  private _testResults: string[] = []
  private _loading = false

  constructor() {
    super()
  }

  @state()
  private get testResults() {
    return this._testResults
  }
  private set testResults(value: string[]) {
    this._testResults = value
  }

  @state()
  private get loading() {
    return this._loading
  }
  private set loading(value: boolean) {
    this._loading = value
  }

  render() {
    return html`
      <div class="feature-tester-container">
        <div class="feature-tester-header">
          <h3 class="feature-tester-title">🧪 特性测试器</h3>
          <p class="feature-tester-description">测试 Strap-Trousers 的各种特性功能</p>
        </div>

        <div class="core-tests">
          <h4 class="tests-title">核心特性测试</h4>
          <button class="btn btn-blue" @click=${() => this.testLogo()} ?disabled=${this.loading}>
            测试 LOGO
          </button>
          <button class="btn btn-green" @click=${() => this.testDKID()}>测试 DKID</button>
          <button class="btn btn-purple" @click=${() => this.testCreateConnect()}>
            测试 createConnect
          </button>
          <button class="btn btn-clear" @click=${() => this.clearResults()}>清空结果</button>
        </div>

        <div class="advanced-tests">
          <h4 class="tests-title">高级特性测试</h4>
          <button class="btn btn-indigo" @click=${() => this.testAdvancedFeatures()}>
            测试高级特性
          </button>
          <button class="btn btn-orange" @click=${() => this.testErrorHandling()}>
            测试错误处理
          </button>
          <button class="btn btn-teal" @click=${() => this.testPerformance()}>测试性能</button>
        </div>

        <div class="feature-grid">
          <h4 class="tests-title">特性网格</h4>
          <div class="grid">
            ${[
              { name: 'HTTP客户端', desc: '基于Axios的HTTP客户端封装', icon: '🌐', color: 'blue' },
              { name: '装饰器模式', desc: '支持装饰器模式编程', icon: '✨', color: 'purple' },
              { name: '状态管理', desc: '响应式状态管理', icon: '🔄', color: 'green' },
              { name: 'TypeScript', desc: '完整的TypeScript支持', icon: '📘', color: 'indigo' },
              { name: '错误处理', desc: '统一的错误处理机制', icon: '🛡️', color: 'red' },
              { name: '缓存支持', desc: '内置缓存功能', icon: '💾', color: 'orange' },
            ].map(
              (feature) => html`
                <div class="feature-card ${feature.color}">
                  <div class="feature-icon">${feature.icon}</div>
                  <h5 class="feature-name">${feature.name}</h5>
                  <p class="feature-desc">${feature.desc}</p>
                </div>
              `
            )}
          </div>
        </div>

        ${this.testResults.length > 0
          ? html`
              <div class="results-section">
                <h4 class="tests-title">测试结果</h4>
                <div class="results-list">
                  ${this.testResults.map((result, index) => {
                    const type = this.getResultType(result)
                    return html` <div class="result-item ${type}">${result}</div> `
                  })}
                </div>
              </div>
            `
          : html`
              <div class="empty-state">
                <p class="empty-text">点击上方按钮开始测试特性功能</p>
              </div>
            `}
        ${this.loading
          ? html`
              <div class="loading-state">
                <div class="loading-spinner"></div>
                <span class="loading-text">测试中...</span>
              </div>
            `
          : ''}
      </div>
    `
  }

  private getResultType(result: string): 'success' | 'error' | 'info' | 'warning' {
    if (result.includes('成功') || result.includes('✅')) return 'success'
    if (result.includes('失败') || result.includes('❌')) return 'error'
    if (result.includes('警告') || result.includes('⚠️')) return 'warning'
    return 'info'
  }

  private addResult(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
    const timestamp = new Date().toLocaleTimeString()
    this.testResults = [...this.testResults, `[${timestamp}] ${message}`]

    // 滚动到最新结果
    setTimeout(() => {
      const resultsContainer = this.shadowRoot?.querySelector('.results-container')
      if (resultsContainer) {
        resultsContainer.scrollTop = resultsContainer.scrollHeight
      }
    }, 100)
  }

  private async testLogo() {
    this.loading = true
    this.addResult('开始测试 LOGO 功能...', 'info')

    try {
      // 测试 LOGO 功能
      const logo = LOGO
      this.addResult(`LOGO 测试成功: ${logo}`, 'success')

      // 测试 LOGO 的类型
      this.addResult(`LOGO 类型: ${typeof logo}`, 'info')
    } catch (error: any) {
      this.addResult(`LOGO 测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private async testDKID() {
    this.loading = true
    this.addResult('开始测试 DKID 功能...', 'info')

    try {
      // 测试 DKID 功能
      const id1 = DKID('test1')
      const id2 = DKID('test2')
      const id3 = DKID('test1') // 相同的输入

      this.addResult(`DKID 生成测试1: ${id1}`, 'info')
      this.addResult(`DKID 生成测试2: ${id2}`, 'info')
      this.addResult(
        `DKID 重复性测试: ${id1 === id3 ? '✅ 一致' : '❌ 不一致'}`,
        id1 === id3 ? 'success' : 'error'
      )

      // 测试 DKID 的唯一性
      const uniqueTest = id1 !== id2
      this.addResult(
        `DKID 唯一性测试: ${uniqueTest ? '✅ 唯一' : '❌ 重复'}`,
        uniqueTest ? 'success' : 'error'
      )
    } catch (error: any) {
      this.addResult(`DKID 测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private async testCreateConnect() {
    this.loading = true
    this.addResult('开始测试 createConnect 功能...', 'info')

    try {
      // 测试 createConnect 功能
      const api = new createConnect({
        config: {
          name: 'testApi',
          rootUrl: 'https://jsonplaceholder.typicode.com/',
          lib: { Axios: true },
        },
        action: {
          getPost: () => ({
            url: 'posts/1',
            method: 'GET',
          }),
          getUser: (id: number) => ({
            url: `users/${id}`,
            method: 'GET',
          }),
        },
      })

      this.addResult('createConnect 初始化成功', 'success')

      // 测试 API 调用
      this.addResult('测试 API 调用...', 'info')
      const result = await api.getPost()
      this.addResult(`API 调用成功: ${JSON.stringify(result).slice(0, 100)}...`, 'success')

      // 测试带参数的 API 调用
      this.addResult('测试带参数 API 调用...', 'info')
      const userResult = await api.getUser(1)
      this.addResult(
        `带参数 API 调用成功: ${JSON.stringify(userResult).slice(0, 100)}...`,
        'success'
      )
    } catch (error: any) {
      this.addResult(`createConnect 测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private async testAdvancedFeatures() {
    this.loading = true
    this.addResult('开始测试高级特性...', 'info')

    try {
      // 测试配置选项
      const advancedApi = new createConnect({
        config: {
          name: 'advancedApi',
          rootUrl: 'https://jsonplaceholder.typicode.com/',
          lib: { Axios: true },
          timeout: 10000,
          retries: 3,
          cache: true,
        },
        action: {
          getPosts: () => ({
            url: 'posts',
            method: 'GET',
            params: { _limit: 5 },
          }),
        },
      })

      this.addResult('高级配置初始化成功', 'success')

      // 测试带查询参数的调用
      const result = await advancedApi.getPosts()
      this.addResult(`带参数查询成功，返回 ${result.length} 条数据`, 'success')
    } catch (error: any) {
      this.addResult(`高级特性测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private async testErrorHandling() {
    this.loading = true
    this.addResult('开始测试错误处理...', 'info')

    try {
      // 创建会出错的 API 配置
      const errorApi = new createConnect({
        config: {
          name: 'errorApi',
          rootUrl: 'https://jsonplaceholder.typicode.com/',
          lib: { Axios: true },
        },
        action: {
          getNonExistent: () => ({
            url: 'posts/999999',
            method: 'GET',
          }),
          invalidUrl: () => ({
            url: 'invalid-endpoint',
            method: 'GET',
          }),
        },
      })

      // 测试不存在的资源
      try {
        await errorApi.getNonExistent()
        this.addResult('错误处理测试失败 - 应该抛出异常', 'error')
      } catch (error) {
        this.addResult('错误处理测试成功 - 正确捕获404错误', 'success')
      }

      // 测试无效URL
      try {
        await errorApi.invalidUrl()
        this.addResult('无效URL测试失败 - 应该抛出异常', 'error')
      } catch (error) {
        this.addResult('无效URL测试成功 - 正确捕获错误', 'success')
      }
    } catch (error: any) {
      this.addResult(`错误处理测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private async testPerformance() {
    this.loading = true
    this.addResult('开始测试性能...', 'info')

    try {
      const perfApi = new createConnect({
        config: {
          name: 'perfApi',
          rootUrl: 'https://jsonplaceholder.typicode.com/',
          lib: { Axios: true },
        },
        action: {
          getPost: () => ({
            url: 'posts/1',
            method: 'GET',
          }),
        },
      })

      // 性能测试
      const iterations = 5
      const times: number[] = []

      for (let i = 0; i < iterations; i++) {
        const start = performance.now()
        await perfApi.getPost()
        const end = performance.now()
        times.push(end - start)
      }

      const avgTime = times.reduce((a, b) => a + b, 0) / times.length
      const minTime = Math.min(...times)
      const maxTime = Math.max(...times)

      this.addResult(`性能测试完成 (${iterations} 次调用)`, 'info')
      this.addResult(`平均响应时间: ${avgTime.toFixed(2)}ms`, 'info')
      this.addResult(`最短响应时间: ${minTime.toFixed(2)}ms`, 'success')
      this.addResult(
        `最长响应时间: ${maxTime.toFixed(2)}ms`,
        times.indexOf(maxTime) === 0 ? 'warning' : 'info'
      )

      if (avgTime < 1000) {
        this.addResult('✅ 性能表现良好', 'success')
      } else {
        this.addResult('⚠️ 性能可能需要优化', 'warning')
      }
    } catch (error: any) {
      this.addResult(`性能测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private clearResults() {
    this.testResults = []
  }
}
