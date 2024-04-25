/**
 * 给一个对象赋予另外一个对象相同键 的值 
 * @returns targetSource
 */
export function copyValueOfTheSameKey(options: {
    /**数据源 提供复制值的源对象 */
    dataSource: object & {
        [index: number]: string
    },
    /**目标源 将数据源的值复制 */
    targetSource: object & {
        [index: number]: string
    },
    /**排除（跳过）目标源不需复制的键 */
    exclude?: Array<string>
}) {
    const { dataSource, targetSource, exclude } = options
    for (const i in dataSource) {
        if (exclude && exclude.includes(i)) continue
        if (targetSource[i] == undefined) continue
        targetSource[i] = dataSource[i]
    }
    return targetSource
}
/**
 * 删除相同且没更改的值
 * @param data 
 * @examole
 * {
 * 常用于提交修改表单时处理无修改的数据
 * }
 * @returns  after
 */
export function deleteSameKeyOfTheSameValue(options: {
    /** 改变前的数组 */
    befor: object & {
        [index: number]: string
    };
    /**改变后的数组 */
    after: object & {
        [index: number]: string
    };
    /**排除的值 */
    exclude?: Array<string|number>;
}) {
    const { exclude,befor,after } = options
    for (const i in after) {
        for (const j in befor) {
            if (i == j && after[i] == befor[j]) {
                if (exclude && !exclude.includes(i)) delete after[i];
                if (!exclude) delete after[i];
            }
        }
    }
    return after;
}