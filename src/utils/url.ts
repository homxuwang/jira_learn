/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-13 15:00:46
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-13 20:16:00
 */

import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

//返回页面url中，指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()
    return [
        useMemo(
            () => keys.reduce((prev, key) => {
                //[key]表示key是一个变量
                return { ...prev, [key]: searchParams.get(key) || '' }
            }, {} as { [key in K]: string }),
            [searchParams]
        ),
        (params: Partial<{ [key in K]: unknown }>) => {
            const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
            return setSearchParam(o)
        }
    ] as const
    //as const 用来解决形如一个数组中放的元素的类型不一样的情况，如一个数组['string',12,{name:'object'}]
}