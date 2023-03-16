import axios from 'axios'
interface params {
    rootUrl: string,
    timeout: number,
    headers: object,
    apiList: any
}
const data = {
    rootUrl: '',
    headers:{

    },
    timeout:1,
    apiList: [
        {
            name: '123',
            url: 'getUserInfo',

        },
        {
            name: '123',
            url: 'getUserInfo'
        },
        {
            name: '123',
            url: 'getUserInfo'
        },
        {
            name: '123',
            url: 'getUserInfo'
        },
    ]
}

class SORT_API {
    constructor(params: params) {
        const { rootUrl, timeout, headers, apiList } = params
        const _axios = axios.create({
            headers:headers,
            timeout: timeout??5000,
            baseURL:rootUrl
        })
    }
}
const create = () => {
}
export {
    create
}