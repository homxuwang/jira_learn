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
import { useCallback, useEffect } from "react";
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    const { run, ...result} = useAsync<Project[]>()
    const fetchProjects = useCallback(
      () => client('projects', { data: cleanObject(param || {}) })
      ,[client,param]
    )

    // 当param改变时获取用户列表
    useEffect(() => {
        run(fetchProjects(),{
            retry: fetchProjects
        });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param,run,fetchProjects])

    return result
}

//useEditProject返回一个函数，这样这个函数可以在回调函数中调用（hook函数只能在顶层使用）
export const useEditProject = () => {
    const {run,...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`,{
            method: 'PATCH',
            data: params
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    const {run,...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`,{
            method: 'POST',
            data: params
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}