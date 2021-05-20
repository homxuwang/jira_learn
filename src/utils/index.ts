/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 15:14:05
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-13 10:44:30
 */

import { useEffect, useRef, useState } from "react"

//!!value 将value转为boolean值
export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''
//在一个函数中改变传入的对象本身是不好的,会污染传入的对象

//{[key:string]:unknown}指明所需要的是键值对的对象类型,如果直接指明object:object，则会报错
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        console.log(result)
        const value = result[key]
        //如果某个值不存在，则删除
        //这里不用isFalsy是因为，如果传入的字面量是false那么也会被删除，为了避免这种情况，则需要用isVoid
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result;
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        //TODO 依赖项里面加上callback会造成无限循环，这个和useCallback以及useMemo有关系
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
// debounce是指不管前面有多少步相同的操作，函数只执行最后一次，这种函数适用于分部的单个操作很快，但是只需要执行一次的场景。
export const useDebounce = <V>(value: V, delay?: number): V => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        //每次value变化时设置一个定时器
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        //每次在上一个useEffect处理完以后在运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debounceValue;
}

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value]
            copy.splice(index, 1)
            setValue(copy)
        }
    }
}

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
    //useRef()的值在整个生命周期内都是不变的
    const oldTitle = useRef(document.title).current

    //页面加载时： 新title
    //页面加载后： 旧title
    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle
            }
        }
    }, [keepOnUnmount,title])
}

//重置路由
export const resetRoute = () => window.location.href = window.location.origin

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false)

    useEffect(() => {
        //页面渲染完时
        mountedRef.current = true
        //卸载时
        return () => {
            mountedRef.current = false
        }
    })

    return mountedRef
}