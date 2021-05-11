/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 13:57:34
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-11 10:39:06
 */
import React from 'react';
import {User} from "screens/project-list/search-panel"
import {Table} from 'antd'
interface Project{
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
}

interface ListProps {
    list: Project[],
    users: User[]
}
export const List = ({list,users}:ListProps) => {
    return (
    <Table 
        pagination={false} 
        columns={[
        {
            title: '名称',
            dataIndex: 'name',
            //按中文字符进行排序
            sorter: (a,b) => a.name.localeCompare(b.name)
        } ,{
            title: '负责人',
            render(value,project) {
                return <span>
                        {users.find(user => user.id === project.personId)?.name || '未知'}
                </span>
            }
        }
        ]} 
        dataSource={list}/>
    )
}