import {requestFuncs} from "../utils/http"


export const UserApi = {
    getUserInfo: () => requestFuncs.$post("/admin/getAdminInfo")
}
