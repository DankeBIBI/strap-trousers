const config = require('./package.json')
const fs = require('fs')
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
function writeConfig(data) {
    fs.writeFileSync('./dist/package.json', JSON.stringify(data), () => { })
    fs.writeFileSync('./package.json', JSON.stringify(data), () => { })
}
/**复制文件 */
function copyStyleFile() {
    let style = fs.readFileSync('./src/style/index.css')
    let readme = fs.readFileSync('./README.md')
    let LICENSE = fs.readFileSync('./LICENSE')
    fs.writeFileSync('./dist/README.md', readme, () => {
    })
    fs.writeFileSync('./dist/LICENSE', LICENSE, () => {
    })
    function write() {
        fs.writeFileSync('./dist/style/index.css', style, () => {
        })
    }
    try {
        write()
    } catch (e) {
        fs.mkdirSync('./dist/style')
        write()
    }
}
function deleteTestFile() {
    fs.existsSync('./dist/test.js')
    fs.existsSync('./dist/test.d.ts')
}
function main() {
    setVersion()
}
main()