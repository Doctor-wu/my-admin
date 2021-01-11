import {requestFuncs} from "../utils/http"

export const IndexApi = {
    get7DayRevenueInfo: () => requestFuncs.$get("/get7DayRevenueInfo"),
    uploadBanner: () => requestFuncs.$post("/admin/uploadBannerImgUrl")
}
