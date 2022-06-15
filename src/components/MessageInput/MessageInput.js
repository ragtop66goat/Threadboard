import {useSelector, useDispatch} from "react-redux";
import {ON_SEND_MESSAGE, ON_SET_PRIV_MESSAGE, ON_CANCEL} from "../../modules/threads";


export function MessageInput({_useSelector = useSelector, _useDispatch = useDispatch}) {

  // selectedUser(id/username) set in userList with "Message" btn
  const selectedUser = _useSelector((state) => state.selectedUser)
  const privMessage = _useSelector((state) => state.privMessage)
  const dispatch = _useDispatch()

  function sendMessage() {
    const date = new Date().toString().substring(0, 15)
    dispatch({type: ON_SEND_MESSAGE, value: date})
  }

  function onMessageChange(e) {
    dispatch({type: ON_SET_PRIV_MESSAGE, value: e.target.value})
  }

  return <div className={"d-flex justify-content-center flex-column"}>
    <h1>Private Message</h1>
    <div className={"card shadow p-3 mb-5 bg-white rounded"}>
      <div className={"card-header"}>
        <h4>To: {selectedUser.username}</h4>
      </div>

    <div className={"card-body"}>
      <input type={"text"} onChange={onMessageChange} value={privMessage} placeholder={'How you doin?'}/>
    </div>
    <div className={"d-flex justify-content-evenly"}>
      <button className={"btn-success btn-sm m-2"} onClick={sendMessage}>Send</button>
      <button className={"btn-danger btn-sm m-2"} onClick={() => dispatch({type: ON_CANCEL})}>Cancel</button>
    </div>
  </div>
  </div>
}