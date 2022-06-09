import {useDispatch} from "react-redux";
import {ON_DELETE_THREAD, ON_EDIT_THREAD} from "../../modules/threads";
import {Button} from "react-bootstrap";

export function Thread({thread, _useDispatch = useDispatch}) {

  const dispatch = _useDispatch()

  return <div className={"card"}>
    <div className={"card-header d-flex justify-content-between"}>
      <div>{thread.owner}</div>
      <div>{thread.date}</div>
    </div>
    <div className={"card-body"}>
      <h5 className={"card-title"}>{thread.title}</h5>
      <p className={"card-text"}>{thread.content}</p>
    </div>
    <div className={"d-flex justify-content-evenly"}>
      <button className={"btn-danger btn-sm"} onClick={()=> dispatch({type: ON_DELETE_THREAD, value: thread.id})}>Delete</button>
      <button className={"btn-sm btn-info"} onClick={()=> dispatch({type: ON_EDIT_THREAD, value: thread.id})}>Edit</button>
    </div>

  </div>
}