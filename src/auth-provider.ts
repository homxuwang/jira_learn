/*
 * @Description  : //真实环境中如果使用了firebase等第三方auth服务的话，本文件可以不需要开发者开发
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-07 15:20:26
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-07 16:38:33
 */
import {User} from "screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__';

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}:{user:User}) => {
    window.localStorage.setItem(localStorageKey,user.token || '')
    return user
}

export const login = ( data: { username : string, password : string }) => {
    return fetch(`${apiUrl}/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response:Response) => {
        if(response.ok){
            return handleUserResponse(await response.json())
        }else{
            return Promise.reject(data)
        }
    });
}

export const register = ( data: { username : string, password : string }) => {
    return fetch(`${apiUrl}/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response:Response) => {
        if(response.ok){
            return handleUserResponse(await response.json())
        }else{
            return Promise.reject(data)
        }
    });
}

//加个async保证返回的是一个Promise，使其能用then方法
export const logout = async () => window.localStorage.removeItem(localStorageKey)