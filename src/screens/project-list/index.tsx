/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 13:56:30
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-13 20:14:14
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
import { Button,Typography } from "antd";
import { useUsers } from 'utils/user';
import { useUrlQueryParam } from 'utils/url';
import { useProjectSearchParams } from "./util";
import { Row } from "../../components/lib";


//基本类型可以放在依赖里；组件状态可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
export const ProjectListScreen = (props:{setProjectModalOpen: (isOpen: boolean) => void}) => {
    useDocumentTitle('项目列表', false)
    const [param,setParam] = useProjectSearchParams()
    const { isLoading, error, data: list,retry } = useProjects(useDebounce(param, 200))
    const { data: users } = useUsers()

    return (
        <Constainer>
          <Row between={true}>
            <h1>项目列表</h1>
            <Button onClick={() => props.setProjectModalOpen(true)}>创建项目</Button>
          </Row>
            <SearchPanel users={users || []} param={param} setParam={setParam} />
            {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
            <List
              setProjectModalOpen={props.setProjectModalOpen}
              refresh={retry}
              loading={isLoading}
              users={users || []} dataSource={list || []} />
        </Constainer>
    )
}

ProjectListScreen.whyDidYouRender = true

const Constainer = styled.div`
    padding: 3.2rem;
`