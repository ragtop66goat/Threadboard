import {render, screen} from "@testing-library/react";
import {Thread} from './Thread'
import userEvent from "@testing-library/user-event";
import {ON_DELETE_THREAD, ON_EDIT_THREAD, ON_SET_ADD_POST} from "../../modules/threads";

test('should render elements with "User1", "2020-02-02", "Test Title" and "Test content"', () => {

  const _useSelector = ((fn) => fn({
    currentUser: {username: "User1"},
    postList: []
  }))
  const dispatch = () => {
  }
  const _Post = () => {
  }
  const thread = {
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={dispatch} _useSelector={_useSelector} _Post={_Post}/>)

  expect(screen.getByText("User1")).toBeInTheDocument()
  expect(screen.getByText("2020-02-02")).toBeInTheDocument()
  expect(screen.getByText("Test Title")).toBeInTheDocument()
  expect(screen.getByText("Test content")).toBeInTheDocument()
})

test('should render "Edit and Delete buttons"', () => {
  const _useSelector = ((fn) => fn({
    currentUser: {username: "User1"},
    postList: []
  }))
  const dispatch = () => {
  }
  const _Post = () => {
  }
  const thread = {
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={dispatch} _useSelector={_useSelector} _Post={_Post}/>)


  expect(screen.getByText("Edit")).toBeInTheDocument()
  expect(screen.getByText("Delete")).toBeInTheDocument()

})

test('should only render elements with "User1", "2020-02-02", "Test Title" and "Test content"', () => {

  const _useSelector = ((fn) => fn({
    currentUser: {username: "Doggo"},
    postList: []
  }))
  const dispatch = () => {
  }
  const _Post = () => {
  }
  const thread = {
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={dispatch} _useSelector={_useSelector} _Post={_Post}/>)

  const deleteBtn = screen.queryByText("Delete")
  const editBtn = screen.queryByText("Edit")

  expect(screen.getByText("User1")).toBeInTheDocument()
  expect(screen.getByText("2020-02-02")).toBeInTheDocument()
  // verify they are not in the document
  expect(screen.getByText("Test Title")).toBeInTheDocument()
  expect(screen.getByText("Test content")).toBeInTheDocument()

  expect(deleteBtn).not.toBeInTheDocument()
  expect(editBtn).not.toBeInTheDocument()
})

test('should render Thread with Post"', () => {
  const _useSelector = ((fn) => fn({
    currentUser: {username: "User1"},
    postList: [1]
  }))
  const dispatch = () => {
  }
  const _Post = () => <>PostItem</>
  const thread = {
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={dispatch} _useSelector={_useSelector} _Post={_Post}/>)


  expect(screen.getByText("PostItem")).toBeInTheDocument()

})

// --------- dispatch tests ------------------
test('should dispatch ON_EDIT_THREAD when "Edit" button clicked', () => {
  const _useSelector = ((fn) => fn({
    currentUser: {username: "User1"},
    postList: []
  }))
  const dispatch = jest.fn()

  const _Post = () => {
  }
  const thread = {
    id: "98",
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={()=>dispatch} _useSelector={_useSelector} _Post={_Post}/>)

  const button = screen.getByText("Edit")
  userEvent.click(button)

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_EDIT_THREAD,
    value: "98"
  })
})

test('should dispatch ON_DELETE_THREAD when "Edit" button clicked', () => {
  const _useSelector = ((fn) => fn({
    currentUser: {username: "User1"},
    postList: []
  }))
  const dispatch = jest.fn()

  const _Post = () => {
  }
  const thread = {
    id: "23",
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={()=>dispatch} _useSelector={_useSelector} _Post={_Post}/>)

  const button = screen.getByText("Delete")
  userEvent.click(button)

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_DELETE_THREAD,
    value: "23"
  })
})

test('should dispatch ON_SET_ADD_POST when "Edit" button clicked', () => {
  const _useSelector = ((fn) => fn({
    currentUser: {username: "User1"},
    postList: []
  }))
  const dispatch = jest.fn()

  const _Post = () => {
  }
  const thread = {
    id: "47",
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={()=>dispatch} _useSelector={_useSelector} _Post={_Post}/>)

  const button = screen.getByText("Post")
  userEvent.click(button)

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SET_ADD_POST,
    value: "47"
  })
})