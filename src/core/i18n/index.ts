import config from "../../utils/config";
interface optiopns {
    lang:string | number,
    data: Array<{
        lang: string,
        list: Array<{
            value: string | number
        }>
    }>
}
export class I18N {
    constructor(options: optiopns) {

    }

}