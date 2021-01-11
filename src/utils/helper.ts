
export default {

    paramStringify: function paramStringify(data: object): string {
        let result = "";
        Object.keys(data).forEach(key => {
            // @ts-ignore
            result += `${key}=${data[key]}&`
        })
        return result.slice(0, -1);
    },

    formatDate(str:string,template:string="{0}-{1}-{2}-{3}-{4}-{5}"){
        let nums:any = str.match(/\d+/g);
        return template.replace(/\{(\d+)\}/g,(substring: string, ...args: any[])=>{
            return nums[args[0]];
        })
    }
}
