/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-07 17:22:05
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 10:12:00
 */
import { useAuth } from 'context/auth-context';
import React from 'react';
import { Form, Input } from 'antd'
import {LongButton} from './index'

// const apiUrl = process.env.REACT_APP_API_URL

export const RegisterScreen = () => {
    const {register} = useAuth()

    //这里的username和password与<Form.Item>中的name属性值对应
    const handleSubmit = (values: { username: string, password: string }) => {
        register(values);
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder={'用户名'} type="text" id={'username'} />
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder={'密码'} type="password" id={'password'} />
            </Form.Item>
            <Form.Item>
                <LongButton htmlType={'submit'} type="primary">注册</LongButton>
            </Form.Item>
        </Form>
    )
}