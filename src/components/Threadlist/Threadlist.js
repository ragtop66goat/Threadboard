import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {ON_LOGOUT} from "../../modules/threads";

export function Threadlist() {
  const dispatch = useDispatch()
  return <div className={"d-flex justify-content-between"}>
      <h1>Threadbook</h1>
      <Button className={"btn-outline btn-sm rounded-pill"} onClick={() => dispatch({type: ON_LOGOUT})}>Logout</Button>
    </div>
}