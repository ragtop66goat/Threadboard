import {render, screen} from "@testing-library/react";
import {Post} from "./Post";
import userEvent from "@testing-library/user-event";
import {ON_DELETE_POST, ON_EDIT_POST} from "../../modules/threads";

test('should render post with "Edit and "Delete" buttons', () => {
  const _useSelector = ((fn) => fn({currentUser: {id: "79",username: "Zorro"}}))
  const dispatch = ()=>{}
  // currentUser is the owner of the post
  const post  = {
    owner: "79",
    id: '3',
    content: "this",
  }

  render(<Post post={post} _useSelector={_useSelector} _useDispatch={dispatch}/>)

  expect(screen.getByText("this")).toBeInTheDocument()
  expect(screen.getByText("Delete").tagName).toBe("BUTTON")
  expect(screen.getByText("Edit").tagName).toBe("BUTTON")


})

test('should render post with only post content', () => {
  const _useSelector = ((fn) => fn({currentUser: {username: "Ranger"}}))
  const dispatch = ()=>{}
  const post  = {
    owner: "Zorro",
    id: '3',
    content: "this",
    date: "Sat Oct 27 1979"
  }

  render(<Post post={post} _useSelector={_useSelector} _useDispatch={dispatch}/>)

  const deleteBtn = screen.queryByText("Delete")
  const editBtn = screen.queryByText("Edit")

  expect(screen.getByText("this")).toBeInTheDocument()
  expect(screen.getByText("Zorro")).toBeInTheDocument()
  expect(screen.getByText("Sat Oct 27 1979")).toBeInTheDocument()
  // these are not in the document for non-owner of post
  expect(deleteBtn).not.toBeInTheDocument()
  expect(editBtn).not.toBeInTheDocument()

})

test('should dispatch ON_DELETE_POST when "Delete" is clicked', () => {
  const _useSelector = ((fn) => fn({currentUser: {id: "045",username: "Zorro"}}))
  const dispatch = jest.fn()
  const post  = {
    owner: "045",
    id: '3',
    content: "this",
  }

  render(<Post post={post} _useSelector={_useSelector} _useDispatch={() => dispatch}/>)

  const button = screen.getByText("Delete")
  userEvent.click(button)

  expect(dispatch).toBeCalledWith({
    type: ON_DELETE_POST, value: "3"
  })
})

test('should dispatch ON_EDIT_POST when "Delete" is clicked', () => {
  const _useSelector = ((fn) => fn({currentUser: {id: "745", username: "Bobby"}}))
  const dispatch = jest.fn()
  const post  = {
    owner: "745",
    id: '23',
    content: "this",
  }

  render(<Post post={post} _useSelector={_useSelector} _useDispatch={() => dispatch}/>)

  const button = screen.getByText("Edit")
  userEvent.click(button)

  expect(dispatch).toBeCalledWith({
    type: ON_EDIT_POST, value: "23"
  })
})