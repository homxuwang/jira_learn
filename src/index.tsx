/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-25 09:20:48
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 10:10:55
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {loadServer, DevTools} from 'jira-dev-tool'
//放在 jira-dev-tool后面可以替换上面的一些主题样式
import 'antd/dist/antd.less'
import { AppProviders } from "context";

loadServer(() => ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools/>
        <App />
      </AppProviders>      
    </React.StrictMode>, 
    document.getElementById("root")
  )
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
