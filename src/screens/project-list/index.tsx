/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 13:56:30
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-08 16:10:32
 */
import React from 'react';
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from 'utils';

import { List } from "./list"
import { SearchPanel } from "./search-panel"

// 使用qs来拼接url传的参数
import * as qs from 'qs';
import { useHttp } from 'utils/http';

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    const debouncedParam = useDebounce(param, 1000)
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])
    const client = useHttp()

    // 当param改变时获取用户列表
    useEffect(() => {
        client('projects', { data: cleanObject(debouncedParam) }).then(setList)
    }, [debouncedParam])

    useMount(() => {
        client('users').then(setUsers)
    })

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}