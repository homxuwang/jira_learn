/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-25 09:20:48
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-05-12 15:49:13
 */
import {ErrorBoundary} from "components/error-boundary";
import { AuthenticatedApp } from "authenticated-app";
import { FullPageErrorFallback } from "components/lib";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";
import "./App.css";

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}  
      </ErrorBoundary>          
    </div>
  );
}

export default App;
