import axios from 'axios'
import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { connectStraw, ConnectStrawPlus, Delete, Get, Post, Put } from 'strap-trousers'
import { stApiTesterStyles } from './st-api-tester.styles'

@customElement('st-api-tester')
export class StApiTester extends LitElement {
  static styles = stApiTesterStyles

  constructor() {
    super()
  }

  // 使用访问器模式定义状态属性，避免类字段阴影问题
  private _url = 'https://jsonplaceholder.typicode.com/posts/1'
  private _method = 'GET'
  private _headers = '{\n  "Content-Type": "application/json"\n}'
  private _body = '{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}'
  private _response = ''
  private _loading = false
  private _error = ''
  private _connectionType: 'connectStraw' | 'ConnectStrawPlus' = 'connectStraw'
  private _showCode = true

  @state()
  private get url() {
    return this._url
  }
  private set url(value: string) {
    this._url = value
  }

  @state()
  private get method() {
    return this._method
  }
  private set method(value: string) {
    this._method = value
  }

  @state()
  private get headers() {
    return this._headers
  }
  private set headers(value: string) {
    this._headers = value
  }

  @state()
  private get body() {
    return this._body
  }
  private set body(value: string) {
    this._body = value
  }

  @state()
  private get response() {
    return this._response
  }
  private set response(value: string) {
    this._response = value
  }

  @state()
  private get loading() {
    return this._loading
  }
  private set loading(value: boolean) {
    this._loading = value
  }

  @state()
  private get error() {
    return this._error
  }
  private set error(value: string) {
    this._error = value
  }

  @state()
  private get connectionType() {
    return this._connectionType
  }
  private set connectionType(value: 'connectStraw' | 'ConnectStrawPlus') {
    this._connectionType = value
  }

  @state()
  private get showCode() {
    return this._showCode
  }
  private set showCode(value: boolean) {
    this._showCode = value
  }

  render() {
    return html`
      <div class="container">
        <div class="form-section">
          <h1>Strap-Trousers API Tester</h1>

          <div class="form-group">
            <label for="connectionType">Connection Type</label>
            <select
              id="connectionType"
              .value="${this.connectionType}"
              @change="${this.handleConnectionTypeChange}"
            >
              <option value="connectStraw">connectStraw</option>
              <option value="ConnectStrawPlus">ConnectStrawPlus</option>
            </select>
          </div>

          <div class="form-group">
            <label for="method">Method</label>
            <select id="method" .value="${this.method}" @change="${this.handleMethodChange}">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          <div class="form-group">
            <label for="url">URL</label>
            <input
              type="text"
              id="url"
              .value="${this.url}"
              @input="${this.handleUrlChange}"
              placeholder="https://jsonplaceholder.typicode.com/posts/1"
            />
          </div>

          <div class="form-group">
            <label for="headers">Headers (JSON)</label>
            <textarea
              id="headers"
              .value="${this.headers}"
              @input="${this.handleHeadersChange}"
              placeholder='{"Content-Type": "application/json"}'
              rows="3"
            ></textarea>
          </div>

          ${this.method !== 'GET'
            ? html`
                <div class="form-group">
                  <label for="body">Request Body (JSON)</label>
                  <textarea
                    id="body"
                    .value="${this.body}"
                    @input="${this.handleBodyChange}"
                    placeholder='{"title": "foo", "body": "bar", "userId": 1}'
                    rows="4"
                  ></textarea>
                </div>
              `
            : ''}

          <div class="button-group">
            <button class="btn-primary" @click="${this.sendRequest}">Send Request</button>
            <button class="btn-secondary" @click="${this.clearForm}">Clear</button>
            <button class="btn-success" @click="${this.loadExample}">Load Example</button>
            <button class="btn-info" @click="${this.toggleCode}">
              ${this.showCode ? 'Hide Code' : 'Show Code'}
            </button>
          </div>

          ${this.error
            ? html` <div class="error-message"><strong>Error:</strong> ${this.error}</div> `
            : ''}
          ${this.response
            ? html`
                <div class="response-section">
                  <div class="response-header">
                    <h3>Response</h3>
                    <button class="btn-secondary" @click="${this.copyResponse}">
                      Copy Response
                    </button>
                  </div>
                  <pre class="response-content">${this.response}</pre>
                </div>
              `
            : ''}
        </div>

        <div class="code-section">
          <div class="code-container">
            <div class="code-header">
              <h3 class="code-title">Generated Code</h3>
              <button class="btn-secondary" @click="${this.copyCode}">Copy Code</button>
            </div>
            <pre class="code-content">${this.generateCode()}</pre>
          </div>
        </div>
      </div>
    `
  }

