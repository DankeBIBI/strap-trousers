/**
 * 将数组拆分成给定列，并将元素横向前置
 * @param array 拆分的数组
 * @param columns 拆分的列数
 * @param concat 拼合列
 */
export function arrayFoldFront(array: Array<any>, columns: number, concat?: Boolean) {
    if (!Number.isInteger(columns)) throw '请输入整数列'
    let data: any = []
    data = JSON.parse(JSON.stringify(new Array(columns).fill([])))
    let count = data.length - 1
    let cc = 0
    for (const key in array) {
        data[cc].push(array[key])
        cc += 1
        if (cc > count) cc = 0
        continue;
    }
    return concat ? [].concat(...data) : data
}
/**
 * @description 分割数组
 * (溢出的元素会组成一个新的数组)
 * @example
 *  let array = [1,2,3,4,5,6,7,8,9,10]
 *  let data = splitArray( [1,2,3,4,5,6,7,8,9,10],3)
 *  data = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10 ] ]
 * @param array 需要分割的数组
 * @param num 需要分割的组数
 * @return any[][]
 */
export function splitArray(array: any[], num: number): any[][] {
    let data: any[][] = []
    for (const i in array) {
        let index = Number(i)
        if (index % num === 0) {
            data.push(array.slice(index, index + num))
        }
    }
    return data
}

