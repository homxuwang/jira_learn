/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-07 16:04:40
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-07 17:03:27
 */

import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({children} : {children:ReactNode}) => {
    return <AuthProvider>
        {children}
    </AuthProvider>
}