/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-07 16:04:47
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-07 17:02:48
 */

import React,{ReactNode, useState} from 'react';
import * as auth from 'auth-provider';
import {User} from "screens/project-list/search-panel";

interface AuthForm {
    username: string,
    password: string
}

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}:{children:ReactNode}) => {
    //泛型，指定user的类型
    const [user,setUser] = useState<User | null>(null)

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    //这里的 setUser 等于 user => setUser(user) ，名曰point free
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    return <AuthContext.Provider children={children} value={{user,login,register,logout}} />;
}

//自定义hook
export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}