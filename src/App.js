import {useSelector} from "react-redux";
import {Login} from "./components/Login/Login";
import {ThreadList} from "./components/ThreadList/ThreadList";
import {UserList} from "./components/UserList/UserList";
import {MessageList} from "./components/MessageList/MessageList";
import {MessageInput} from "./components/MessageInput/MessageInput";
import {ThreadInput} from "./components/ThreadInput/ThreadInput";
import {PostInput} from "./components/PostInput/PostInput";

function App({
               _useSelector = useSelector,
               _Login = Login,
               _UserList = UserList,
               _MessageInput = MessageInput,
               _MessageList = MessageList,
               _ThreadInput = ThreadInput,
               _ThreadList = ThreadList,
               _PostInput = PostInput
             }) {

  const currentUser = _useSelector((state) => state.currentUser);
  const selectedUser = _useSelector((state) => state.selectedUser);
  const addPost = _useSelector((state) => state.addPost)


  if (!currentUser) {
    return (
      <div className="d-flex flex-column align-items-center mt-3">
        <_Login/>
      </div>
    );
  }

  if (selectedUser) {
    return (
      <div className={"d-flex justify-content-center mt-4"}>
        <_MessageInput/>
      </div>
    )

  }

  if(addPost) {
    return (
      <div className={"d-flex justify-content-center mt-4"}>
        <_PostInput/>
      </div>
    )
  }

  return (
    <div className={"w-75"} style={{marginLeft: "12%"}}>
    <div className={"d-flex"}>
      <div className={"mt-3 bg-dark bg-opacity-75 p-4 pt-5"}>
        <_MessageList/>
      </div>
      <div className={"m-3 flex-grow-1"}>
        <_ThreadInput/>
        <_ThreadList/>
      </div>
      <div className={"mt-3 bg-dark bg-opacity-75 p-4 pt-5"}>
        <_UserList/>
      </div>
    </div>
    </div>
  )
}

export default App;
