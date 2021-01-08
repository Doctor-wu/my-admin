import {requestFuncs} from "../utils/http"

export const CommodityListApi = {
    getCommodityList: () => requestFuncs.$get("/admin/milktea")
}
