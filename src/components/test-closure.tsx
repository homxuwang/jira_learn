/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-12 20:40:39
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 21:06:33
 */
import React, { useEffect, useState } from 'react'
import { useMount } from 'utils'


const test = () => {
    let num = 0;
    
    const effect = () =>{
        num += 1;
        const message = `num value in message: ${num}`

        return function unmount() {
            console.log(message)
        }
    }

    return effect;
}

//执行test,返回effect函数
const add = test();
//执行effect函数，返回引用了message1的unmount函数
const unmount = add ()
//再执行effect函数，返回引用了message1的unmount函数
add()
add()
// message4
add()
//message5
add()
unmount() //按直觉这里似乎该打印3，实际上打印了1

export const Test = () => {
    const [num, setNum] = useState(0)

    const add = () => setNum(num + 1)

    // useMount(() => {
    //     setInterval(() => {
    //         console.log('num in setInterval:', num)
    //     },1000)
    // })

    useEffect(() => {
        return () => {
            console.log('卸载值：', num)
        }
    }, [num])
    return <div>
        <button onClick={add}>add</button>
        <p>
            number: {num}
        </p>
    </div>
}