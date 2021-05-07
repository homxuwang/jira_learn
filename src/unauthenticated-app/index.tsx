import React,{ useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"

/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-07 17:21:56
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-07 17:35:51
 */
export const UnauthenticatedApp = () => {
    const [isRegister,setIsRegister] = useState(false)

    return <div>
        {
            isRegister ? <RegisterScreen/> : <LoginScreen/>
        }
        <button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '登录':'注册'}</button>
    </div>
}