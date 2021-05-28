/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-07 17:21:09
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-13 10:45:00
 */
import styled from '@emotion/styled';
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from 'context/auth-context';
import React, { useState } from "react";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd';
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { ProjectScreen } from 'screens/project';
import { resetRoute } from 'utils';
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";
/**
 * grid和flex各自的应用场景：
 * 1。 要考虑是一维布局还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发，先有一组内容（数量一般不固定，希望均匀分布在容器中，由内容大小决定占据的空间
 * 从布局出发：先规划网格（数量一般比较固定），然后把元素往里填充
 * 从内容出发用flex
 * 从布局出发用grid
 * @returns 
 */
export const AuthenticatedApp = () => {
    const [projectModalOpen,setProjectModalOpen] = useState(false)
    return (
        <Container>
            <PageHeader setProjectModalOpen={setProjectModalOpen}/>
            <Main>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/projects'} element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen} />} />
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
                        {/* 如果上面的都匹配不到，则跳转到 /projects */}
                        <Navigate to={'/projects'}/>
                    </Routes>
                </BrowserRouter>
            </Main>
            <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
        </Container>
    );
};

const PageHeader = (props:{setProjectModalOpen: (isOpen: boolean) => void}) => {
    return <Header between={true}>
        <HeaderLeft gap={true}>
            <ButtonNoPadding type={'link'} onClick={resetRoute}>
                {/**这样可以用svg形式渲染，可以自定义样式 */}
                <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
            </ButtonNoPadding>
            <ProjectPopover setProjectModalOpen={props.setProjectModalOpen}/>
            <span>用户</span>
        </HeaderLeft>
        <HeaderRight>
            <User />
        </HeaderRight>
    </Header>
}
const User = () => {
    const { logout, user } = useAuth()
    return <Dropdown overlay={<Menu>
        <Menu.Item key={'logout'}>
            <Button type={"link"} onClick={logout}>登出</Button>
        </Menu.Item>
    </Menu>}>
        {/**  e.preventDefault() 防止页面自动刷新*/}
        <Button type={"link"} onClick={e => e.preventDefault()}>
            Hi,{user?.name}
        </Button>
    </Dropdown>
}
const HeaderItem = styled.h3`margin-right: 3rem`

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

//grid-area 用来给grid子元素起名字
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
`;

