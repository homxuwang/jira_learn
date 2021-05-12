/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 13:57:34
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 22:19:54
 */
import React from 'react';
import { User } from "screens/project-list/search-panel"
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs';
import { BrowserRouter,Link } from 'react-router-dom';

//TODO 把所有id改成number类型
export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created: number;
}

//TableProps代表了Table组件的属性类型
interface ListProps extends TableProps<Project> {
    users: User[]
}
export const List = ({ users, ...props }: ListProps) => {
    return (
        <Table
            pagination={false}
            columns={[
                {
                    title: '名称',
                    //按中文字符进行排序
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render(value, project) {
                        return <Link to={String(project.id)}>{project.name}</Link>
                        
                    }
                },
                {
                    title: '部门',
                    dataIndex: 'organization'
                },
                {
                    title: '负责人',
                    render(value, project) {
                        return <span>
                            {users.find(user => user.id === project.personId)?.name || '未知'}
                        </span>
                    }
                },
                {
                    title: '创建时间',
                    render(value, project) {
                        return <span>
                            {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                        </span>
                    }
                }
            ]}
            {...props}
        />
    )
}