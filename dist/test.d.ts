declare const list: any;
declare const success: (res: any) => void;
declare const fail: (res: any) => void;
declare const beforeRequest: (data: any) => void;
declare const requestFail: (data: any) => void;
export { list, success, fail, beforeRequest, requestFail };
