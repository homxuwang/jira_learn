/*
 * @Description  : 
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-25 09:20:48
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-03-31 11:25:25
 */
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { TsReactTest } from "screens/project-list/try-use-array";
import { LoginScreen } from "screens/login";

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {/* <TsReactTest /> */}
      <LoginScreen/>
    </div>
  );
}

export default App;
