import {useSelector} from "react-redux";
import {Login} from "./components/Login/Login";
import {ThreadList} from "./components/ThreadList/ThreadList";
import {UserList} from "./components/UserList/UserList";
import {MessageList} from "./components/MessageList/MessageList";
import {MessageInput} from "./components/MessageInput/MessageInput";

function App({
               _useSelector = useSelector,
               _Login = Login,
               _UserList = UserList,
               _MessageInput = MessageInput,
               _MessageList = MessageList,
               _ThreadList = ThreadList,
             }) {

  const currentUser = _useSelector((state) => state.currentUser);
  const selectedUser = _useSelector((state) => state.selectedUser);


  if (!currentUser) {
    return (
      <div className="d-flex flex-column align-items-center mt-3">
        <_Login/>
      </div>
    );
  }

  if (selectedUser) {
    return <_MessageInput/>
  }

  return (
    <div className={"d-flex"}>
      <div className={"m-5"}>
        <_MessageList/>
      </div>
      <div className={"m-3 flex-grow-1"}>
        <_ThreadList/>
      </div>
      <div className={"m-5"}>
        <_UserList/>
      </div>
    </div>
  )
}

export default App;
