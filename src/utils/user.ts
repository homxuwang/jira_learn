import { User } from "screens/project-list/search-panel";
import { useHttp } from 'utils/http'
import { useAsync } from 'utils/use-async';
import { useEffect } from 'react'
import { cleanObject } from 'utils/index'

/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-12 15:09:36
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 15:11:52
 */
export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    const { run, ...result} = useAsync<User[]>()


    // 当param改变时获取用户列表
    useEffect(() => {
        run(client('users', { data: cleanObject(param || {}) }))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return result
}