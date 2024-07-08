<p align="center">
<p align="center">
<img src="https://pd-base.oss-cn-heyuan.aliyuncs.com/strap-trousers.png" width="100px" style="border-radius:50px;box-shadow:#B5B5B5 2px 2px 10px;"/>
<a style="font-size:50px;text-shadow:#B5B5B5 0px 2px 5px; ">🐣</a>
</p>
 <h1 align="center" style="text-shadow:#767676 0px 2px 5px;">
    Strap-Trousers🍼
 </h1>
 </br>
</p>
 <p align="center">
    <img src="https://badgen.net/badge/🍭/typeScript/blue?icon=typescript" alt="npm package">
     <strong>&</strong>
    <a href="https://www.npmjs.com/package/strap-trousers"><img src="https://badgen.net/badge/🐣/Strap-Trousers/cyan?icon=npm" alt="npm package"> </a>
    <p align="center">
  <a href="https://www.npmjs.com/package/strap-trousers">
    <img src="https://badgen.net/npm/v/strap-trousers" alt="npm package">
  </a>
    <img src="https://badgen.net/npm/dt/strap-trousers" alt="npm package">
    <img src='https://badgen.net/badge/icon/typescript?icon=typescript&label'/>
</p>

 </p>

---

## 基本模块

#### 🐣 <a href="https://www.npmjs.com/package/strap-trousers">strap-trousers</a> <a><img src="https://badgen.net/npm/v/strap-trousers" alt="npm package"></a>

## 说明
> 在strap-trousers中
  connectStraw模块用于解决、减轻在项目中api请求封装遇到的问题和时间，同时让请求封装不再繁琐
  同时，在strap-trousers/common/mixComputing中也有分类好常用的js计算方法

---
## 基本使用
### 安装
#### npm | pnpm
```
$ npm i strap-trousers
```
#### yarn  
```
$ yarn add strap-trousers
```
### 使用 StrawApi
```js
import { connectStraw } from "strap-trousers";
import axios from "axios"
const test = connectStraw({
    config: {
        //使用请求库
        lib: axios,
        name: "test",
        rootUrl: 'http://127.0.0.1:8202/',
    },
    action: {
        //函数写法
        list1: () => ({
            url: 'user/list',
            method: "GET",
        }),
          //对象写法
        list2: {
            url: 'user/list',
            debounce: true,
            method: "GET",
            //Typescript工程下 api.object会继承fn()的出入参类型
            fn() {
                return {} as {
                    data: string
                    value: string
                }
            }
        }
    }
})

(async function(){
    const res1 = test.list1()
    const res2 = test.list2()
})()
```
## 更新情况

- ### 2024-07-08

        ✨增加 
            | 【test】模块
            | 统一使用package.json的version
- ### 2024-06-08

        🦄重构 
            |【straw】中请求体使用iife方式，减少请求判断，优化请求实际执行速度
            
- ### 2024-04-29

        🐞修复 
            | 修复小程序使用【straw】时地址拼接不完整问题
            | 修复小程序使用【straw】时没有合并请求参数问题

- ### 2024-04-25

        🦄重构 优化项目结构
            | 关闭冗余导出
            | 增加部分描述
            | 原functions移动至common

- ### 2024-03-28

        ✨增加 【strawApi】 返回值：实例、参数、缓存池
        🐞修复 【strawApi】 当请求失败时，没有删除当前请求缓存

- ### 2024-02-18

        🐞修复 【strawApi】 公共data不生效问题
           | 增加部分描述

- ### 2024-02-02

        ✨ 测试 Fetch
        ✨ 修改StrawApi拦截器
        ✨ 修改EaseApi拦截器

- ### 2024-01-15

        🦄 refactor(抽离Axios)
        🦄 refactor(抽离小程序适配器)
        ✨ feat(【StrawApi】) : 相比easeApi，更好地对输入类型支持。写法略有不同

- ### 2023-08-31

         1:修复使用 axios 请求时，没有拼接传入的params
         2:增加 axios 动态 header 、 params。
         使用时在createConnect中的 header|params 中需要动态数据的参数中
         传一个return动态参数 的方法即可
