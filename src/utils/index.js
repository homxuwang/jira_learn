/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-29 15:14:05
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-03-29 15:27:56
 */

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