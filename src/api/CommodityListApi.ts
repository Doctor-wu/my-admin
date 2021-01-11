import {requestFuncs} from "../utils/http"

export const CommodityListApi = {
    getCommodityList: () => requestFuncs.$get("/admin/milktea"),
    addCommodity: (data:any)=>requestFuncs.$post("/admin/milktea", data),
    updateCommodity: (data:any)=>requestFuncs.$put("/admin/milktea", data),
    deleteCommodity: (id:any)=>requestFuncs.$post(`/admin/milktea/${id}`),
    getCommodityCosAllImages: ()=>requestFuncs.$post("/getCosMilkteaImg"),
}
