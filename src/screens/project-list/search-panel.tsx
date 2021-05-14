/** @jsxImportSource @emotion/react */
/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 13:58:10
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 08:54:25
 */
import {jsx} from '@emotion/react';
import React from 'react';
import {Form, Input, Select } from 'antd';
import { Project } from "./list";
import { UserSelect } from "../../components/user-select";

//定义数据的类型
export interface User {
    name: string;
    id: number;
    email: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    users: User[],
    //选取Project中的name和personId类型
    param: Partial<Pick<Project, 'name' | 'personId'>>,
    setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {

    return (
    <Form css={{marginBottom: '2rem','>*':''}} layout={"inline"}>
        <Form.Item>
            {/* setParam(Object.assign({},param,{name:evt.target.value})) */}
            <Input 
                placeholder={'项目名'}
                type="text" 
                value={param.name} onChange={evt => setParam({
                    ...param,
                    name: evt.target.value
            })} />
        </Form.Item>
        <Form.Item>
            <UserSelect
              defaultOptionName={'负责人'}
              value={param.personId}
              onChange={value => setParam({
                ...param,
                personId: value
              })} />
        </Form.Item>
    </Form>
    )
}
