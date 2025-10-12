import { StApiTester } from './components/st-api-tester/index.js'
import { StConsole } from './components/st-console/index.js'
import { StDecoratorTester } from './components/st-decorator-tester/index.js'
import { StFeatureTester } from './components/st-feature-tester/index.js'
import { StPlayground } from './components/st-playground/index.js'
import { safeDefineElement } from './utils/custom-element.js'

// 注册所有自定义元素，避免重复注册
safeDefineElement('st-playground', StPlayground)
safeDefineElement('st-console', StConsole)
safeDefineElement('st-feature-tester', StFeatureTester)
safeDefineElement('st-api-tester', StApiTester)
safeDefineElement('st-decorator-tester', StDecoratorTester)

// 添加一些全局样式
const style = document.createElement('style')
style.textContent = `
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f5f5f5;
  }

  #app {
    min-height: 100vh;
  }
`
document.head.appendChild(style)