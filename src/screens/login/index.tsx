/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-31 09:52:11
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-07 17:06:17
 */
import { useAuth } from 'context/auth-context';
import React, { FormEvent, FormEventHandler } from 'react';

const apiUrl = process.env.REACT_APP_API_URL

export const LoginScreen = () => {
    const {login,user} = useAuth()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        //阻止表单提交的默认行为
        event.preventDefault()
        const username = (event.currentTarget.elements[0] as HTMLFormElement).value
        const password = (event.currentTarget.elements[1] as HTMLFormElement).value

        login({username,password} );
    }
    return (
        <form onSubmit={handleSubmit}>
            {
                user ? <div>
                    登录成功，用户名:{user?.name}
                </div> : null
            }
            
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" id={'username'}/>
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" id={'password'}/>
            </div>
            <button type="submit">注册</button>
        </form>
    )
}