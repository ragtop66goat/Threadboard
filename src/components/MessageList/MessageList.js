import {useSelector} from "react-redux";
import {Message} from "../Message/Message";

export function MessageList( {_useSelector = useSelector, _Message = Message}) {
  const user = _useSelector((state) => state.currentUser.id)
  const messageList = _useSelector((state) => state.messageList)
  //validates current user and only displays their messages
  const usersInbox = messageList.filter(message => message.recipient === user)

  return <div >
    <h4 className={"text-center bg-dark bg-opacity-75 text-white border rounded p-2"}>Messages</h4>
    {
      usersInbox.reverse().map((message, idx) => {
        return <div className={"mt-2"} key={idx}>
          <_Message message={message}/>
        </div>
      })
    }
  </div>

}