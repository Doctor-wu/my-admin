class Pipe{
    public events:{[index:string]: any[]} = {};

    public emit:Function = (evtName:string, ...args:any[])=>{
        this.events?.evtName.forEach((e:any)=>{
            e.apply(null, args);
        })
    }

    public regist:Function = (evtName:string, cb:Function)=>{
        this.events[evtName] = this.events[evtName] || [];
        this.events[evtName].push(cb);
    }
}

function PipeDecorator<T extends {new(...args:any[]):{}}>(constructor:T){
    return class extends constructor {
        public events:{[index:string]: any[]} = {};

        public emit:Function = (evtName:string, ...args:any[])=>{
            this.events?.evtName.forEach((e:any)=>{
                e.apply(null, args);
            })
        }

        public regist:Function = (evtName:string, cb:Function)=>{
            this.events[evtName] = this.events[evtName] || [];
            this.events[evtName].push(cb);
        }
    }
}

export function inheritPipe(func: (...args:any[])=>JSX.Element):typeof func{
    let oldProto = Reflect.getPrototypeOf(func);
    let pipeInstance = new Pipe();
    Reflect.setPrototypeOf(pipeInstance, oldProto);
    Reflect.setPrototypeOf(func, pipeInstance);
    return func;
};

export default PipeDecorator;