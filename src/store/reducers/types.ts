export interface IActionTypes {
    readonly SETMENUS:Symbol;
    readonly SETROUTETARGET:Symbol;
}

const actionTypes: IActionTypes = {
    SETMENUS: Symbol("SETMENUS"),
    SETROUTETARGET: Symbol("SETROUTETARGET")
}

export {actionTypes}