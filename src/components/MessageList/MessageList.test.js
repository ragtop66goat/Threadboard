import {render, screen} from "@testing-library/react";
import {MessageList} from './MessageList'

test('should render a div with sentFrom, date, and message for every message in messageList', () => {
  const _useSelector = (fn) => fn(
    {
      messageList:
        [
          {owner: "user1", recipient: "user2"},
          {owner: "user1", recipient: "user2"}
        ],
      currentUser: "user2"
    }
  )

  const _Message = ({message}) => {
    return <>{message.owner}</>
  }

  render(<MessageList _Message={_Message} _useSelector={_useSelector}/>)

  expect(screen.getAllByText("user1")).toHaveLength(2)


})