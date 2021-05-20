import { useCallback, useState } from "react";
import { useMountedRef } from "./index";
import { useHttp } from "./http";

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
    const mountedRef = useMountedRef()
    //useState直接传入函数的含义是：惰性初始化；所以要用useState保存函数，不能直接传入函数
    // https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate
    //惰性初始化时执行最外面的一层函数，返回第二层的函数
    const [retry,setRetry] = useState(() => () => {})

    //调用setData说明请求成功
    const setData = useCallback(
      (data:D) => setState({
          data,
          stat: 'success',
          error: null
      }),[]
    )

    const setError = useCallback(
      (error:Error) => setState({
          error,
          stat: 'error',
          data: null
      }),[]
    )

    //run用来触发异步请求
    const run = useCallback(
      (promise: Promise<D>,runConfig?: {retry: () => Promise<D>}) => {
          if(!promise || !promise.then){
              throw new Error('请传入 Promise 类型的数据！')
          }
          setRetry(() => () => {
              if(runConfig?.retry){
                  run(runConfig?.retry(),runConfig)
              }
          })
          //开始时读入state，并设置stat为loading状态
          setState(prevState => ({...prevState,stat: 'loading'}))
          return promise
            .then((data) => {
                //判断如果组件已经被加载且不是被卸载的状态，此时才setData
                if(mountedRef.current)
                    setData(data)
                return data
            })
            .catch((error) => {
                setError(error)
                return error
            })
      },[mountedRef, setData,setError ]
    )
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        //retry被调用时，重新跑一遍run，让state刷新一遍，页面重新渲染
        retry,
        ...state
    }
}