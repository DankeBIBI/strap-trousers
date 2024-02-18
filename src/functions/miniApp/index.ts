
interface options {
    lib: any,
    getCurrentPages?: Function
}
interface dot {
    lat: number,
    lng: number
}
interface common {
    showTip: Function,
    setCache: Function,
    getCache: Function,
    deleteCache: Function,
    sleep: Function,
    getLocation: Function,
    getToday: Function,
    calcCoordsDistance: Function,
    common: Function | Object

}
/**
 * @author DANKEBIBI
 * 小程序工具集
 */
export default class MiniAppClass {
    private lib: any
    private getCurrentPages: Function | any
    constructor(options: options) {
        if (!options.lib)
            throw '请配置必要的lib,后续功能基于类提供的lib实现'
        this.lib = options.lib
        this.getCurrentPages = options.getCurrentPages ?? false
    }
    /**
     * @author DANKEBIBI
     * 用于未登录检查，并完全携带页面参数，以onload参数中的turnBackPath参数为登录完成返回
     * 类似使用场景：
     * 扫描商品码，此时用户到商品详情中登录状态为未登录。在用户点击购买可以调用该方法，让用户登录完成并返回该商品详情，参数不会丢失
     * @param lib 传入当前开发框架主体，unipp传入uni,mina传入wx
     * @param path 登录页面路径
     * at 2023年6月21日10:42:10
     */
    haveGotToLogin(path?: string) {
        // let lib:any
        if (!this.getCurrentPages)
            throw '请配置默认的getCurrentPages()'
        if (!path) path = 'pages/login/login'
        const page = this.getCurrentPages()[this.getCurrentPages().length - 1];
        const user = this.lib.getStorageSync('userInfo')
        let turnBackPath = page.route + '?'
        for (const key in page.options) {
            turnBackPath += key + '=' + page.options[key] + '&'
        }
        if (user.length < 1) {
            this.lib.redirectTo({
                url: `/${path}?turnBackPath=/${encodeURIComponent(turnBackPath)}`
            })
        }
    }
    /**
     * @author DANKEBIBI
     * 用于提示消息
     * ！当sec 为 1 ，fn 立即执行。
     * @param msg 提示信息
     * @param sec 显示时间 | 消息显示完成后执行的方法
     * @param fn 消息显示完成后执行的方法
     * @param lib 传入当前开发框架主体，unipp传入uni,mina传入wx
     */
    showTip(msg: string, sec?: number | Function, fn?: Function) {
        let time = typeof sec != 'function' && sec ? sec : 2000
        this.lib.showToast({
            duration: time == 1 ? 2000 : time,
            title: msg,
            icon: 'none',
            success: () => {
                setTimeout(() => {
                    if (typeof sec == 'function')
                        sec()
                    else if (typeof fn == 'function')
                        fn()
                }, time == 1 ? 10 : time);
            }
        }
        )
    }
    /**
     * @author DANKEBIBI
     * 设置本地缓存
     * @param name 缓存名称
     * @param data 缓存内容
     */
    setCache(name: string | number, data: any) {
        try {
            this.lib.setStorageSync(name, data)
        } catch (e) {
            throw this.showTip('创建缓存失败')
        }

    }
    /**
     * @author DANKEBIBI
    * 读取本地缓存
    * @param name 缓存名称
    */
    getCache(name: string | number) {
        try {
            return this.lib.getStorageSync(name)
        } catch (e) {
            throw this.showTip('读取缓存失败')
        }
    }
    /**
     * @author DANKEBIBI
    * 删除本地缓存
    * @param name 缓存名称
    */
    deleteCache(name: string | number) {
        try {
            this.lib.removeStorageSync(name)
        } catch (e) {
            throw this.showTip('删除缓存失败')
        }
    }
    /**
     * @author DANKEBIBI
     * 同步睡眠
     * @param time 
     * @returns 
     */
    sleep(time: number) {
        return new Promise((src) => setTimeout(src, time))
    }
    /**
     * 获取经纬度
     * @param failFn 当获取失败时要执行的逻辑
     * @returns 
     */
    getLocation(failFn: Function) {
        return new Promise((success, fail_) => {
            this.lib.getLocation({
                type: 'wgs84',
                success(res: any) {
                    success({ lat: res.latitude, lng: res.longitude })
                },
                fail(fail: any) {
                    if (typeof failFn == 'function')
                        failFn()
                    fail_({ lat: false, lng: false })
                }
            })
        })
    }
    /**
     * 获取当天时间
     * @param state 状态
     * @returns 
     */
    getToday(state: string) {
        const date = new Date()
        const now = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}${state == 'now' ? ` ${now}` : ''}`
    }
    /**
     * 半正矢 求两组经纬的直线距离
     * 传两组经纬度，对象形式，
     * {
     *  lat,
     *  lng
     * }
     * @param {Object.<number,number>} startDot 
     * @param  {Object.<number,number>} endDot 
     * @returns {
     * mVal:米
     * kmVal:千米
     * originVal:米（无单位）
     * }
    */
    calcCoordsDistance(startDot: dot, endDot: dot) {
        if (!startDot || !endDot) {
            return {
                mVal: "",
                kmVal: "",
                originVal: "两点的经纬度为必传"
            };
        }

        function getRadian(d: number) {
            return (d * PI) / 180.0;
        }
        const earthRadius = 6378137.0, // 地球半径
            PI = Math.PI, // 圆周率π
            startRadianLat = getRadian(startDot.lat), // 纬度 - 开始
            endRadianLat = getRadian(endDot.lat), // 纬度 - 结束
            latDiffVal = startRadianLat - endRadianLat, // 维度差值
            lngDiffVal = getRadian(startDot.lng) - getRadian(endDot.lng), // 经度差值
            latDiffSinVal = Math.sin(latDiffVal / 2), // 维度差值的正弦值
            lngDiffSinVal = Math.sin(lngDiffVal / 2), // 经度差值的正弦值
            latCosProduct = Math.cos(startRadianLat) * Math.cos(endRadianLat), // 维度的余弦值乘积
            powVal = latCosProduct * Math.pow(lngDiffSinVal, 2),
            sqrtVal = Math.pow(latDiffSinVal, 2) + powVal, // 开平方根的值
            result = 2 * Math.asin(Math.sqrt(sqrtVal)) * earthRadius, // 结果值
            mUnit = result.toFixed(2) + "m", // 单位米
            kmUnit = (result / 1000).toFixed(5) + "km"; // 单位千米
        return { mVal: mUnit, kmVal: kmUnit, originVal: result.toFixed(0) };
        // return result.toFixed(0)
    }
    common() {
        // let common: any = {
        //     showTip: this.showTip,
        //     haveGotToLogin: this.getCurrentPages ? this.haveGotToLogin : ()=>{},
        //     setCache: this.setCache,
        //     getCache: this.getCache,
        //     deleteCache: this.deleteCache,
        //     sleep: this.sleep,
        //     getLocation: this.getLocation,
        //     getToday: this.getToday,
        //     calcCoordsDistance: this.calcCoordsDistance
        // }
        // for (const key in common) {
        //     if (typeof common[key] != 'boolean')
        //     // console.log(common[key]);
        //         common[key].prototype.lib =  'lib'
        // }
        // return common
    }
}
