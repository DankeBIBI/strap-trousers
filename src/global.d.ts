export {}
declare global {
  interface axiosDto {
    // `data` 由服务器提供的响应
    data: object | any
    // `status` 来自服务器响应的 HTTP 状态码
    status: number
    // `statusText` 来自服务器响应的 HTTP 状态信息
    statusText: string | number
    // `headers` 是服务器响应头
    // 所有的 header 名称都是小写，而且可以使用方括号语法访问
    // 例如: `response.headers['content-type']`
    headers: object
    // `config` 是 `axios` 请求的配置信息
    config: object
    // `request` 是生成此响应的请求
    // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
    // 在浏览器中则是 XMLHttpRequest 实例
    request: object
  }
  interface IAxiosRequestDto {
    [key: string]: any
    url: string | number
    /** method 为GET 的时候用 */
    params?: any
    data?: any
    method: string | undefined
    headers?: any
    signal?: AbortSignal
  }
}
