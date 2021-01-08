export default {

    paramStringify: function paramStringify(data: object): string {
        let result = "";
        Object.keys(data).forEach(key => {
            // @ts-ignore
            result += `${key}=${data[key]}&`
        })
        return result.slice(0, -1);
    }
}
