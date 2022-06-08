import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {ON_LOGOUT, ON_SET_SELECTED_USER} from "../../modules/threads";

export function UserList({_useDispatch = useDispatch, _useSelector = useSelector}) {

  const userList = _useSelector((state) => state.userList)
  const currentUser = _useSelector((state) => state.currentUser.username)
  const dispatch = _useDispatch()

  return <div>
    <div className={"d-flex justify-content-between"}>
      <h4>{currentUser}</h4>
      <Button className={"btn-outline btn-sm rounded-pill"} onClick={() => dispatch({type: ON_LOGOUT})}>Logout</Button>
    </div>
    <h6 className={"mt-2"}>Users</h6>
    {
      userList.map((user, idx) => {
        return <div className={"mt-4"} key={idx}>
          <h4 key={user.id}>{user.username}</h4>
          <Button className={"btn-outline btn-sm"}
                  onClick={() => dispatch({type: ON_SET_SELECTED_USER, value: user.username})}>Message</Button>
        </div>
      })
    }
  </div>
}
