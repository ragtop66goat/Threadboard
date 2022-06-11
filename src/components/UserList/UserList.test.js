import {render, screen} from "@testing-library/react";
import {UserList} from "./UserList";
import userEvent from "@testing-library/user-event";
import {ON_SET_SELECTED_USER} from "../../modules/threads";

test('should render a div and button for each user', () => {
  const _useSelector = (fn) => fn(
    {
      userList: [
        {username: 'user', id: '1'},
        {username: 'user', id: '2'},
        {username: 'user', id: '3'}
      ],
      currentUser: {username: 'user1'}
    })
  const dispatch = () => {
  }

  render(<UserList _useSelector={_useSelector} _useDispatch={dispatch}/>)
  expect(screen.getAllByText("user")).toHaveLength(3)
  expect(screen.getAllByText("Message")).toHaveLength(3)
})

test('should render a Message and  Logout button', () => {
  const _useSelector = (fn) => fn(
    {
      userList: [{username: 'user', id: '1'}],
      currentUser: {username: 'user1'}
    })
  const dispatch = () => {
  }

  render(<UserList _useSelector={_useSelector} _useDispatch={dispatch}/>)
  expect(screen.getByText("Logout").tagName).toBe("BUTTON")
  expect(screen.getByText("Message").tagName).toBe("BUTTON")
})



test('should dispatch ON_SET_SELECTED_USER with corresponding user when Message button is clicked', () => {
  const _userSelector = (fn) => fn({
    userList: [{username: 'user2', id: '2'}],
    currentUser: {username: 'Vinny'}
  })

  const dispatch = jest.fn()

  render(<UserList _useSelector={_userSelector} _useDispatch={() => dispatch}/>)

  const button = screen.getByText("Message")
  userEvent.click(button)

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SET_SELECTED_USER,
    value: "user2"
  })
})

test('should render an element with currentUser and with "Online:"', () => {
  const _useSelector = (fn) => fn({currentUser: {username: "Trunks"},
  userList:[]})
  const dispatch = () => {}

  render(<UserList _useSelector={_useSelector} _useDispatch={() => dispatch}/>)

  expect(screen.getByText('Online:')).toBeInTheDocument()
  expect(screen.getByText('Trunks')).toBeInTheDocument()
})