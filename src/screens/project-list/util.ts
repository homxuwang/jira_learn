import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

// 项目列表搜索的参数
export const useProjectSearchParams = () => {
  //基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝对不可以放到依赖里
  const [param,setParam] = useUrlQueryParam(['name', 'personId'])
  //从url里获取的数字都为string类型，所以要转换为number
  return [
    useMemo(() => ({...param, personId: Number(param.personId) || undefined}),[param]),
    setParam
  ] as const
}