/**检测必填字段 */
export function checkRequiredField(options: {
  /**输入一个对象数组或者对象 */
  target: Array<object> | object | any
  /**需要检查的键 键名为检测键，值为提示
     * @example
       checkKey: {
            id: 'id不能为空'
          }
     *
    */
  checkKey: object | any
}) {
  let nullKey = ''
  const { target, checkKey } = options
  if (target.length == undefined) {
    for (const i in target) {
      let item = target[i]
      for (const k in checkKey) {
        if (!item[k] && nullKey.indexOf(checkKey[k]) == -1) nullKey += checkKey[k] + ','
      }
    }
  } else {
    for (const i in target) {
      for (const _j in target[i]) {
        let item = target[i]
        for (const k in checkKey) {
          if (!item[k] && nullKey.indexOf(checkKey[k]) == -1) nullKey += checkKey[k] + ','
        }
      }
    }
  }
  if (nullKey) {
    nullKey += '不能为空'
    return false
  }
  return true
}
