import {render, screen} from "@testing-library/react";
import {MessageList} from './MessageList'

test('should onlu render messages for currentUser/recipient', () => {
  const _useSelector = (fn) => fn(
    {
      messageList:
        [
          {owner: "user1", recipient: "2"},
          {owner: "user1", recipient: "2"},
          {owner: "user2", recipient: "1"},
        ],
      currentUser: {id: "2", username: "user2"}
    }
  )

  const _Message = ({message}) => {
    return <>{message.owner}</>
  }

  render(<MessageList _Message={_Message} _useSelector={_useSelector}/>)
  // only 2 of teh three should be rendered
  expect(screen.getAllByText("user1")).toHaveLength(2)


})