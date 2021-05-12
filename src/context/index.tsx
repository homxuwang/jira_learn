/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-07 16:04:40
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 10:03:45
 */

import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import {QueryClient, QueryClientProvider} from 'react-query'
export const AppProviders = ({children} : {children:ReactNode}) => {
    return(
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>
                    {children}
            </AuthProvider>
        </QueryClientProvider>
    ) 
}