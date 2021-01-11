import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {Modal} from "antd";
import BannerForm from "./BannerForm";

export enum bannerModalMode {
    "attach",
    "edit"
}
export interface bannerModalProps {
    mode: bannerModalMode;
    parent: React.Component;
    children: (showModal:any)=>JSX.Element;
    ModalDataSource?:any
}


let BannerModal:any = (props: bannerModalProps, ref:any)=> {
    let [visible, setVisible] = useState(false);
    let [confirmLoading, setConfirmLoading] = useState(false);
    let [mode, setMode] = useState<bannerModalMode>(bannerModalMode.edit);
    let [fields, setFields] = useState([]);
    let formRef = useRef()
    const showModal = () => {
        setVisible(true);
    };

    const closeModal = ()=>{
        setVisible(false);
        setMode(bannerModalMode.edit);
        // @ts-ignore
        formRef.current.form.resetFields();
        setConfirmLoading(false);
    }
    const handleCancel = () => {
        closeModal();
    };

    const handleOk = () => {
        if(mode === bannerModalMode.edit){
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
                            case bannerModalMode.edit:
                                return "修改banner"
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
                    <BannerForm fields={fields} ref={formRef}/>
            </Modal>
        </>
    )
}
BannerModal = forwardRef(BannerModal);

export default BannerModal;
