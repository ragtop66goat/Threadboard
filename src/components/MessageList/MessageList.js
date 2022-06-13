import {useSelector} from "react-redux";
import {Message} from "../Message/Message";

export function MessageList( {_useSelector = useSelector, _Message = Message}) {
  const user = _useSelector((state) => state.currentUser.username)
  const messageList = _useSelector((state) => state.messageList)
  //validates current user and only displays their messages
  const usersInbox = messageList.filter(message => message.recipient === user)

  return <div >
    <h4>Messages</h4>
    {
      usersInbox.map((message, idx) => {
        return <div className={"mt-4"} key={idx}>
          <_Message message={message}/>
        </div>
      })
    }
  </div>

}