/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-25 09:20:48
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-07 16:52:25
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {loadDevTools} from 'jira-dev-tool'
import { AppProviders } from "context";

loadDevTools(() => ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
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
