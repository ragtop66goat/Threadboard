import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {ON_SET_SELECTED_USER} from "../../modules/threads";

export function UserList({_useDispatch = useDispatch, _useSelector = useSelector}) {

  const userList = _useSelector((state) => state.userList)
  const dispatch = _useDispatch()

  return <div>
    <h3>Registered Users</h3>
    {
      userList.map((user, idx) => {
        return <div key={idx}>
          <h4 key={user.id}>{user.username}</h4>
          <Button onClick={() => dispatch({type: ON_SET_SELECTED_USER, value: user.username})}>Message</Button>
        </div>
      })
    }
  </div>
}
