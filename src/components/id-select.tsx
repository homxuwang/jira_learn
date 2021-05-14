import React from 'react'
import { Raw } from "../types";
import { Select } from "antd";

//获取Select组件身上的所有类型
type SelectProps = React.ComponentProps<typeof Select>

//把SelectProps类型中IdSelectProps的类型去掉，否则会报错
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'>{
  value: Raw | null | undefined,
  onChange: (value?:number) => void,
  defaultOptionName?: string,
  options: {name:string,id: number}[]
}

/**
 * value可以传入多种类型的值
 * onChange只会回调 number|undefined类型、
 * 当 isNan(Number(value))为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 * @constructor
 */
export const IdSelect = (props: IdSelectProps) => {
  //...restProps表示剩下的所有的props
  const {value ,onChange,defaultOptionName,options,...restProps} = props
  return <Select
    value={toNumber(value)}
    onChange={value => onChange(toNumber((value)) || undefined)}
    {...restProps}
  >
    {
      defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
    }
    {
      options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
    }
  </Select>
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)