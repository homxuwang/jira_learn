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
import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from 'dayjs';
import { BrowserRouter,Link } from 'react-router-dom';
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";

//TODO 把所有id改成number类型
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}

//TableProps代表了Table组件的属性类型
interface ListProps extends TableProps<Project> {
    users: User[];
    refresh?: () => void,
    setProjectModalOpen: (isOpen: boolean) => void
}
export const List = ({ users, ...props }: ListProps) => {
  const {mutate} = useEditProject()
  //柯里化编程风格，因为id是比pin先获取到的（pin在点击时才能知道，而project在加载后就知道了），
  // 在调用时的函数就可以简写成 pinProject(project.id)，之前是pin => pinProject(project.id,pin)
  const pinProject = (id:number) => (pin: boolean) => mutate({id,pin}).then(props.refresh)
    return (
        <Table
            pagination={false}
            columns={[
                {
                  title: <Pin checked={true} disabled={true}/>,
                  render(value,project) {
                    return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
                  }
                },
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
                },
                {
                    render(value,project) {
                      return <Dropdown overlay={<Menu>
                        <Menu.Item key={"edit"}>
                          <ButtonNoPadding type={"link"} onClick={() => props.setProjectModalOpen(true)}>编辑</ButtonNoPadding>
                        </Menu.Item>
                      </Menu>}>
                        <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
                      </Dropdown>
                    }
                }

            ]}
            {...props}
        />
    )
}