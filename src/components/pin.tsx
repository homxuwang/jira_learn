import React from 'react'
import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate>{
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void
}

export const Pin = (props:PinProps) => {
  const {checked,onCheckedChange,...restProps} = props
  return <Rate
    count={1}
    value={checked ? 1 : 0}
    //因为onCheckedChange是可选的，如在标题栏的那个星，不需要有点击功能，所以这时候不需要传入onCheckedChange
    //!!num 等同于 Boolean(num)
    onChange={num => onCheckedChange?.(!!num)}
    {...restProps}
  />
}