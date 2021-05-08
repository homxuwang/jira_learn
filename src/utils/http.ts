/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-08 15:31:00
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-08 16:16:00
 */
import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends ResponseInit {
    token?: string,
    data?: object
}

//{ data, token, headers, ...customConfig }: Config = {}，设置为Config有默认值，当一个参数有默认值的时候，它自动变成可选的参数
export const http = async (
        endpoint: string, 
        { data, token, headers, ...customConfig }: Config = {}
    ) => {

    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            "Content-Type": data ? 'application/json' : '',
        },
        //这里customConfig写在后面，它的值会覆盖前面的值，也就是说即使前面写死了方法为GET，
        //但是仍可以被覆盖为POST或其他方法
        ...customConfig,
    };
    
    //如果是GET方法，则需要的参数直接加在URL后面
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        //如果不是GET方法，则把参数加在body中带过去
        config.body = JSON.stringify(data || {});
    }

    //axios 和featch的表现不一样，它可以直接返回状态不为2xx的时候抛出异常
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async response => {
            //如果用户未授权（未登录或token失效），则要退出登录
            if (response.status === 401) {
                await auth.logout()
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

//定义一个方法可以自动携带jwtToken
export const useHttp = () => {
    const { user } = useAuth()
    //因为[endpoint,config]和http函数的参数类型一致，所以可以直接使用Parameters<typeof http>获取它的类型
    //使用...操作符可以把[]中的东西“解放出来”，而不用每次传参都要用[]进行包裹
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}