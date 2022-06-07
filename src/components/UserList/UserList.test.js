import {render, screen} from "@testing-library/react";
import {UserList} from "./UserList";

test('should render a div and button for each user', () => {
  const _useSelector = (fn) => fn(
    {
      userList: [
        {username: 'user', id: '1'},
        {username: 'user', id: '2'},
        {username: 'user', id: '3'}
      ]
    })
  const dispatch = () => {
  }

  render(<UserList _useSelector={_useSelector} _useDispatch={dispatch}/>)
  expect(screen.getAllByText("user")).toHaveLength(3)
  expect(screen.getAllByText("Message")).toHaveLength(3)
})