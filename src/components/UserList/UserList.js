import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";

export function UserList({_useDispatch = useDispatch, _useSelector = useSelector}) {

  const userList = _useSelector((state) => state.userList)

// todo: add message function

  return <div>
    <h3>Registered Users</h3>
    {
      userList.map((user, idx) => {
        return <div key={idx}>
          <h4 key={user.id}>{user.username}</h4>
          <Button >Message</Button>
        </div>

      })
    }
  </div>
}
