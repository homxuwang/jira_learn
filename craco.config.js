/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-05-11 10:06:51
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-11 10:08:56
 */
const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': 'rgb(0,82,204)', '@font-size-base': '16px' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};