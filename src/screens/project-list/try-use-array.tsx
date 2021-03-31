/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-31 08:30:14
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-03-31 09:27:35
 */
import React ,{useState} from 'react';
import { useArray, useMount } from 'utils';

export const TsReactTest = () => {
    const persons: {name: string;age: number}[] =[
        {name:"jack",age:25},
        {name:"ma",age:22}
    ];
    const {value,clear,removeIndex,add} = useArray(persons);
    useMount(() => {

    });

    return(
        <div>
            <button onClick={() => add({name: "john",age: 22})}>add john</button>
            <button onClick={() => removeIndex(0)}>remove 0</button>
            <button style={{marginBottom: '50px'}} onClick={() => clear()}>clear</button>
            {value.map((person: {age:number,name:string},index: number) => (
                <div key={index} style={{marginBottom: '30px'}}>
                    <span style={{color: 'red'}}>{index}</span>
                    <span>{person.name}</span>
                    <span>{person.age}</span>
                </div>
            ))}
        </div>
    );
};

