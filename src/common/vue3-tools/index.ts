/**
 * vue3 设置全局参数
 * @param app vue3 app
 * @param properties 提供一个json格式的对象，键值赋值给app。全局对象调用时为app[键名]、app.键名
 * @example 用法：
 * 在main.js/ts 调用 vue3GlobalProperties()
 * 
 * @example 场景：
 * main.js/ts：
 * const app = createApp(App)
 * const properties = {
 *      test:'测试'
 * }
 * vue3GlobalProperties(app,properties)
 * component/page：
 * import {getCurrentInstance } from 'vue'
 * const app = getCurrentInstance().proxy
 * console.log(app.test); //输出 '测试'
 * 
 */
export function vue3GlobalProperties(app: any, properties: Object) {
    const list: any = properties
    for (const key in list) {
        app.config.globalProperties[key] = list[key]
    }

}