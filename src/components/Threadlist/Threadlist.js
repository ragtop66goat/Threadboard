import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {ON_LOGOUT} from "../../modules/threads";

export function Threadlist() {
  const dispatch = useDispatch()
  return <div>
    <div className={"d-flex"}>
      <h1>Threadlist</h1>
    <Button className={"ml-3"} onClick={()=>dispatch({type: ON_LOGOUT})}>Logout</Button>
    </div>
  </div>
}