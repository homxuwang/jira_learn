/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 13:56:30
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-13 18:12:12
 */
import React from 'react';
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce, useDocumentTitle } from 'utils';
import styled from '@emotion/styled';

import { List, Project } from "screens/project-list/list"
import { SearchPanel } from "./search-panel"

// 使用qs来拼接url传的参数
// import * as qs from 'qs';
import { useHttp } from 'utils/http';
import { useProjects } from 'utils/project';
import { Typography } from 'antd';
import { useUsers } from 'utils/user';
import { useUrlQueryParam } from 'utils/url';


export const ProjectListScreen = () => {
    //基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝对不可以放到依赖里
    const [param,setParam] = useUrlQueryParam(['name', 'personId'])
    const debouncedParam = useDebounce(param, 1000)
    const { isLoading, error, data: list } = useProjects(debouncedParam)
    const { data: users } = useUsers()
    useDocumentTitle('项目列表', false)

    return (
        <Constainer>
            <h1>项目列表</h1>
            <SearchPanel users={users || []} param={param} setParam={setParam} />
            {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
            <List loading={isLoading} users={users || []} dataSource={list || []} />
        </Constainer>
    )
}

ProjectListScreen.whyDidYouRender = true

const Constainer = styled.div`
    padding: 3.2rem;
`