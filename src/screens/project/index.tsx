/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-12 22:04:42
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-13 10:42:36
 */
import React from 'react'
import { Link} from 'react-router-dom'
import { Route, Routes, Navigate } from 'react-router'
import { KanbanScreen } from 'screens/kanban'
import { EpicScreen } from 'screens/epic'

export const ProjectScreen = () => {
    return <div>
        <h1>projectscreen</h1>
        {/* Link中的to 不加/ 则不是根路由，而是自动在url后面append，否则就会变成localhost:3000/kanban */}
        <Link to={'kanban'}>看板</Link>
        <Link to={'epic'}>任务组</Link>
        <Routes>
            {/* projects/:projectId/kanba */}
            <Route path={'/kanban'} element={<KanbanScreen />} />
            {/* projects/:projectId/epic */}
            <Route path={'/epic'} element={<EpicScreen />} />
            <Navigate to={window.location.pathname + '/kanban'} />
        </Routes>
    </div>

}