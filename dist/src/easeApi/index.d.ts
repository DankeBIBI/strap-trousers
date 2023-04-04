interface apiList {
    fn?: string | number;
    list: Array<{
        name: string | number;
        url: string | number;
        method: string;
    }>;
}
interface DATA {
    rootUrl: string;
    timeout?: number;
    headers?: object;
    apiList: Array<apiList>;
    interceptors?: {
        success?: Function;
        fail?: Function;
        beforeRequest?: Function;
        requestFail?: Function;
    };
    params?: Object;
    adapter?: Function;
    data?: Object;
}
export declare class createConnect {
    private _axios;
    private _rootUrl;
    private _headers?;
    private _timeout?;
    private _params?;
    private _data?;
    private _apiList;
    private _success?;
    private _fail?;
    private _beforeRequest?;
    private _requestFail?;
    private _adapter?;
    constructor(DATA: DATA);
    private interceptors;
    private sortFunction;
    private getData;
}
export {};
