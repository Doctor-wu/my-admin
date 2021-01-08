import {requestFuncs} from "../utils/http"

console.log(requestFuncs)
export const CommodityListApi = {
    getCommodityList: () => requestFuncs.$get("/admin/milktea")
}
