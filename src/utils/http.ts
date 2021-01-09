import axios from "axios";
import {JumpRoute} from "../Layout/Slide/Slide";
import {notification} from "antd";

const HttpRequest = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    // withCredentials: true,
    timeout: 40000
})

HttpRequest.interceptors.request.use(
    config => {

        // TODO
        // if (getToken()) {}
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

HttpRequest.interceptors.response.use(
    response => {
        const res = response.data
        return res;
    },
    error => {
        const code = error.response?.status
        if (code === 403) {
            JumpRoute("/Login");
            notification.warn({
                message: "用户未登录或认证已失效"
            })
        }
        return Promise.reject(error)
    }
)


const genRequestFunction = (methods: Array<string>) => {
    methods.forEach(method => {
        // @ts-ignore
        requestFuncs[`$${method}`] = (url: string, ...rest: any[]): Promise<any> => {
            // @ts-ignore
            return HttpRequest[method](url, ...rest)
        }
    })
}

const methods = ["get", "post", "put", "delete"];

type httpFuncs = (...args: any) => Promise<any>;
type requestFuncsSign = {
    $get: httpFuncs;
    $post: httpFuncs;
    $put: httpFuncs;
}
// @ts-ignore
export const requestFuncs: requestFuncsSign = {};
genRequestFunction(methods);


export default HttpRequest;
