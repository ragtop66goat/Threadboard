import {useDispatch, useSelector} from "react-redux";
import {ON_LOGOUT, ON_SET_SELECTED_USER} from "../../modules/threads";

export function UserList({_useDispatch = useDispatch, _useSelector = useSelector}) {

  const userList = _useSelector((state) => state.userList)
  const currentUser = _useSelector((state) => state.currentUser)
  const dispatch = _useDispatch()

  return <div>
    <div className={"d-flex justify-content-between text-center bg-dark bg-opacity-75 text-white border rounded px-4"}>
      <h4 className={"text-white m-2"}>{currentUser.username}</h4>
      <button className={"btn-sm rounded-pill"} style={{padding: "0.25rem", fontSize: "0.75rem"}} onClick={() => dispatch({type: ON_LOGOUT})}>Logout</button>
    </div>
    <h3 className={"text-white mt-4"} style={{textShadow: "0.5px 0.5px #40ff00"}}>Online: </h3>
    {
      userList.map((user, idx) => {
        return <div className={"mt-4"} key={idx}>
          <h6 className={"text-white"} key={user.id}>{user.username}</h6>
          <button className={"btn-outline-success btn-sm"}
                  onClick={() => dispatch({type: ON_SET_SELECTED_USER, value: {id: user.id, username:user.username}})}>Message</button>
        </div>
      })
    }
  </div>
}
