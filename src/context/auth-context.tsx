/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-07 16:04:47
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 15:29:10
 */

import React, { ReactNode, useState } from 'react';
import * as auth from 'auth-provider';
import { User } from "screens/project-list/search-panel";
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';

interface AuthForm {
    username: string,
    password: string
}

const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    //泛型，指定user的类型
    const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>()

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    //这里的 setUser 等于 user => setUser(user) ，名曰point free
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(() => {
        run(bootstrapUser())
    })

    //初始化或加载时
    if(isIdle || isLoading){
        //显示一个全局的加载界面
        return <FullPageLoading />
    }
    //如果有错误
    if(isError){
        return <FullPageErrorFallback error={error}/>
    }

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />;
}

//自定义hook
export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}