import {requestFuncs} from "../utils/http"
import helper from "../utils/helper";

export const BannerApi = {
    getBannerList: () => requestFuncs.$get("/getBannerImgUrl"),
    uploadBanner: (data: any) => requestFuncs.$post("/admin/uploadBannerImgUrl", helper.paramStringify(data), {
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }),
    getBannerCosAllImages: () => requestFuncs.$post("/getCosBannerImg")
}
