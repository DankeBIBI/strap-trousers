const config = require('./package.json')
const fs = require('fs')
/**设置版本号 */
function setVersion(maxPointVersion = 99) {
    let __config = config
    let __VERSION = __config.version ?? '1.0.0'
    let list = __VERSION.split('.')
    let lastIndex = list.length - 1
    if (list[lastIndex] < maxPointVersion) {
        list[lastIndex] = String(Number(list[lastIndex]) + 1)
    } else {
        list[lastIndex - 1] = String(Number(list[lastIndex - 1]) + 1)
        list[lastIndex] = 0
    }
    let NEW_VERSION = list.join('.')
    __config.version = NEW_VERSION
    writeConfig(__config)
    copyStyleFile()
    deleteTestFile()
}
/**写入版本信息 */
function writeConfig(data) {
    fs.writeFileSync('./dist/src/package.json', JSON.stringify(data), () => { })
    fs.writeFileSync('./package.json', JSON.stringify(data), () => { })
}
/**复制文件 */
function copyStyleFile() {
    let style = fs.readFileSync('./src/style/index.css')
    let readme = fs.readFileSync('./README.md')
    let LICENSE = fs.readFileSync('./LICENSE')
    fs.writeFileSync('./dist/src/README.md', readme, () => {
    })
    fs.writeFileSync('./dist/src/LICENSE', LICENSE, () => {
    })
    function write() {
        fs.writeFileSync('./dist/src/style/index.css', style, () => {
        })
    }
    try {
        write()
    } catch (e) {
        fs.mkdirSync('./dist/src/style')
        write()
    }
}
/**删除测试文件 */
function deleteTestFile() {
    fs.existsSync('./dist/src/test.js')
    fs.existsSync('./dist/src/test.d.ts')
}
/**执行 */
function main() {
    setVersion()
}
main()