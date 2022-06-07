import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {ON_LOGOUT} from "../../modules/threads";

export function Threadlist() {
  const dispatch = useDispatch()
  return <div>
    <div>
    <Button onClick={()=>dispatch({type: ON_LOGOUT})}>Logout</Button>
    <h1>Threadlist</h1>
    </div>
  </div>
}