  private async sendRequest() {
    this.loading = true
    this.error = ''
    this.response = ''

    try {
      // 解析请求头
      let headers = {}
      if (this.headers.trim()) {
        try {
          headers = JSON.parse(this.headers)
        } catch (e) {
          throw new Error('请求头格式错误，请检查JSON格式')
        }
      }

      // 解析请求体
      let body = undefined
      if (this.method !== 'GET' && this.body.trim()) {
        try {
          body = JSON.parse(this.body)
        } catch (e) {
          throw new Error('请求体格式错误，请检查JSON格式')
        }
      }

      let result: any

      if (this.connectionType === 'connectStraw') {
        // 使用connectStraw函数
        const api = connectStraw({
          config: {
            name: 'testApi',
            rootUrl: this.url.startsWith('http') ? '' : 'https://jsonplaceholder.typicode.com/',
            lib: axios,
          },
          action: {
            testRequest: () => ({
              url: this.url.startsWith('http')
                ? this.url.replace(/^https?:\/\/[^\/]+\//, '')
                : this.url,
              method: this.method,
              headers,
              data: body,
            }),
          },
        })

        result = await api.testRequest()
      } else {
        // 使用ConnectStrawPlus装饰器
        @ConnectStrawPlus({
          name: 'testApi',
          rootUrl: this.url.startsWith('http') ? '' : 'https://jsonplaceholder.typicode.com/',
          lib: axios,
        })
        class TestApi {
          static config: any
          static getRequest: any

          @Get(this.url.replace(/^https?:\/\/[^\/]+\//, ''))
          static testGet() {}

          @Post(this.url.replace(/^https?:\/\/[^\/]+\//, ''))
          static testPost(data: any) {}

          @Put(this.url.replace(/^https?:\/\/[^\/]+\//, ''))
          static testPut(data: any) {}

          @Delete(this.url.replace(/^https?:\/\/[^\/]+\//, ''))
          static testDelete() {}
        }

        // 根据方法类型调用对应的方法
        switch (this.method) {
          case 'GET':
            result = await TestApi.testGet()
            break
          case 'POST':
            result = await TestApi.testPost(body)
            break
          case 'PUT':
            result = await TestApi.testPut(body)
            break
          case 'DELETE':
            result = await TestApi.testDelete()
            break
          default:
            throw new Error(`不支持的HTTP方法: ${this.method}`)
        }
      }

      this.response = JSON.stringify(result, null, 2)
      console.log('API响应:', result)
    } catch (error: any) {
      this.error = error.message || '请求失败'
      console.error('API请求错误:', error)
    } finally {
      this.loading = false
    }
  }

  private resetForm() {
    this.url = 'https://jsonplaceholder.typicode.com/posts/1'
    this.method = 'GET'
    this.headers = '{\n  "Content-Type": "application/json"\n}'
    this.body = '{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}'
    this.response = ''
    this.error = ''
  }

  private loadExample() {
    this.url = 'https://jsonplaceholder.typicode.com/posts'
    this.method = 'POST'
    this.headers = '{\n  "Content-Type": "application/json"\n}'
    this.body = '{\n  "title": "测试标题",\n  "body": "这是一个测试内容",\n  "userId": 1\n}'
  }

  private copyResponse() {
    navigator.clipboard
      .writeText(this.response)
      .then(() => {
        console.log('响应内容已复制到剪贴板')
      })
      .catch((err) => {
        console.error('复制失败:', err)
      })
  }

  private generateCode(): string {
    const url = this.url.startsWith('http')
      ? this.url.replace(/^https?:\/\/[^\/]+\//, '')
      : this.url

    const baseUrl = this.url.startsWith('http') ? '' : 'https://jsonplaceholder.typicode.com/'

    if (this.connectionType === 'connectStraw') {
      return `// 使用 connectStraw 函数
import { connectStraw } from 'strap-trousers'
import axios from 'axios'

const api = connectStraw({
  config: {
    name: 'testApi',
    rootUrl: '${baseUrl}',
    lib: axios,
  },
  action: {
    testRequest: () => ({
      url: '${url}',
      method: '${this.method}',
      headers: ${this.headers || '{}'},
      data: ${this.method !== 'GET' ? this.body || 'undefined' : 'undefined'},
    }),
  },
})

// 发送请求
const result = await api.testRequest()
console.log(result)`
    } else {
      return `// 使用 ConnectStrawPlus 装饰器
import { ConnectStrawPlus, ${this.method} } from 'strap-trousers'
import axios from 'axios'

@ConnectStrawPlus({
  name: 'testApi',
  rootUrl: '${baseUrl}',
  lib: axios,
})
class TestApi {
  @${this.method}('${url}')
  static test${this.method}(${this.method !== 'GET' && this.method !== 'DELETE' ? 'data: any' : ''}) {}
}

// 发送请求
const result = await TestApi.test${this.method}(${this.method !== 'GET' && this.method !== 'DELETE' ? this.body || 'undefined' : ''})
console.log(result)`
    }
  }

  private copyCode() {
    navigator.clipboard
      .writeText(this.generateCode())
      .then(() => {
        console.log('代码已复制到剪贴板')
      })
      .catch((err) => {
        console.error('复制失败:', err)
      })
  }

  private toggleCode() {
    this.showCode = !this.showCode
  }
}
