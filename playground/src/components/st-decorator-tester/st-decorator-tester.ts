import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { connectStraw, DKID } from 'strap-trousers'
import { stDecoratorTesterStyles } from './st-decorator-tester.styles'

// 创建 API 服务实例
const createTestApiService = () => {
  const apiService = connectStraw({
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
      createPost: () => ({
        url: 'posts',
        method: 'POST',
      }),
    },
  })
  return apiService
}

@customElement('st-decorator-tester')
export class StDecoratorTester extends LitElement {
  static styles = stDecoratorTesterStyles
  // 使用访问器模式定义状态属性，避免类字段阴影问题
  private _testResults: string[] = []
  private _loading = false

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

  constructor() {
    super()
  }

  render() {
    return html`
      <div class="decorator-tester-container">
        <div class="decorator-tester-header">
          <h2 class="decorator-tester-title">✨ 装饰器测试器</h2>
          <p class="decorator-tester-description">测试 Strap-Trousers 的装饰器功能</p>
        </div>

        <div class="test-section">
          <h4 class="test-section-title">connectStraw 装饰器测试</h4>
          <button
            class="btn-test btn-blue"
            @click=${() => this.testConnectStrawDecorator()}
            ?disabled=${this.loading}
          >
            测试 connectStraw
          </button>
          <button class="btn-test btn-green" @click=${() => this.testDKIDDecorator()}>
            测试 DKID
          </button>
          <button class="btn-test btn-purple" @click=${() => this.testComplexDecorator()}>
            测试复杂装饰器
          </button>
          <button class="btn-test btn-clear" @click=${() => this.clearResults()}>清空结果</button>
        </div>

        <div class="test-section">
          <h4 class="test-section-title">高级装饰器测试</h4>
          <button class="btn-test btn-indigo" @click=${() => this.testAsyncDecorator()}>
            测试异步装饰器
          </button>
          <button class="btn-test btn-orange" @click=${() => this.testErrorHandlingDecorator()}>
            测试错误处理
          </button>
          <button class="btn-test btn-teal" @click=${() => this.testCacheDecorator()}>
            测试缓存装饰器
          </button>
        </div>

        ${this.testResults.length > 0
        ? html`
              <div class="results-panel">
                <h4 class="results-title">测试结果</h4>
                <div class="results-list">
                  ${this.testResults.map((result, index) => {
          const type = this.getResultType(result)
          return html` <div class="result-item ${type}">${result}</div> `
        })}
                </div>
              </div>
            `
        : html`
              <div class="no-results">
                <p class="no-results-text">点击上方按钮开始测试装饰器功能</p>
              </div>
            `}
        ${this.loading
        ? html`
              <div class="loading-container">
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

  private async testConnectStrawDecorator() {
    this.loading = true
    this.addResult('开始测试 connectStraw 函数...', 'info')

    try {
      const apiService = createTestApiService()

      // 测试 API 调用
      this.addResult('测试 API 调用...', 'info')
      const result = await apiService.getPost()
      this.addResult(`API 调用成功: ${JSON.stringify(result)}`, 'success')
    } catch (error: any) {
      this.addResult(`connectStraw 测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private async testDKIDDecorator() {
    this.loading = true
    this.addResult('开始测试 DKID 装饰器...', 'info')

    try {
      // 测试 DKID 功能
      const testId = DKID('test')
      this.addResult(`DKID 生成成功: ${testId}`, 'success')

      // 测试 DKID 的唯一性
      const testId2 = DKID('test2')
      this.addResult(`DKID 唯一性测试: ${testId !== testId2}`, 'success')
    } catch (error: any) {
      this.addResult(`DKID 测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private async testComplexDecorator() {
    this.loading = true
    this.addResult('开始测试复杂装饰器组合...', 'info')

    try {
      // 创建复杂的 API 服务配置
      const complexApi = connectStraw({
        config: {
          name: 'complexApi',
          rootUrl: 'https://jsonplaceholder.typicode.com/',
          lib: { Axios: true },
          timeout: 5000,
          retries: 3,
        },
        action: {
          getUserPosts: (userId: number) => ({
            url: `users/${userId}/posts`,
            method: 'GET',
          }),
          createUserPost: (userId: number, data: any) => ({
            url: 'posts',
            method: 'POST',
            data: { ...data, userId },
          }),
        },
      })

      // 测试复杂查询
      this.addResult('测试复杂查询...', 'info')
      const userPosts = await complexApi.getUserPosts(1)
      this.addResult(`获取用户帖子成功，共 ${userPosts.length} 条`, 'success')
    } catch (error: any) {
      this.addResult(`复杂装饰器测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private async testAsyncDecorator() {
    this.loading = true
    this.addResult('开始测试异步装饰器...', 'info')

    try {
      // 模拟异步操作
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const asyncApi = connectStraw({
        config: {
          name: 'asyncApi',
          rootUrl: 'https://jsonplaceholder.typicode.com/',
          lib: { Axios: true },
        },
        action: {
          asyncOperation: async () => {
            await new Promise((resolve) => setTimeout(resolve, 500))
            return {
              url: 'posts/1',
              method: 'GET',
            }
          },
        },
      })

      const result = await asyncApi.asyncOperation()
      this.addResult(`异步装饰器测试成功: ${JSON.stringify(result)}`, 'success')
    } catch (error: any) {
      this.addResult(`异步装饰器测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private async testErrorHandlingDecorator() {
    this.loading = true
    this.addResult('开始测试错误处理装饰器...', 'info')

    try {
      // 创建会失败的 API 调用
      const errorApi = connectStraw({
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
        },
      })

      try {
        await errorApi.getNonExistent()
        this.addResult('错误处理测试失败 - 应该抛出异常', 'error')
      } catch (error) {
        this.addResult('错误处理测试成功 - 正确捕获异常', 'success')
      }
    } catch (error: any) {
      this.addResult(`错误处理装饰器测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private async testCacheDecorator() {
    this.loading = true
    this.addResult('开始测试缓存装饰器...', 'info')

    try {
      const cacheApi = connectStraw({
        config: {
          name: 'cacheApi',
          rootUrl: 'https://jsonplaceholder.typicode.com/',
          lib: { Axios: true },
          cache: true,
          cacheTimeout: 5000,
        },
        action: {
          getCachedPost: () => ({
            url: 'posts/1',
            method: 'GET',
          }),
        },
      })

      // 第一次调用
      const start1 = Date.now()
      const result1 = await cacheApi.getCachedPost()
      const time1 = Date.now() - start1

      // 第二次调用（应该更快）
      const start2 = Date.now()
      const result2 = await cacheApi.getCachedPost()
      const time2 = Date.now() - start2

      this.addResult(`第一次调用耗时: ${time1}ms`, 'info')
      this.addResult(`第二次调用耗时: ${time2}ms`, 'info')
      this.addResult(
        `缓存效果: ${time1 > time2 ? '✅ 有效' : '❌ 无效'}`,
        time1 > time2 ? 'success' : 'error'
      )
    } catch (error: any) {
      this.addResult(`缓存装饰器测试失败: ${error.message}`, 'error')
    } finally {
      this.loading = false
    }
  }

  private clearResults() {
    this.testResults = []
  }
}
