/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-12 14:50:28
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 15:00:01
 */
import { useAsync } from 'utils/use-async';
import { Project } from 'screens/project-list/list'
import { useEffect } from 'react'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    const { run, ...result} = useAsync<Project[]>()


    // 当param改变时获取用户列表
    useEffect(() => {
        run(client('projects', { data: cleanObject(param || {}) }))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return result
}