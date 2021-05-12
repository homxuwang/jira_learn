import { useState } from "react"

/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-12 14:16:47
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 14:42:35
 */
interface State<D> {
    error: Error | null;
    data: D | null;
    //还未发生 | 正在发生 | 发生错误 | 成功
    stat: 'idle' | 'loading' | 'error' | 'success'
}

//给一个默认state
const defaultInitialState: State<null> = {
    stat: 'idle',
    error: null,
    data: null
}

export const useAsync = <D>(InitialState?:State<D>) => {
    const [state,setState] = useState<State<D>>({
        ...defaultInitialState,
        ...InitialState
    })

    //调用setData说明请求成功
    const setData = (data:D) => setState({
        data,
        stat: 'success',
        error: null
    })

    const setError = (error:Error) => setState({
        error,
        stat: 'error',
        data: null
    })

    //run用来触发异步请求
    const run = (promise: Promise<D>) => {
        if(!promise || !promise.then){
            throw new Error('请传入 Promise 类型的数据！')
        }
        //开始时读入state，并设置stat为loading状态
        setState({...state,stat: 'loading'})
        return promise
        .then(data => {
            setData(data)
            return data
        })
        .catch(error => {
            setError(error)
            return error
        })
    }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
}