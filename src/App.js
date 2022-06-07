import {useSelector} from "react-redux";
import {Login} from "./components/Login/Login";
import {Threadlist} from "./components/Threadlist/Threadlist";
import {UserList} from "./components/UserList/UserList";

function App({
               _useSelector = useSelector,
               _Login = Login,
               _UserList = UserList,
               _Threadlist = Threadlist,
             }) {

  const currentUser = _useSelector((state) => state.currentUser);

  if (!currentUser) {
    return (
      <div className="d-flex flex-column align-items-center mt-3">
        <_Login/>
      </div>
    );
  }

  return (
    <div className={"mt-3 d-flex justify-content-between"}>
      <_Threadlist/>
      <_UserList/>
    </div>
  )
}

export default App;
