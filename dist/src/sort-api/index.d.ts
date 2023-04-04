interface params {
    rootUrl: string;
    timeout?: number;
    headers?: object;
    prefix?: string;
    apiList: any;
}
export declare class SORT_API {
    private _axios;
    private _apiList;
    constructor(params: params);
    private interceptors;
    request(name: string, data: any): Promise<any>;
}
export {};
