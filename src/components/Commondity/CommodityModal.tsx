import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {message, Modal} from "antd";
import CommodityForm from "./CommodityForm";
import {log} from "util";

export enum commodityModalMode {
    "attach",
    "edit"
}
export interface commodityModalProps {
    mode: commodityModalMode;
    parent: React.Component;
    children: (showModal:any)=>JSX.Element;
    ModalDataSource?:any
}


let CommodityModal:any = (props: commodityModalProps,ref:any)=> {
    let [visible, setVisible] = useState(false);
    let [confirmLoading, setConfirmLoading] = useState(false);
    let [mode, setMode] = useState<commodityModalMode>(commodityModalMode.attach);
    let [fields, setFields] = useState([]);
    let formRef = useRef()
    const showModal = () => {
        setVisible(true);
    };

    const closeModal = ()=>{
        setVisible(false);
        setMode(commodityModalMode.attach);
        // @ts-ignore
        formRef.current.form.resetFields();
        setConfirmLoading(false);
    }
    const handleCancel = () => {
        closeModal();
    };

    const handleOk = () => {
       if(mode === commodityModalMode.attach){
           // @ts-ignore
           formRef.current.submit().then(_=>{
               // @ts-ignore
               props.parent.refresh()
               closeModal();
               // @ts-ignore
           }).catch(_=>{
               setConfirmLoading(false);
           })
       } else if(mode === commodityModalMode.edit){
           // @ts-ignore
           formRef.current.update().then(_=>{
               // @ts-ignore
               props.parent.refresh()
               closeModal();
               // @ts-ignore
           }).catch(_=>{
               setConfirmLoading(false);
           })
       }
        setConfirmLoading(true);
    };



    const updateState = (state:any)=>{
        state.mode && setMode(state.mode);
        state.fields && setFields(state.fields);
    }

        useImperativeHandle(ref, () => ({
        showModal: showModal,
        updateState
    }));

    return (
        <>
            {
                props.children(showModal)
            }
            <Modal
                title={
                    (() => {
                        switch (mode) {
                            case commodityModalMode.attach:
                                return "添加商品"
                            case commodityModalMode.edit:
                                return "修改商品"
                        }
                    })()
                }
                visible={visible}
                okText={"提交"}
                cancelText={"取消"}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                    <CommodityForm fields={fields} ref={formRef}/>
            </Modal>
        </>
    )
}
CommodityModal = forwardRef(CommodityModal);

export default CommodityModal;