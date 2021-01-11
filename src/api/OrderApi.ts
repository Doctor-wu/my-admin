import {requestFuncs} from "../utils/http"

export const OrderApi = {
    findAllOrder: () => requestFuncs.$get("/findAllOrder"),
    findAllMakingOrder: () => requestFuncs.$get("/findAllMakingOrder"),
    findAllCompletedOrder: () => requestFuncs.$get("/findAllCompletedOrder"),
    updateOrder: (id:string) => requestFuncs.$get(`/maker/updatestatus?orderID=${id}`)
}
