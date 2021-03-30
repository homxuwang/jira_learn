/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 13:57:34
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-03-30 11:15:51
 */
import React from 'react';
import {User} from "screens/project-list/search-panel"

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
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                    {/* undefined.name */}
                    {/* 加问号表示如果前面的值是undefined，那么整个表达式的值都是undefined */}
                    <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
                </tr>)
            }
        </tbody>
    </table>
}