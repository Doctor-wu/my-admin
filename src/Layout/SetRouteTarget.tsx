import React from 'react';
import {actionTypes} from "../store/reducers/types";

const SetRouteTarget = (props: { [index: string]: any }) => {
    props.dispatch!({
        type: actionTypes.SETROUTETARGET,
        target: props.route,
    });
    console.log(props)
    return (
        <></>
    );
}

export default SetRouteTarget;
