import {requestFuncs} from "../utils/http"

export const BannerApi = {
    getBannerList: () => requestFuncs.$get("/getBannerImgUrl"),
    uploadBanner: () => requestFuncs.$post("/admin/uploadBannerImgUrl")
}
