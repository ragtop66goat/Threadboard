import {useDispatch, useSelector} from "react-redux";
import {ON_LOGOUT, ON_SET_SELECTED_USER} from "../../modules/threads";

export function UserList({_useDispatch = useDispatch, _useSelector = useSelector}) {

  const userList = _useSelector((state) => state.userList)
  const currentUser = _useSelector((state) => state.currentUser.username)
  const dispatch = _useDispatch()

  return <div>
    <div className={"d-flex justify-content-between"}>
      <h4 className={"text-primary m-2"}>{currentUser}</h4>
      <button className={"btn-outline btn-sm rounded-pill"} onClick={() => dispatch({type: ON_LOGOUT})}>Logout</button>
    </div>
    <h6 className={"text-success mt-4"}>Online: </h6>
    {
      userList.map((user, idx) => {
        return <div className={"mt-4"} key={idx}>
          <h6 className={"font-italic"} key={user.id}>{user.username}</h6>
          <button className={"btn-outline-primary btn-sm"}
                  onClick={() => dispatch({type: ON_SET_SELECTED_USER, value: user.username})}>Message</button>
        </div>
      })
    }
  </div>
}
