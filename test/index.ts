import axios from "axios";
import { connectStraw } from "../src"
const api = connectStraw({
    config: {
        lib: axios,
        name: "test",
        rootUrl: 'http://127.0.0.1:8202/',
        interceptors: {
            success: (e: any) => {
                // console.log(e);
            }
        },
        headers: {
            'Token': () => {
                return new Date().getTime()
            }
        }
    },
    action: ({
        POST
    }) => {
        go: POST('/go')
    }
});
async function a() {
    const res = await api
}
a()


// const a = (e:{
//     fn:()=>?
// }) =>{

// }