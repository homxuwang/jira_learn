/*
 * @Description  : 错误边界组件要用class component组件来实现
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-12 15:37:02
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 15:50:39
 */
import React, { ReactNode } from 'react'

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {
    state = { error: null }

    //如果ErrorBoundaryd的子组件发生了渲染错误时，这个方法就会被调用，返回值会被付给state
    static getDerivedStateFromError(error: Error) {
        return { error }
    }

    render() {
        const { error } = this.state
        const { fallbackRender, children } = this.props
        if(error){
            return fallbackRender({error})
        }
        return children
    }
}
