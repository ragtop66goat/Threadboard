import {useSelector, useDispatch} from "react-redux";
import {ON_SEND_MESSAGE, ON_SET_PRIV_MESSAGE, ON_SET_SELECTED_USER} from "../../modules/threads";
import {Button} from "react-bootstrap";

export function MessageInput({_useSelector = useSelector, _useDispatch = useDispatch}) {

  const selectedUser = _useSelector((state) => state.selectedUser)
  const privMessage = _useSelector((state) => state.privMessage)
  const dispatch = _useDispatch()

  function sendMessage() {
    const date = new Date().toISOString().substring(0, 10)
    dispatch({type: ON_SEND_MESSAGE, value: date})
  }

  function onMessageChange(e) {
    dispatch({type: ON_SET_PRIV_MESSAGE, value: e.target.value})
  }

  return <div className={"d-flex justify-content-center flex-column"}>
    <h1>Private Message</h1>
    <div className={"card shadow p-3 mb-5 bg-white rounded"}>
      <div className={"card-header"}>
        <h4>To: {selectedUser}</h4>
      </div>

    <div className={"card-body"}>
      <input type={"text"} onChange={onMessageChange} value={privMessage} placeholder={'How you doin?'}/>
    </div>
    <div className={"d-flex justify-content-evenly"}>
      <Button onClick={sendMessage}>Send</Button>
      <Button onClick={() => dispatch({type: ON_SET_SELECTED_USER, value: null})}>Cancel</Button>
    </div>
  </div>
  </div>
}