/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 13:58:10
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-11 10:42:35
 */
import { Input, Select } from 'antd';
import React from 'react';
import { useEffect, useState } from "react";

//定义数据的类型
export interface User {
    name: string;
    id: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    users: User[],
    param: {
        name: string;
        personId: string;
    },
    setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {

    return <form action="">
        <div>
            {/* setParam(Object.assign({},param,{name:evt.target.value})) */}
            <Input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
            <Select value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option value={''}>负责人</Select.Option>
                {
                    users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)
                }
            </Select>
        </div>
    </form>
}