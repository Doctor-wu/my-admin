import {requestFuncs} from "../utils/http"
import helper from "../utils/helper";



export const LoginApi = {
    login: (data: any) => requestFuncs.$post("/admin/login", helper.paramStringify(data),{
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
}
