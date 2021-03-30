/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 13:58:10
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-03-30 11:14:19
 */
import React from 'react';
import { useEffect, useState } from "react";
 
//定义数据的类型
export interface User {
    name: string;
    id: string;
    email: string;
    title: string;
    organization: string;
}
 
interface SearchPanelProps {
    users: User[],
    param: {
        name: string;
        personId: string;
    },
    setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({users, param,setParam}:SearchPanelProps) => {
   
    return <form action="">
        <div>
            {/* setParam(Object.assign({},param,{name:evt.target.value})) */}
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })}/>
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId: evt.target.value
            })}>
                <option value={''}>负责人</option>
                {
                    users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                }
            </select>
        </div>
    </form>
}