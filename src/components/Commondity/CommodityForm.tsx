import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';

import {Form, Image, Input, InputNumber, message, Radio, Select, Spin} from 'antd';
import {Option} from "antd/es/mentions";
import {CommodityListApi} from "../../api/CommodityListApi";
import {typeMap} from "./CommondityTable";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 24},
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

interface CommodityFormProps {
    submitController: JSX.Element
}


let CommodityForm: any = (props: any, ref: any) => {
    const onFinish = (values: any) => {
        console.log(values);
    };
    const onFinishFailed = (errorInfo: any) => {
        message.error(`Failed: ${errorInfo}`);
    };
    const formRef = useRef();
    let [images, setImages] = useState([]);
    let [loading, setLoading] = useState(true);
    useEffect(()=>{
      CommodityListApi.getCommodityCosAllImages().then(res=>{
          setImages(res.data);
          setLoading(false);
      })
    },[])

    const submit = () => {
        return new Promise(((resolve, reject) => {
            // @ts-ignore
            formRef.current.validateFields().then(res => {
                console.log(res)
                CommodityListApi.addCommodity(Object.assign(res, {
                    typeName: typeMap[res.type]
                })).then(res => {
                    console.log(res);
                    message.success("添加成功");
                    resolve(res);
                })
            }).catch((e: any) => {
                message.error("表单校验不通过");
                reject(e);
            });
        }))
    }

    const update = ()=>{
        return new Promise(((resolve, reject) => {
            // @ts-ignore
            formRef.current.validateFields().then(res => {
                console.log(res)
                CommodityListApi.updateCommodity(Object.assign(res, {
                    typeName: typeMap[res.type],
                    id: props.fields.find((field:any)=>field.name === "id")["value"]
                })).then(res => {
                    console.log(res);
                    message.success("修改成功");
                    resolve(res);
                })
            }).catch((e: any) => {
                message.error("表单校验不通过");
                reject(e);
            });
        }))
    }
    useImperativeHandle(ref, () => ({
        form: formRef.current,
        submit,
        update
    }));
    return (
        <Form {...layout}
            // @ts-ignore
              ref={formRef}
              fields={props.fields}
              layout="vertical"
              name="nest-messages"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              validateMessages={validateMessages}
        >
            <Form.Item name="name" label="商品名称" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="price" label="商品价格" rules={[{required: true}, {type: "number"}]}>
                <InputNumber
                    style={{width: "100%"}}
                    formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
            </Form.Item>
            <Form.Item name="type" label="商品类型" rules={[{required: true}]}>
                <Select>
                    <Option value="1">果茶家族</Option>
                    <Option value="2">茗茶/牛乳</Option>
                    <Option value="3">波波家族</Option>
                    <Option value="4">醇香咖啡</Option>
                </Select>
            </Form.Item>
            <Form.Item name="image" label="商品图片" rules={[{required: true}]}>
                {
                    loading
                        ? <Spin/>
                        :<Radio.Group>
                            {images.map(image => {
                                return (
                                    <>
                                        <Radio value={image}>
                                            <Image style={{margin: "5px"}} width={75} src={image}/>
                                        </Radio>
                                    </>
                                )
                            })}
                        </Radio.Group>
                }
            </Form.Item>
        </Form>
    );
};

CommodityForm = forwardRef(CommodityForm);

export default CommodityForm;