/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 15:14:05
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-03-29 16:19:32
 */

import { useEffect,useState } from "react"

//!!value 将value转为boolean值
export const isFalsy = (value) => value === 0 ? false : !value

//在一个函数中改变传入的对象本身是不好的,会污染传入的对象

export const cleanObject = (object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        console.log(result)
        const value = result[key]
        //如果某个值不存在，则删除
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result;
}

export const useMount = (callback) => {
    useEffect(() => {
        callback()
    },[])
}
// debounce是指不管前面有多少步相同的操作，函数只执行最后一次，这种函数适用于分部的单个操作很快，但是只需要执行一次的场景。
export const useDebounce = (value,delay) => {
    const [debounceValue,setDebounceValue] = useState(value)

    useEffect(() => {
        //每次value变化时设置一个定时器
        const timeout = setTimeout(() => setDebounceValue(value),delay)
        //每次在上一个useEffect处理完以后在运行
        return () => clearTimeout(timeout)
    },[value,delay])

    return debounceValue;
}